import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Edit3 } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { cn } from '@/lib/utils';

interface TopNavProps {
  onEditClick: () => void;
  profileName?: string;
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export function TopNav({ onEditClick, profileName }: TopNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(sections.map(s => s.id), 150);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display text-xl font-semibold hover:text-primary transition-colors"
          >
            {profileName || 'Profile'}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.slice(1).map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'transition-colors',
                  activeSection === section.id && 'bg-accent text-accent-foreground'
                )}
              >
                {section.label}
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={onEditClick} className="ml-2">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onEditClick}>
              <Edit3 className="h-4 w-4" />
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-2 mt-8">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? 'secondary' : 'ghost'}
                      onClick={() => scrollToSection(section.id)}
                      className="justify-start"
                    >
                      {section.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
