'use client'

import Input from "@/app/components/ui/Input";
import { InputTypes, HeaderMenuItems } from "@/app/enums/enums";
import Button from "@/app/components/ui/Button";
import Link from "@/app/components/ui/Link";
import { useCookies } from 'next-client-cookies';
import { User } from "@/app/interfaces/user";
import { useUser } from "@/app/contexts/userContext";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { useState } from "react";
import { redirectWithDelay, validatePassword } from "@/app/lib/utils";
import { toast } from "react-toastify";

export default function Profile() {
    const user: User | null = useUser();
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const classNames = [
        "account",
        "flex",
        "md:pt-57",
        "md:pr-100",
        "pb-181",
        "md:pl-100",
        "bg-(--grey-50)",
        "flex-1"
    ].join(" ");

    let firstName = "";
    let lastName = "";

    if (user?.name) {
        [firstName, lastName] = user?.name.split(" ");
    }

    const savePassword = (oldPassword: string, newPassword: string): boolean | undefined => {
        if (oldPassword?.trim() !== "") {
            if (!newPassword || newPassword.trim() === "") {
                setPasswordError(true);
                toast.error("Le nouveau mot de passe ne peut pas être vide.");
                return false;
            }
            if (!validatePassword(newPassword)) {
                setPasswordError(true);
                toast.error("Le mot de passe doit contenir au minimum 8 caractères, une majuscule et un chiffre.");
                return false;
            }
        }

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password`, {
            method: "PUT",
            body: JSON.stringify({
                currentPassword: oldPassword.trim(),
                newPassword: password.trim()
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            res.json().then((data) => {
                if (!res.ok) {
                    toast.error("Erreur lors de la mise à jour du mot de passe : " + data.data.errors[0].message);
                    return false;
                } else {
                    toast.success("Le mot de passe a bien été modifié");
                    // on rappelle la page pour mettre à jour l'utilisateur dans l'application
                    redirectWithDelay("/profile", 1000);
                    return true;
                }
            });
        })
            .catch(() => { return false; });
    }

    // Avant chaque soumission, vérification des données fournies valides.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const lastName = formData.get("lastname") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const oldPassword = formData.get("oldPassword") as string;
        const password = formData.get("password") as string;

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`, {
            method: "PUT",
            body: JSON.stringify({
                name: `${name} ${lastName}`,
                email,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            res.json().then((data) => {
                if (!res.ok) {
                    toast.error("Erreur lors de la mise à jour : " + data.data.errors[0].message);
                    return;
                } else {
                    toast.success("Les données ont bien étés modifiées");
                }
                if (password.trim() !== "" && !savePassword(oldPassword, password)) {
                    return;
                }
                // on rappelle la page pour mettre à jour l'utilisateur dans l'application
                redirectWithDelay("/profile", 1000);
            });
        });
    };

    return (
        <main className="flex flex-col bg-white w-1440">
            <Header activeMenu={HeaderMenuItems.Profile} />
            <div className={classNames}>
                <div className="flex flex-col flex-1 gap-41 rounded-(--radius10) border border-solid border-(--grey-200) bg-(--white) pt-40 pr-59 pb-40 pl-59">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-41" role="form" aria-label="Information du compte">
                        <div className="flex flex-col gap-8">
                            <h5 className="text-(--grey-800)">Mon compte</h5>
                            <span className="body-m text-(--grey-600)">{user?.name}</span>
                        </div>
                        <div className="flex flex-col gap-24">
                            <Input name="lastname" label="Nom" value={lastName} required={true} />
                            <Input name="name" label="Prénom" value={firstName} required={true} />
                            <Input name="email" label="Email" value={user?.email} required={true} />
                            <Input
                                name="oldPassword"
                                label="Ancien mot de passe"
                                type={InputTypes.Password}
                                autoComplete="off"
                            />
                            <Input
                                name="password"
                                label="Nouveau mot de passe"
                                type={InputTypes.Password}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                                hasError={passwordError}
                                autoComplete="new-password"
                            />
                        </div>
                        <Button text="Modifier les informations" width={242} height={50} />
                    </form>
                    <Link text="Se déconnecter" url="/" onClick={() => cookies.remove("token")} />
                </div>
            </div>
            <Footer />
        </main>
    );
}