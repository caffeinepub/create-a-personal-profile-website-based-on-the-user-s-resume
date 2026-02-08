import { useEffect } from 'react';
import { ProfileData } from '../profile/types';

export function useSeoMetadata(profile: ProfileData) {
  useEffect(() => {
    const title = profile.name 
      ? `${profile.name} - ${profile.title || 'Professional Profile'}`
      : 'Professional Profile';
    
    const description = profile.summary 
      ? profile.summary.substring(0, 160)
      : 'Professional profile and resume showcase';

    document.title = title;

    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
  }, [profile]);
}

function updateMetaTag(attribute: string, value: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}
