export enum UserIconModes {
    Small,
    Large
}

interface UserIconProps {
    text: string;
    mode: UserIconModes;
    isOwner?: boolean;
    hasBorder?: boolean;
}

export function UserIcon({ text, mode, isOwner = false, hasBorder = false }: UserIconProps) {
    let classNames = [
        "inline-flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-full",
        "text-base",
        "uppercase",
    ];
    console.log(mode);
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
    }

    return (
        <span className={classNames.join(" ")}>{text}</span>
    );
}