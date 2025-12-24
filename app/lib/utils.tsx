import { HeaderMenuItems } from "@/app/enums/enums";

/**
 * Formate une date au format 01 janvier (hh:mm)
 * @param date: Date - date à formatter
 * @param addTime: boolean - (défaut vrai), ajout de l'heure ou non, par défaut vrai
 * @returns la date formattée au format chaine de caractères
 */
export function formatDate(date: Date, addTime: boolean = true): string {
    const dateStr: string = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long" }).format(date);
    const timeStr: string = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(date);
    return `${dateStr}${addTime ? `, ${timeStr}` : ""}`;
}

/**
 * Retourne la valeur enum d'un menuItem en fonction du chemin de l'url
 * @param pathname: string - le chemin de l'url
 * @returns une valeur de l'enum HeaderMenuItems
 */
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

/**
 * Retourne les initials d'un nom complet (nom prenéom)
 * @param name: string - nom complet
 * @returns les initials (NP)
 */
export const getInitials = (name?: string) =>
    name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "?";

/**
 * Valide que le mot de passe est conforme à la norme (8 caractère minimum, une lettre majuscule, un chiffre)
 * @param pw: string - le mot de passe à vérifier
 * @returns vrai ou faux
 */
export const validatePassword = (pw: string): boolean => {
    if (!pw || pw.trim() === "") return false;

    const regex: RegExp = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pw);
}

/**
 * Lance une redirection de page avec un délai
 * @param url: string - l'adresse de redirection
 * @param delay: number - (default 0) le delai avant la redirection
 */
export const redirectWithDelay = (url: string, delay: number = 0): void => {
    setTimeout(() => window.location.href = url, delay);
}

/**
 * Formate une date au format Y-MM-DD
 * @param date: Date - la date à formatter
 * @param locale: string - (défaut en-GB), la culture pour le formattage
 * @returns La date formattée dans le bon format
 */
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

/**
 * Prépare le corps du document html pour l'affichage de fenêtre modale, enlève la scrollbar
 * @param overflow: string - le type de débordement
 * @returns 
 */
export const prepareBodyToShowModal = (overflow: string): any => {
    document.body.style.overflow = overflow;

    return () => {
        document.body.style.overflow = "";
    };
}