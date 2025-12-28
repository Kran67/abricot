'use client'

import Image from "next/image";
import { ImageProps } from "@/app/interfaces/imageProps";


interface ChipProps {
    text?: string;
    className?: string;
    image?: ImageProps;
    width?: number;
    height?: number;
    isActive?: boolean
    onClickFunc?(): void;
}

export default function Chip({ text, className, image, width, height, isActive, onClickFunc }: ChipProps) {
    const classNames: string = [
        "chip",
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-5",
        "md:gap-10",
        "whitespace-nowrap",
        "rounded-(--radius8)",
        isActive ? "bg-(--light-orange)" : "bg-(--white)",
        "hover:bg-(--light-orange)",
        "text-base",
        "text-(--dark-orange)",
        "body-xs",
        "md:body-s",
        "transition-colors",
        "duration-300",
        "ease-out",
        "cursor-pointer",
    ].join(" ") + (className ? " " + className : "");
    if (image?.url.includes("calendar") && !image?.className?.includes("calendar")) {
        if (!image.className) {
            image.className = "";
        }
        image.className += " calendar";
    }

    return (
        <button
            className={classNames}
            style={{ width: width ?? "", height: height ?? "" }}
            onClick={onClickFunc}
            role="button">
            {image ? <Image className={(image.className ?? "")} src={image.url} alt={image.alt} width={image.width ?? 16} height={image.height ?? 16} /> : null}{text}
        </button>
    );
}