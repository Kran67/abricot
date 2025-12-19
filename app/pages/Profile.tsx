'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import Button from "@/app/components/ui/Button";
import Link from "@/app/components/ui/Link";

// à remplacer par l'utilisateur connecté
interface ProfileProps {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export default function Profile({ name, lastName, email, password }: ProfileProps) {
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        router.push("");
    };

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

    return (
        <div className={classNames}>
            <div className="flex flex-col flex-1 gap-41 rounded-(--radius10) border border-solid border-(--grey-200) bg-(--white) pt-40 pr-59 pb-40 pl-59">
                <form method="post" action="" className="flex flex-col gap-41">
                    <div className="flex flex-col gap-8">
                        <h5 className="text-(--grey-800)">Mon compte</h5>
                        <span className="body-m text-(--grey-600)">{name} {lastName}</span>
                    </div>
                    <div className="flex flex-col gap-24">
                        <Input name="lastname" label="Nom" value={lastName} required={true} />
                        <Input name="name" label="Prénom" value={name} required={true} />
                        <Input name="email" label="Email" value={email} required={true} />
                        <Input name="password" label="Mot de passe" type={InputTypes.Password} value={password} required={true} />
                    </div>
                    <Button text="Modifier les informations" url="" width={242} height={50} />
                </form>
                <Link text="Se déconnecter" url="/" />
            </div>
        </div>
    );
}