'use client'

interface TagProps {
    text: string;
    color?: string;
}

export default function Tag({ text, color }: TagProps) {

    const colors: { [key: string]: string } = {
        done: " bg-(--success-light) text-(--success)",
        todo: " bg-(--error-light) text-(--error)",
        in_progress: " bg-(--warning-light) text-(--warning)",
        user: " bg-(--grey-200) text-(--grey-600)",
        default: " bg-(--light-orange) text-(--dark-orange)",
    };

    const tagColors: string = color ? colors[color] : colors.default;

    const classNames = [
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
        "h-25"
    ].join(" ") + tagColors;

    return (
        <span className={classNames}>{text}</span>
    );
}