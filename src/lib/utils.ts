import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utilitário padrão do shadcn
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Extrai a primeira imagem de um texto em Markdown ou HTML
export const extractFirstImageFromMarkdown = (content: string): string | null => {
    // Padrão 1: Markdown ![alt](url)
    const mdRegex = /!\[[^\]]*\]\((.*?)\)/;
    const mdMatch = content.match(mdRegex);
    if (mdMatch && mdMatch[1]) return mdMatch[1];

    // Padrão 2: Tag HTML <img src="url" />
    const htmlRegex = /<img[^>]+src=["']([^"']+)["']/;
    const htmlMatch = content.match(htmlRegex);
    if (htmlMatch && htmlMatch[1]) return htmlMatch[1];

    return null;
};

// Decodifica Base64 seguro (limpando quebras de linha do GitHub)
export const decodeBase64 = (base64: string): string => {
    try {
        const cleanBase64 = base64.replace(/\n/g, '');
        // Suporte para caracteres Unicode
        return decodeURIComponent(escape(window.atob(cleanBase64)));
    } catch (error) {
        console.error("Erro ao decodificar Base64", error);
        return "";
    }
}