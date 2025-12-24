'use client'

import { UserIconModes } from '@/app/enums/enums';
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface UserIconProps {
    text: string;
    mode: UserIconModes;
    isOwner?: boolean;
    hasBorder?: boolean;
    withDrawal?: boolean;
    url?: string;
    isActive?: boolean;
}

export default function UserIcon({ text, mode, url, isOwner = false, hasBorder = false, withDrawal = false, isActive = false }: UserIconProps) {
    const router: AppRouterInstance = useRouter();

    const handleClick: () => void = () => {
        url && router.push(url);
    };

    let classNames: string[] = [
        "user-icon",
        "inline-flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-full",
        "text-base",
        "uppercase",
        url && !isActive ? "cursor-pointer" : ""
    ];
    if (mode === UserIconModes.Large) {
        classNames = [...classNames, "min-w-65 min-h-65"];
        if (!isActive) {
            classNames = [...classNames, " bg-(--light-orange) text-(--grey-950) transition-colors duration-300 caption-l ease-out hover:bg-(--dark-orange) hover:text-(--white)"];
        } else {
            classNames = [...classNames, " bg-(--dark-orange) text-(--white)"];
        }
    } else {
        classNames = [...classNames, "w-27 h-27 min-w-27 max-w-27 min-h-27 max-h-27 cursor-default body-2xs text-(--grey-950)"];
        if (isOwner) {
            classNames = [...classNames, "bg-(--light-orange)"];
        } else {
            classNames = [...classNames, "bg-(--grey-200) text-(--grey-950)"];
        }
        if (hasBorder) {
            classNames = [...classNames, "border-white border border-solid"];
        }
        if (withDrawal) {
            classNames = [...classNames, "-ml-8"];
        }
    }

    return (
        (url
            ? <button className={classNames.join(" ")} onClick={handleClick} role="button">{text}</button>
            : <span className={classNames.join(" ")}>{text}</span>
        )
    );
}