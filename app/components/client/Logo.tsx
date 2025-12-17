'use client'

import { LogoColors } from "@/app/enums/enums";
import Image from "next/image";

interface LogoProps {
    color?: LogoColors;
}

export default function Logo({ color = LogoColors.Orange }: LogoProps) {
    const classNames = [
        "logo",
        color
    ].join(" ")

    return (
        <Image className={classNames} src="/images/logo.svg" alt="Image du logo" width={252} height={32} />
    );
}