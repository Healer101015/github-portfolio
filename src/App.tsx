import { useGitHubRepos } from './hooks/useGitHubRepos';
import { ProjectCard } from './components/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Portfolio() {
  const { repos, loading, error } = useGitHubRepos('Healer101015');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 md:p-16">
      <header className="max-w-6xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
          Meus Projetos
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Explorando soluções através de código. Abaixo, você encontra meus projetos recentes extraídos automaticamente do GitHub.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {error ? (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl bg-slate-800" />
                  <Skeleton className="h-4 w-[250px] bg-slate-800" />
                  <Skeleton className="h-4 w-[200px] bg-slate-800" />
                </div>
              ))
              : repos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
}