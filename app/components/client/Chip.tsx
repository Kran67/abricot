'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageProps } from "../../interfaces/imageProps";


interface ChipProps {
    text?: string;
    className?: string;
    image?: ImageProps;
    url: string
    width?: number;
    height?: number;
    active: boolean
}

export default function Chip({ text, className, image, url, width, height, active }: ChipProps) {
    const router = useRouter();

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
        active ? "bg-(--light-orange)" : "bg-(--white)",
        "hover:bg-(--light-orange)",
        "text-base",
        "text-(--dark-orange)",
        "body-s",
        "transition-colors",
        "duration-300",
        "ease-out",
        "cursor-pointer",
    ].join(" ") + (className ? " " + className : "");
    if (image?.url.includes("calendar")) {
        image.className += " calendar";
    }

    return (
        <button
            className={classNames}
            style={{ width: width ?? '', height: height ?? '' }}
            onClick={handleClick}>
            {image ? <Image className={(image.className ?? '')} src={image.url} alt={image.alt} width={image.width ?? 16} height={image.height ?? 16} /> : ""}{text}
        </button>
    );
}