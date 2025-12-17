export function formatDate(date: Date): string {
    return `${new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long" }).format(date)}, ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(date)}`;
}