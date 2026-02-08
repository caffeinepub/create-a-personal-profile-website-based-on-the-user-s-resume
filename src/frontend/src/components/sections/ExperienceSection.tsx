import { ProfileData } from '../../profile/types';
import { Section } from '../layout/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  profile: ProfileData;
}

export function ExperienceSection({ profile }: ExperienceSectionProps) {
  if (!profile.experience || profile.experience.length === 0) return null;

  return (
    <Section id="experience">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-display">Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and key accomplishments
          </p>
        </div>

        <div className="space-y-6">
          {profile.experience.map((exp, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{exp.position}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {exp.company} • {exp.startDate} - {exp.endDate}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {exp.description && (
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="flex-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
