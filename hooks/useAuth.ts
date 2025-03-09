import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setAuthState({ user, loading: false, error: null });
      },
      (error) => {
        setAuthState({ user: null, loading: false, error: error as Error });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return authState;
} 