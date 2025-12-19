'use client'

import Logo from "@/app/components/ui/Logo";
import { LogoColors } from "@/app/enums/enums";

export default function Footer() {
    const classNames = [
        "flex",
        "flex-1",
        "justify-between",
        "items-center",
        "bg-(--white)",
        "min-h-68",
        "pl-30",
        "pr-30"
    ].join(" ");

    return (
        <footer className={classNames}>
            <Logo color={LogoColors.Black} width={101} height={13} />
            <span className="body-m text-black">Abricot 2025</span>
        </footer>
    );
}