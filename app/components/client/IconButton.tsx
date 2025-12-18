'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconButtonTypes } from "../../enums/enums";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IconButtonProps {
    type?: IconButtonTypes;
}

export default function IconButton({ type = IconButtonTypes.Arrow }: IconButtonProps) {
    const isBackBtn: boolean = type === IconButtonTypes.Arrow;
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        router.push(isBackBtn ? "" : "");
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
        "w-57",
        "h-57"
    ].join(" ");

    return (
        <button
            className={classNames}
            onClick={handleClick}>
            <Image src={"/images/" + (isBackBtn ? "left_arrow" : "three_points") + ".svg"} alt={"Image " + (isBackBtn ? "flèche gauche" : "pointillés")} width={15} height={4} />
        </button>
    );
}