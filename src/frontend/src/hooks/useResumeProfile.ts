import { useState, useEffect, useCallback } from 'react';
import { ProfileData, emptyProfile } from '../profile/types';
import { loadProfile, saveProfile, clearProfile, isProfileEmpty } from '../profile/storage';

export function useResumeProfile() {
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = loadProfile();
    if (loaded && !isProfileEmpty(loaded)) {
      setProfile(loaded);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setIsLoading(false);
  }, []);

  const updateProfile = useCallback((newProfile: ProfileData) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    setIsEmpty(isProfileEmpty(newProfile));
  }, []);

  const resetProfile = useCallback(() => {
    clearProfile();
    setProfile(emptyProfile);
    setIsEmpty(true);
  }, []);

  return {
    profile,
    isEmpty,
    isLoading,
    updateProfile,
    resetProfile
  };
}
