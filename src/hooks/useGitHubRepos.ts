import { useState, useEffect } from 'react';
import { extractFirstImageFromMarkdown, decodeBase64 } from '../lib/utils';

export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    updated_at: string;
    homepage: string | null;
    thumbnail: string | null;
}

const CACHE_KEY = '@portfolio:github-repos';
const CACHE_EXPIRATION_MS = 1000 * 60 * 60 * 24; // 24 horas

export function useGitHubRepos(username: string) {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // 1. Verifica o Cache
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
                        setRepos(data);
                        setLoading(false);
                        return;
                    }
                }

                // DICA SENIOR: Para evitar o limite de 60 req/h, adicione um PAT (Personal Access Token)
                // nos headers se for usar em produção intensamente: { Authorization: `token ${YOUR_TOKEN}` }
                const headers = { Accept: 'application/vnd.github.v3+json' };

                // 2. Busca Repositórios
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers });

                if (!reposRes.ok) {
                    if (reposRes.status === 403) throw new Error('API Rate Limit excedido. Tente novamente mais tarde.');
                    throw new Error('Falha ao buscar repositórios.');
                }

                const reposData = await reposRes.json();

                // Filtra apenas projetos com descrição
                const validRepos = reposData.filter((repo: any) => repo.description && !repo.fork);

                // 3. Busca o README e extrai a imagem para cada repositório em paralelo
                const reposWithImages = await Promise.all(
                    validRepos.map(async (repo: any): Promise<Repo> => {
                        let thumbnail = null;
                        try {
                            const readmeRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`, { headers });
                            if (readmeRes.ok) {
                                const readmeData = await readmeRes.json();
                                const decodedReadme = decodeBase64(readmeData.content);
                                thumbnail = extractFirstImageFromMarkdown(decodedReadme);
                            }
                        } catch (err) {
                            console.warn(`Sem README ou erro ao processar: ${repo.name}`);
                        }

                        return {
                            id: repo.id,
                            name: repo.name,
                            description: repo.description,
                            html_url: repo.html_url,
                            updated_at: repo.updated_at,
                            homepage: repo.homepage,
                            thumbnail,
                        };
                    })
                );

                // Ordena por data de atualização (mais recentes primeiro)
                const sortedRepos = reposWithImages.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

                // Salva no cache
                localStorage.setItem(CACHE_KEY, JSON.stringify({ data: sortedRepos, timestamp: Date.now() }));

                setRepos(sortedRepos);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (username) fetchRepos();
    }, [username]);

    return { repos, loading, error };
}