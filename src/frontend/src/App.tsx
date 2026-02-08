import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { PageShell } from './components/layout/PageShell';
import { TopNav } from './components/nav/TopNav';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ContactSection } from './components/sections/ContactSection';
import { ResumeIntakeDialog } from './components/resume/ResumeIntakeDialog';
import { useResumeProfile } from './hooks/useResumeProfile';
import { useSeoMetadata } from './hooks/useSeoMetadata';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';

function App() {
  const { profile, isEmpty, isLoading, updateProfile } = useResumeProfile();
  const [showIntakeDialog, setShowIntakeDialog] = useState(false);

  useSeoMetadata(profile);

  useEffect(() => {
    if (!isLoading && isEmpty) {
      setShowIntakeDialog(true);
    }
  }, [isLoading, isEmpty]);

  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <PageShell>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </PageShell>
      </ThemeProvider>
    );
  }

  if (isEmpty && !showIntakeDialog) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <PageShell>
          <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl font-display">Welcome to Your Profile Builder</CardTitle>
                <CardDescription className="text-lg">
                  Create a beautiful professional profile website by providing your resume information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setShowIntakeDialog(true)}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  You can paste your resume text or enter your information manually
                </p>
              </CardContent>
            </Card>
          </div>
          <ResumeIntakeDialog
            open={showIntakeDialog}
            onOpenChange={setShowIntakeDialog}
            onSubmit={updateProfile}
          />
        </PageShell>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <PageShell>
        <TopNav onEditClick={() => setShowIntakeDialog(true)} profileName={profile.name} />
        
        <main>
          <HeroSection profile={profile} />
          <AboutSection profile={profile} />
          <ExperienceSection profile={profile} />
          <EducationSection profile={profile} />
          <SkillsSection profile={profile} />
          <ProjectsSection profile={profile} />
          <ContactSection profile={profile} />
        </main>

        <Footer profile={profile} />

        <ResumeIntakeDialog
          open={showIntakeDialog}
          onOpenChange={setShowIntakeDialog}
          onSubmit={updateProfile}
          initialProfile={profile}
        />
      </PageShell>
    </ThemeProvider>
  );
}

export default App;
