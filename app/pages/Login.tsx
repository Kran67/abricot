'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Logo from "@/app/components/ui/Logo";
import Link from "@/app/components/ui/Link";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import Button from "@/app/components/ui/Button";

export default function Login() {
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        router.push("");
    };

    return (
        <div className="login flex w-1440 h-1024 flex-1 ">
            <div className="flex flex-col w-562 bg-(--white) gap-202 pt-55 pr-140 pb-55 pl-140">
                <Logo />
                <div className="flex flex-col gap-30">
                    <h1 className="text-(--dark-orange) self-center">Connexion</h1>
                    <div className="flex flex-col gap-21">
                        <form className="flex flex-col gap-29" method="post" action="/">
                            <Input name="email" label="Email" type={InputTypes.Text} />
                            <Input name="password" label="Mot de passe" type={InputTypes.Password} />
                            <Button className="self-center" text="Se connecter" url="" width={248} height={50} />
                        </form>
                        <Link text="Mot de passe oublié?" url="" />
                    </div>
                </div>
                <div className="flex gap-10 justify-center">
                    <span className="body-s text-black">Pas encore de compte ?</span><Link text="Créer un compte" url="" />
                </div>
            </div>
        </div>
    );
}