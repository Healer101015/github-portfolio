import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}