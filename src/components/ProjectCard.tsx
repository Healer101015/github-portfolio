import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react'; // Ícones
import { Repo } from '../hooks/useGitHubRepos';

interface ProjectCardProps {
    repo: Repo;
}

// Imagem de fallback com estilo dark/fintech
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400";

export function ProjectCard({ repo }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col overflow-hidden bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors duration-300">
                <div className="w-full h-48 overflow-hidden bg-slate-800 relative">
                    <img
                        src={repo.thumbnail || FALLBACK_IMAGE}
                        alt={`Thumbnail de ${repo.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                    />
                    {/* Overlay sutil de gradiente (Estilo Fintech) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                <CardHeader>
                    <CardTitle className="text-xl font-bold text-white truncate">
                        {repo.name}
                    </CardTitle>
                    <CardDescription className="text-slate-400 line-clamp-2 mt-2 min-h-[40px]">
                        {repo.description}
                    </CardDescription>
                </CardHeader>

                <CardFooter className="mt-auto flex gap-4 pt-4">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <Github className="w-4 h-4 mr-2" />
                        Repositório
                    </a>
                    {repo.homepage && (
                        <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors ml-auto"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Deploy
                        </a>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
}