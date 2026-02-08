import { ProfileData } from '../../profile/types';
import { Section } from '../layout/Section';
import { Badge } from '@/components/ui/badge';

interface SkillsSectionProps {
  profile: ProfileData;
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  if (!profile.skills || profile.skills.length === 0) return null;

  return (
    <Section id="skills">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-display">Skills & Technologies</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technical expertise and core competencies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {profile.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </Section>
  );
}
