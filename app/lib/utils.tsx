export function formatDate(date: Date, addTime: boolean = true): string {
    const dateStr = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long" }).format(date);
    const timeStr = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(date);
    return `${dateStr}${addTime ? `, ${timeStr}` : ""}`;
}