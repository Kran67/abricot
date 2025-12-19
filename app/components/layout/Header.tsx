'use client'

import Logo from "@/app/components/ui/Logo";
import MenuItem from "@/app/components/ui/MenuItem";
import UserIcon from "@/app/components/ui/UserIcon";
import { MenuItemTypes, UserIconModes, HeaderMenuItems } from "@/app/enums/enums";

interface HeaderProps {
    activeMenu: HeaderMenuItems;
}

export default function Header({ activeMenu }: HeaderProps) {
    const classNames = [
        "flex",
        "flex-1",
        "justify-between",
        "items-center",
        "bg-(--white)",
        "h-94",
        "pt-8",
        "pl-100",
        "pr-100",
        "pb-8",
        "self-stretch"
    ].join(" ");

    return (
        <header className={classNames}>
            <Logo />
            <div className="flex gap-16">
                <MenuItem isActive={activeMenu === HeaderMenuItems.Dashboard} />
                <MenuItem type={MenuItemTypes.Projects} isActive={activeMenu === HeaderMenuItems.Projects} />
            </div>
            <UserIcon text="AD" mode={UserIconModes.Large} url="/" isActive={activeMenu === HeaderMenuItems.Profile} />
        </header>
    );
}