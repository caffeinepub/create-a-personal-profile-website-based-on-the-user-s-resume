export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  photoDataUrl?: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}

export const emptyProfile: ProfileData = {
  name: '',
  title: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
};
