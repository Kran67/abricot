'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconButtonTypes } from "@/app/enums/enums";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IconButtonProps {
    type?: IconButtonTypes;
    onClick?: () => void
}

export default function IconButton({ type = IconButtonTypes.Arrow, onClick }: IconButtonProps) {
    const isBackBtn: boolean = type === IconButtonTypes.Arrow;
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        if (isBackBtn) {
            router.push("/projects");
        } else onClick?.();
    };

    const classNames = [
        "icon-button",
        isBackBtn ? "back" : "",
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded-(--radius10)",
        "transition-all",
        "duration-300",
        "ease-out",
        "cursor-pointer",
        "border",
        "border-solid",
        "border-(--grey-200)",
        "hover:border-(--dark-orange)",
        "min-w-57",
        "min-h-57",
        "max-w-57",
        "max-h-57"
    ].join(" ");

    return (
        <button
            className={classNames}
            onClick={handleClick}
            role="button">
            <Image src={"/images/" + (isBackBtn ? "left_arrow" : "three_points") + ".svg"} alt={"Image " + (isBackBtn ? "retour" : "image menu")} width={15} height={4} />
        </button>
    );
}