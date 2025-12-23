'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


interface LinkProps {
    text: string;
    url?: string;
    disabled?: boolean;
    onClick?(): void;
}

export default function Link({ text, url = "#", disabled = false, onClick }: LinkProps) {
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        onClick?.();
        if (url) router.push(url);
    };

    const classNames = [
        "link",
        "inline-flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "text-base",
        disabled ? "text-(--grey-400)" : "text-(--dark-orange)",
        "body-s",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        "underline",
        disabled ? "" : "hover:text-(--grey-950)",
        disabled ? "disabled" : "",

    ].join(" ");

    return (
        <a href={url}
            className={classNames}
            onClick={handleClick}>
            {text}
        </a>
    );
}