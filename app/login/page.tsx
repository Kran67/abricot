'use client'

import Logo from "@/app/components/ui/Logo";
import Link from "@/app/components/ui/Link";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import Button from "@/app/components/ui/Button";
import { useState } from "react";
import { useCookies } from 'next-client-cookies';
import { toast } from "react-toastify";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const cookies = useCookies();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        res.json().then((data) => {
            if (res.ok) {
                cookies.set("token", data.data.token, { expires: 1 });
                window.location.reload();
            } else {
                setError(true);
                toast.error(data.data.errors[0].message);
            }
        });
    };

    return (
        <div className="login flex w-1440 h-1024 flex-1 ">
            <div className="flex flex-col w-562 bg-(--white) gap-202 py-55 px-140">
                <Logo />
                <div className="flex flex-col gap-30">
                    <h1 className="text-(--dark-orange) self-center">Connexion</h1>
                    <div className="flex flex-col gap-21">
                        <form className="flex flex-col gap-29" onSubmit={handleLogin}>
                            <Input name="email" label="Email" type={InputTypes.Text} value={email} onChange={(e) => {
                                setEmail(e.target.value);
                                setError(false);
                            }} hasError={error} />
                            <Input name="password" label="Mot de passe" type={InputTypes.Password} value={password} onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }} hasError={error} />
                            <Button className="self-center" text="Se connecter" url="" width={248} height={50} />
                        </form>
                        <Link text="Mot de passe oublié?" url="" />
                    </div>
                </div>
                <div className="flex gap-10 justify-center">
                    <span className="body-s text-black">Pas encore de compte ?</span><Link text="Créer un compte" url="/signin" />
                </div>
            </div>
        </div>
    );
}