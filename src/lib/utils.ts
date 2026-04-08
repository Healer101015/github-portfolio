import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const extractFirstImageFromMarkdown = (content: string): string | null => {
    const mdRegex = /!\[.*?\]\((.*?)\)/;
    const mdMatch = content.match(mdRegex);
    if (mdMatch && mdMatch[1]) return mdMatch[1];

    const htmlRegex = /<img[^>]+src=["']([^"']+)["']/;
    const htmlMatch = content.match(htmlRegex);
    if (htmlMatch && htmlMatch[1]) return htmlMatch[1];

    return null;
};

export const decodeBase64 = (base64: string): string => {
    try {
        // Remove quebras de linha ocultas que a API do GitHub envia e quebram o atob()
        const cleanBase64 = base64.replace(/\n/g, '');
        return decodeURIComponent(escape(window.atob(cleanBase64)));
    } catch (error) {
        console.error("Erro ao decodificar Base64", error);
        return "";
    }
};