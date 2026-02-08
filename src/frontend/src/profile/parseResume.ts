import { ProfileData, ExperienceItem, EducationItem, ProjectItem } from './types';

export function parseResume(resumeText: string): ProfileData {
  const lines = resumeText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const profile: ProfileData = {
    name: '',
    title: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  // Extract name (usually first non-empty line)
  if (lines.length > 0) {
    profile.name = lines[0];
  }

  // Extract email
  const emailMatch = resumeText.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    profile.email = emailMatch[0];
  }

  // Extract phone
  const phoneMatch = resumeText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    profile.phone = phoneMatch[0];
  }

  // Extract LinkedIn
  const linkedinMatch = resumeText.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) {
    profile.linkedin = `https://${linkedinMatch[0]}`;
  }

  // Extract GitHub
  const githubMatch = resumeText.match(/github\.com\/[\w-]+/i);
  if (githubMatch) {
    profile.github = `https://${githubMatch[0]}`;
  }

  // Extract location (common patterns)
  const locationMatch = resumeText.match(/(?:Location|Address|Based in)[:\s]+([^\n]+)/i);
  if (locationMatch) {
    profile.location = locationMatch[1].trim();
  }

  // Extract title (look for common job title patterns)
  const titlePatterns = [
    /(?:^|\n)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Engineer|Developer|Designer|Manager|Analyst|Consultant|Architect|Specialist))/,
    /(?:Title|Position|Role)[:\s]+([^\n]+)/i
  ];
  
  for (const pattern of titlePatterns) {
    const match = resumeText.match(pattern);
    if (match) {
      profile.title = match[1].trim();
      break;
    }
  }

  // Extract summary (look for summary/about section)
  const summaryMatch = resumeText.match(/(?:Summary|About|Profile|Objective)[:\s]+([^\n]+(?:\n(?!\n)[^\n]+)*)/i);
  if (summaryMatch) {
    profile.summary = summaryMatch[1].trim();
  }

  // Extract skills
  const skillsMatch = resumeText.match(/(?:Skills|Technologies|Technical Skills)[:\s]+([^\n]+(?:\n(?!\n)[^\n]+)*)/i);
  if (skillsMatch) {
    const skillsText = skillsMatch[1];
    profile.skills = skillsText
      .split(/[,;|\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50);
  }

  // Extract experience (basic pattern matching)
  const experienceSection = resumeText.match(/(?:Experience|Work History|Employment)[:\s]+([\s\S]*?)(?=\n(?:Education|Skills|Projects)|$)/i);
  if (experienceSection) {
    const expText = experienceSection[1];
    const expBlocks = expText.split(/\n\n+/);
    
    for (const block of expBlocks) {
      if (block.trim().length < 10) continue;
      
      const exp: Partial<ExperienceItem> = {
        highlights: []
      };
      
      const blockLines = block.split('\n').map(l => l.trim()).filter(l => l);
      if (blockLines.length > 0) {
        exp.position = blockLines[0];
        
        if (blockLines.length > 1) {
          exp.company = blockLines[1];
        }
        
        const dateMatch = block.match(/(\d{4})\s*[-–—]\s*(\d{4}|Present|Current)/i);
        if (dateMatch) {
          exp.startDate = dateMatch[1];
          exp.endDate = dateMatch[2];
        }
        
        const bulletPoints = block.match(/[•\-*]\s*([^\n]+)/g);
        if (bulletPoints) {
          exp.highlights = bulletPoints.map(bp => bp.replace(/^[•\-*]\s*/, '').trim());
        }
        
        exp.description = blockLines.slice(2).join(' ').substring(0, 200);
        
        if (exp.position && exp.company) {
          profile.experience.push(exp as ExperienceItem);
        }
      }
    }
  }

  // Extract education
  const educationSection = resumeText.match(/(?:Education|Academic Background)[:\s]+([\s\S]*?)(?=\n(?:Experience|Skills|Projects)|$)/i);
  if (educationSection) {
    const eduText = educationSection[1];
    const eduBlocks = eduText.split(/\n\n+/);
    
    for (const block of eduBlocks) {
      if (block.trim().length < 10) continue;
      
      const edu: Partial<EducationItem> = {};
      const blockLines = block.split('\n').map(l => l.trim()).filter(l => l);
      
      if (blockLines.length > 0) {
        edu.degree = blockLines[0];
        
        if (blockLines.length > 1) {
          edu.institution = blockLines[1];
        }
        
        const dateMatch = block.match(/(\d{4})\s*[-–—]\s*(\d{4}|Present|Current)/i);
        if (dateMatch) {
          edu.startDate = dateMatch[1];
          edu.endDate = dateMatch[2];
        }
        
        if (edu.degree && edu.institution) {
          edu.field = edu.degree;
          profile.education.push(edu as EducationItem);
        }
      }
    }
  }

  // Extract projects
  const projectsSection = resumeText.match(/(?:Projects|Portfolio)[:\s]+([\s\S]*?)(?=\n(?:Experience|Education|Skills)|$)/i);
  if (projectsSection) {
    const projText = projectsSection[1];
    const projBlocks = projText.split(/\n\n+/);
    
    for (const block of projBlocks) {
      if (block.trim().length < 10) continue;
      
      const proj: Partial<ProjectItem> = {};
      const blockLines = block.split('\n').map(l => l.trim()).filter(l => l);
      
      if (blockLines.length > 0) {
        proj.name = blockLines[0];
        proj.description = blockLines.slice(1).join(' ').substring(0, 200);
        
        const urlMatch = block.match(/https?:\/\/[^\s]+/);
        if (urlMatch) {
          proj.url = urlMatch[0];
        }
        
        if (proj.name) {
          profile.projects.push(proj as ProjectItem);
        }
      }
    }
  }

  return profile;
}
