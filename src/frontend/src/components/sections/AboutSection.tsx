import { ProfileData } from '../../profile/types';
import { Section } from '../layout/Section';

interface AboutSectionProps {
  profile: ProfileData;
}

export function AboutSection({ profile }: AboutSectionProps) {
  if (!profile.summary) return null;

  return (
    <Section id="about" className="bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-center mb-12">About Me</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-foreground">
            {profile.summary}
          </p>
        </div>
      </div>
    </Section>
  );
}
