import { ProfileData } from '../../profile/types';
import { Section } from '../layout/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Folder } from 'lucide-react';

interface ProjectsSectionProps {
  profile: ProfileData;
}

export function ProjectsSection({ profile }: ProjectsSectionProps) {
  if (!profile.projects || profile.projects.length === 0) return null;

  return (
    <Section id="projects" className="bg-muted/30">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-display">Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Featured work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Folder className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1 mb-4">
                  {project.description}
                </CardDescription>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.url && (
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
