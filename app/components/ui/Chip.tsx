'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageProps } from "@/app/interfaces/imageProps";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


interface ChipProps {
    text?: string;
    className?: string;
    image?: ImageProps;
    url: string
    width?: number;
    height?: number;
    isActive?: boolean
}

export default function Chip({ text, className, image, url, width, height, isActive }: ChipProps) {
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        router.push(url);
    };

    const classNames = [
        "chip",
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-10",
        "whitespace-nowrap",
        "rounded-(--radius8)",
        isActive ? "bg-(--light-orange)" : "bg-(--white)",
        "hover:bg-(--light-orange)",
        "text-base",
        "text-(--dark-orange)",
        "body-s",
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
            onClick={handleClick}>
            {image ? <Image className={(image.className ?? "")} src={image.url} alt={image.alt} width={image.width ?? 16} height={image.height ?? 16} /> : null}{text}
        </button>
    );
}