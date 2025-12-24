'use client'

import { LogoColors } from "@/app/enums/enums";
import Image from "next/image";

interface LogoProps {
    color?: LogoColors;
    width?: number;
    height?: number;
}

export default function Logo({ color = LogoColors.Orange, width = 147, height = 19 }: LogoProps) {
    const classNames = [
        "logo",
        color !== LogoColors.Black ? "hidden md:block" : "",
        color
    ].join(" ");

    return (
        <Image className={classNames} src="/images/logo.svg" alt="Image du logo" width={width} height={height} />
    );
}