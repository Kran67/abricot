'use client'

interface TagProps {
    text: string | undefined;
    color?: string;
    onClick?: () => void;
}

export default function Tag({ text, color, onClick }: TagProps) {
    const handleClick = () => {
        onClick?.();
    };
    const colors: { [key: string]: string } = {
        DONE: " bg-(--success-light) text-(--success)",
        TODO: " bg-(--error-light) text-(--error)",
        IN_PROGRESS: " bg-(--warning-light) text-(--warning)",
        USER: " bg-(--grey-200) text-(--grey-600)",
        DEFAULT: " bg-(--light-orange) text-(--dark-orange)",
    };

    const tagColors: string = color ? colors[color] : colors.DEFAULT;

    const classNames: string = [
        "tag",
        "inline-flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-(--radius50)",
        "text-base",
        "body-s",
        "pt-4",
        "pr-16",
        "pb-4",
        "pl-16",
        "h-25",
        "select-none"
    ].join(" ") + tagColors;

    return (
        <span className={classNames} onClick={handleClick}>{text}</span>
    );
}