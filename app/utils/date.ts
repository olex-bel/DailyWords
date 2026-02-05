
export function parseDate(dateString: string | null): Date | null {
    if (!dateString) {
        return null;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    return new Date(year, month - 1, day);
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

export function sameDay(d1: Date, d2: Date) {
    return d1.getUTCFullYear() == d2.getUTCFullYear() &&
         d1.getUTCMonth() == d2.getUTCMonth() &&
         d1.getUTCDate() == d2.getUTCDate();
}
