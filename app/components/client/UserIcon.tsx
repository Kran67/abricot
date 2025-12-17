'use client'

import { UserIconModes } from '../../enums/enums';

interface UserIconProps {
    text: string;
    mode: UserIconModes;
    isOwner?: boolean;
    hasBorder?: boolean;
    withDrawal?: boolean;
}

export default function UserIcon({ text, mode, isOwner = false, hasBorder = false, withDrawal = false }: UserIconProps) {
    let classNames: string[] = [
        "user-icon",
        "inline-flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-full",
        "text-base",
        "uppercase",
    ];
    if (mode === UserIconModes.Large) {
        classNames = [...classNames, `w-65 h-65 bg-(--light-orange) text-(--grey-950) transition-colors duration-300 caption-l 
            ease-out hover:bg-(--dark-orange) hover:text-(--white)`];
    } else {
        classNames = [...classNames, "w-27 h-27 cursor-default body-2xs text-(--grey-950)"];
        if (isOwner) {
            classNames = [...classNames, "bg-(--light-orange)"];
        } else {
            classNames = [...classNames, "bg-(--grey-200) text-(--grey-950)"];
        }
        if (hasBorder && !isOwner) {
            classNames = [...classNames, "border-white border border-solid"];
        }
        if (withDrawal) {
            classNames = [...classNames, "-ml-8"];
        }
    }

    return (
        <span className={classNames.join(" ")}>{text}</span>
    );
}