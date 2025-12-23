'use client'

import Logo from "@/app/components/ui/Logo";
import Link from "@/app/components/ui/Link";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import Button from "@/app/components/ui/Button";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { validatePassword } from "@/app/lib/utils";
import { toast } from "react-toastify";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMail, setErrorMail] = useState(false);
    const cookies = useCookies();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.trim() !== "") {
            if (!validatePassword(password)) {
                toast.error("Le mot de passe doit contenir au minimum 8 caractères, une majuscule et un chiffre.");
                return;
            }
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json()
        if (res.ok) {
            cookies.set("token", data.data.token, { expires: 1 });
            window.location.href = "/profile";
        } else {
            if (res.status === 409) {
                setErrorMail(true);
            } else {
                setError(true);
            }
            toast.error(data.message);
        }
    };

    return (
        <div className="sign-in flex w-1440 h-1024 flex-1 ">
            <div className="flex flex-col w-562 bg-(--white) gap-202 pt-55 pr-140 pb-55 pl-140">
                <Logo />
                <div className="flex flex-col gap-30">
                    <h1 className="text-(--dark-orange) self-center">Inscription</h1>
                    <div className="flex flex-col gap-21">
                        <form className="flex flex-col gap-29" onSubmit={handleSignIn}>
                            <Input name="email" label="Email" type={InputTypes.Text} value={email} onChange={(e) => {
                                setEmail(e.target.value);
                                setError(false);
                                setErrorMail(false)
                                //setPasswordError("");
                            }}
                                hasError={error || errorMail}
                            />
                            <Input name="password" label="Mot de passe" type={InputTypes.Password} value={password} onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                                setErrorMail(false);
                                //setPasswordError("");
                            }}
                                hasError={error}
                            />
                            <Button className="self-center" text="S’inscrire" width={248} height={50} />
                        </form>
                        <Link text="Mot de passe oublié?" />
                    </div>
                </div>
                <div className="flex gap-10 justify-center">
                    <span className="body-s text-black">Déjà inscrit ?</span><Link text="Se connecter" url="/" />
                </div>
            </div>
        </div>
    );
}