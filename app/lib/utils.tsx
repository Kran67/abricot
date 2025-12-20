import { HeaderMenuItems } from "../enums/enums";

export function formatDate(date: Date, addTime: boolean = true): string {
    const dateStr = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long" }).format(date);
    const timeStr = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(date);
    return `${dateStr}${addTime ? `, ${timeStr}` : ""}`;
}

export function createCookie(name: string, value: any, days: number): void {
    let expires: string = "";
    if (days) {
        const date: Date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}

export function eraseCookie(name: string): void {
    createCookie(name, "", -1);
}

export function readCookie(name: string): string {
    const nameEq: string = `${name}=`,
        ca: string[] = document.cookie.split(';');
    ca.forEach((c: string) => {
        c = c.trim();
        if (c.indexOf(nameEq) === 0) {
            return c.substring(nameEq.length, c.length);
        }
    })
    return "";
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