export function extractFirstImage(readmeBase64: string): string | null {
    try {
        const decoded = atob(readmeBase64);

        const match = decoded.match(/!\[.*?\]\((.*?)\)/);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    } catch {
        return null;
    }
}