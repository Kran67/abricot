'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ImageButtonProps {
    url: string;
    width?: number;
    height?: number;
    className?: string;
    alt: string;
}

interface ButtonProps {
    text: string;
    disabled: boolean;
    className?: string;
    image?: ImageButtonProps;
    url: string
    width?: number;
    height?: number;
    color?: string;
}

export default function Button({ text, disabled, className, image, url, width, height, color }: ButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(url);
    };

    const colors: { [key: string]: string } = {
        black: " bg-(--grey-800) hover:bg-(--grey-950)",
        orange: " bg-(--dark-orange) hover:bg-(--light-orange) hover:text-(--dark-orange)"
    };

    const buttonColors: string = color ? colors[color] : colors.black;

    const classNames = [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-10",
        "whitespace-nowrap",
        "rounded-(--radius10)",
        "text-base",
        "text-(--white)",
        "disabled:bg-(--grey-200)",
        "disabled:text-(--grey-400)",
        "body-m",
        "transition-colors",
        "duration-300",
        "ease-out",
        "cursor-pointer",
        "disabled:cursor-not-allowed"
    ].join(" ") + buttonColors + (className ?? '');

    return (
        <button
            className={classNames}
            disabled={disabled}
            style={{ width: width ?? '', height: height ?? '' }}
            onClick={handleClick}>
            {image ? <Image className={"" + (image.className ?? '')} src={image.url} alt={image.alt} width={image.width ?? 21} height={image.height ?? 21} /> : ""}{text}
        </button>
    );
}