'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MenuItemTypes } from "@/app/enums/enums";

interface MenuItemProps {
    type?: MenuItemTypes;
    isActive?: boolean;
}

export default function MenuItem({ type = MenuItemTypes.Dashboard, isActive = false }: MenuItemProps) {
    const isDashboard = type === MenuItemTypes.Dashboard;
    const router: AppRouterInstance = useRouter();

    const handleClick: () => void = () => {
        router.push(isDashboard ? "/" : "/projects");
    };

    const classNames: string[] = [
        "menu-item",
        isActive ? "active" : "",
        "inline-flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-(--radius10)",
        "gap-16",
        "body-m",
        "transition-colors",
        "duration-300",
        "ease-out",
        "cursor-pointer",
        isActive ? "bg-(--grey-950)" : "bg-(--white)",
        isActive ? "text-(--white)" : "text-(--dark-orange)",
        !isActive ? "hover:bg-(--grey-950)" : "",
        !isActive ? "hover:text-(--white)" : "",
        "md:w-248",
        "lg:w-248",
        "xl:w-248",
        "h-78",
        "min-w-78"
    ];
    const text: string = isDashboard ? "Tableau de bord" : "Projets";

    return (
        <button className={classNames.join(" ")} onClick={handleClick} role="button">
            <Image src={"/images/" + (isDashboard ? "dashbord" : "project") + ".svg"} alt={isDashboard ? "Image tableau de bord" : "Image projet"} width={isDashboard ? 24 : 29} height={isDashboard ? 24 : 23} />
            <span className="hidden md:inline lg:inline xl:inline" >{text}</span>
        </button>
    );
}