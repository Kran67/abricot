import { HeaderMenuItems } from "@/app/enums/enums";

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

export const getInitials = (name?: string) =>
    name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "?";

export const validatePassword = (pw: string): boolean => {
    if (!pw || pw.trim() === "") return false;

    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pw);
}

export const redirectWithDelay = (url: string, delay: number = 0): void => {
    setTimeout(() => window.location.href = url, delay);
}

export const formDataToJSON = (formData: FormData) => {
    const json: any = {};
    formData.forEach((value: FormDataEntryValue, key: string) => json[key] = value);
    return json;
}

export const formatYMMDD = (date: Date, locale: string = "en-GB"): string => {
    const parts: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);

    const map: {
        [k: string]: string;
    } = Object.fromEntries(
        parts.filter(p => p.type !== "literal").map(p => [p.type, p.value])
    );

    return `${map.year}-${map.month}-${map.day}`;
}

export const prepareBodyToShowModal = (overflow: string): any => {
    document.body.style.overflow = overflow;

    return () => {
        document.body.style.overflow = "";
    };
}