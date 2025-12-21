import { HeaderMenuItems } from "../enums/enums";

export function formatDate(date: Date, addTime: boolean = true): string {
    const dateStr = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long" }).format(date);
    const timeStr = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(date);
    return `${dateStr}${addTime ? `, ${timeStr}` : ""}`;
}

export function getHeaderMenuItem(pathname: string | null): HeaderMenuItems {
    type AppRoute = "/projects" | "/profile";
    const headerMenuMap: Record<AppRoute, HeaderMenuItems> = {
        "/projects": HeaderMenuItems.Projects,
        "/profile": HeaderMenuItems.Profile,
    };

    if (!pathname) return HeaderMenuItems.Dashboard;

    if (pathname in headerMenuMap) {
        return headerMenuMap[pathname as AppRoute];
    }

    return HeaderMenuItems.Dashboard;
}