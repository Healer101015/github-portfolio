const BASE_URL = "https://api.github.com";

export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    owner: {
        login: string;
    };
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(
        `${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar repositórios");
    }

    const data = await response.json();

    return data;
}