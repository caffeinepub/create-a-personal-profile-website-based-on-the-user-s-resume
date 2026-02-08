import { ProfileData } from '../../profile/types';
import { Section } from '../layout/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { SiLinkedin, SiGithub } from 'react-icons/si';

interface ContactSectionProps {
  profile: ProfileData;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const hasContactInfo = profile.email || profile.location || profile.linkedin || profile.github;

  if (!hasContactInfo) return null;

  return (
    <Section id="contact">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-display">Get in Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Feel free to reach out for opportunities or just to connect
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.email && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">Email</span>
                  </div>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`mailto:${profile.email}`}>
                      {profile.email}
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}

              {profile.location && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">Location</span>
                  </div>
                  <div className="p-3 border rounded-md bg-muted/30">
                    {profile.location}
                  </div>
                </div>
              )}

              {profile.linkedin && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <SiLinkedin className="h-5 w-5" />
                    <span className="font-medium">LinkedIn</span>
                  </div>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      View Profile
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}

              {profile.github && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <SiGithub className="h-5 w-5" />
                    <span className="font-medium">GitHub</span>
                  </div>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      View Profile
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
