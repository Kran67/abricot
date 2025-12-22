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

export default function Profile() {
    const user: User | null = useUser();
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const classNames = [
        "account",
        "flex",
        "pt-57",
        "pr-100",
        "pb-181",
        "pl-100",
        "bg-(--grey-50)",
        "flex-1"
    ].join(" ");

    let firstName = "";
    let lastName = "";

    if (user?.name) {
        [firstName, lastName] = user?.name.split(" ");
    }

    function validatePassword(pw: string): boolean {
        if (!pw || pw.trim() === "") return false;

        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(pw);
    }

    // Avant chaque soumission, vérification des données fournies valides.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const lastName = formData.get("lastname") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (password.trim() !== "") {
            if (!validatePassword(password)) {
                setPasswordError("Le mot de passe doit contenir au minimum 8 caractères, une majuscule et un chiffre.");
                return;
            }
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`, {
            method: "PUT",
            body: JSON.stringify({
                name: `${name} ${lastName}`,
                email,
                password: password.trim()
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            if (data.type === "password") {
                alert(data.message);
                return;
            }

            alert("Erreur lors de la mise à jour : " + data.message);
            return;
        } else {
            alert("Les données ont bien étés modifiées");
        }
    };

    return (
        <main className="flex flex-col bg-white w-1440">
            <Header activeMenu={HeaderMenuItems.Profile} />
            <div className={classNames}>
                <div className="flex flex-col flex-1 gap-41 rounded-(--radius10) border border-solid border-(--grey-200) bg-(--white) pt-40 pr-59 pb-40 pl-59">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-41">
                        <div className="flex flex-col gap-8">
                            <h5 className="text-(--grey-800)">Mon compte</h5>
                            <span className="body-m text-(--grey-600)">{user?.name}</span>
                        </div>
                        <div className="flex flex-col gap-24">
                            <Input name="lastname" label="Nom" value={lastName} required={true} />
                            <Input name="name" label="Prénom" value={firstName} required={true} />
                            <Input name="email" label="Email" value={user?.email} required={true} />
                            <Input
                                name="password"
                                label="Mot de passe"
                                type={InputTypes.Password}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                hasError={passwordError !== ""}
                                autoComplete="off"
                            />
                        </div>
                        <Button text="Modifier les informations" width={242} height={50} />
                    </form>
                    <Link text="Se déconnecter" url="/" onClickFunc={() => cookies.remove("token")} />
                </div>
            </div>
            <Footer />
        </main>
    );
}