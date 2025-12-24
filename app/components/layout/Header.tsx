'use client'

import Logo from "@/app/components/ui/Logo";
import MenuItem from "@/app/components/ui/MenuItem";
import UserIcon from "@/app/components/ui/UserIcon";
import { MenuItemTypes, UserIconModes, HeaderMenuItems } from "@/app/enums/enums";
import { User } from "@/app/interfaces/user";
import { useUser } from "@/app/contexts/userContext";

interface HeaderProps {
    activeMenu: HeaderMenuItems;
}

export default function Header({ activeMenu }: HeaderProps) {
    const user: User | null = useUser();
    const classNames = [
        "flex",
        "flex-1",
        "md:justify-between",
        "items-center",
        "justify-center",
        "gap-16",
        "md:gap-0",
        "bg-(--white)",
        "h-94",
        "pt-8",
        "pl-100",
        "pr-100",
        "pb-8",
        "self-stretch"
    ].join(" ");

    let firstName = "";
    let lastName = "";

    if (user?.name) {
        [firstName, lastName] = user?.name.split(" ");
    }
    const userInitials: string = `${firstName ? firstName[0] : "X"}${lastName ? lastName[0] : "X"}`;

    return (
        <header className={classNames}>
            <Logo />
            <div className="flex gap-16">
                <MenuItem isActive={activeMenu === HeaderMenuItems.Dashboard} />
                <MenuItem type={MenuItemTypes.Projects} isActive={activeMenu === HeaderMenuItems.Projects} />
            </div>
            <UserIcon text={userInitials} mode={UserIconModes.Large} url="/profile" isActive={activeMenu === HeaderMenuItems.Profile} />
        </header>
    );
}