import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseResume } from '../../profile/parseResume';
import { ProfileData } from '../../profile/types';
import { FileText, Sparkles, Upload, X } from 'lucide-react';

interface ResumeIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (profile: ProfileData) => void;
  initialProfile?: ProfileData;
}

export function ResumeIntakeDialog({ open, onOpenChange, onSubmit, initialProfile }: ResumeIntakeDialogProps) {
  const [resumeText, setResumeText] = useState('');
  const [manualProfile, setManualProfile] = useState<Partial<ProfileData>>(initialProfile || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(initialProfile?.photoDataUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleParse = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const parsed = parseResume(resumeText);
      onSubmit(parsed);
      setIsProcessing(false);
      onOpenChange(false);
    }, 500);
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPhotoPreview(dataUrl);
        setManualProfile({ ...manualProfile, photoDataUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearPhoto = () => {
    setPhotoPreview(undefined);
    setManualProfile({ ...manualProfile, photoDataUrl: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleManualSubmit = () => {
    const profile: ProfileData = {
      name: manualProfile.name || '',
      title: manualProfile.title || '',
      summary: manualProfile.summary || '',
      email: manualProfile.email,
      phone: manualProfile.phone,
      location: manualProfile.location,
      linkedin: manualProfile.linkedin,
      github: manualProfile.github,
      photoDataUrl: manualProfile.photoDataUrl,
      experience: manualProfile.experience || [],
      education: manualProfile.education || [],
      skills: manualProfile.skills || [],
      projects: manualProfile.projects || []
    };
    onSubmit(profile);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            Create Your Profile
          </DialogTitle>
          <DialogDescription>
            Paste your resume text or enter your information manually to generate your professional profile.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="paste" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paste">
              <FileText className="h-4 w-4 mr-2" />
              Paste Resume
            </TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paste Your Resume</CardTitle>
                <CardDescription>
                  Copy and paste your resume text below. Our parser will extract your information automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <Button
                  onClick={handleParse}
                  disabled={!resumeText.trim() || isProcessing}
                  className="mt-4 w-full"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : 'Generate Profile'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Photo Upload Section */}
                <div className="space-y-2">
                  <Label htmlFor="photo">Profile Photo</Label>
                  <div className="flex items-start gap-4">
                    {photoPreview ? (
                      <div className="relative">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                          <img
                            src={photoPreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={handleClearPhoto}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        ref={fileInputRef}
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-muted-foreground">
                        Upload a profile photo (JPG, PNG, or GIF)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={manualProfile.name || ''}
                      onChange={(e) => setManualProfile({ ...manualProfile, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={manualProfile.title || ''}
                      onChange={(e) => setManualProfile({ ...manualProfile, title: e.target.value })}
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary *</Label>
                  <Textarea
                    id="summary"
                    value={manualProfile.summary || ''}
                    onChange={(e) => setManualProfile({ ...manualProfile, summary: e.target.value })}
                    placeholder="Brief description of your professional background..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={manualProfile.email || ''}
                      onChange={(e) => setManualProfile({ ...manualProfile, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={manualProfile.location || ''}
                      onChange={(e) => setManualProfile({ ...manualProfile, location: e.target.value })}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={manualProfile.linkedin || ''}
                      onChange={(e) => setManualProfile({ ...manualProfile, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={manualProfile.github || ''}
                      onChange={(e) => setManualProfile({ ...manualProfile, github: e.target.value })}
                      placeholder="https://github.com/johndoe"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleManualSubmit}
                  disabled={!manualProfile.name || !manualProfile.title || !manualProfile.summary}
                  className="w-full"
                  size="lg"
                >
                  Create Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
