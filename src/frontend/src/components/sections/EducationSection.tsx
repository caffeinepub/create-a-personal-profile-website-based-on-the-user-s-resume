import { ProfileData } from '../../profile/types';
import { Section } from '../layout/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  profile: ProfileData;
}

export function EducationSection({ profile }: EducationSectionProps) {
  if (!profile.education || profile.education.length === 0) return null;

  return (
    <Section id="education" className="bg-muted/30">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-display">Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Academic background and qualifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <CardDescription className="mt-1">
                      {edu.institution}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.field && edu.field !== edu.degree && (
                  <p className="text-sm mt-2">{edu.field}</p>
                )}
                {edu.description && (
                  <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
