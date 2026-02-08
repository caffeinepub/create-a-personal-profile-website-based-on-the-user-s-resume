import { ProfileData } from '../../profile/types';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  profile: ProfileData;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_2400x1350.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
                {profile.name || 'Your Name'}
              </h1>
              <p className="text-2xl md:text-3xl text-primary font-medium">
                {profile.title || 'Your Professional Title'}
              </p>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
              {profile.summary || 'Your professional summary will appear here.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={scrollToAbout} className="shadow-medium">
                Learn More
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              {profile.email && (
                <Button size="lg" variant="outline" asChild>
                  <a href={`mailto:${profile.email}`}>Get in Touch</a>
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden rounded-2xl">
              <img
                src={profile.photoDataUrl || '/assets/generated/profile-illustration.dim_768x768.png'}
                alt={profile.name || 'Profile'}
                className="w-full h-full object-cover drop-shadow-2xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
