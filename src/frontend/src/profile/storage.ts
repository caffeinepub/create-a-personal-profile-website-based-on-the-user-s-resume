import { ProfileData, emptyProfile } from './types';

const STORAGE_KEY = 'resume_profile_data';

export function saveProfile(profile: ProfileData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save profile:', error);
  }
}

export function loadProfile(): ProfileData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure backward compatibility - older profiles without photoDataUrl will work fine
      return {
        ...parsed,
        photoDataUrl: parsed.photoDataUrl || undefined
      } as ProfileData;
    }
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
  return null;
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear profile:', error);
  }
}

export function isProfileEmpty(profile: ProfileData | null): boolean {
  if (!profile) return true;
  return !profile.name || profile.name.trim().length === 0;
}
