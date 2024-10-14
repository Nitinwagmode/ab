// hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login'); // Ensure this is a client-side redirect
    }
  }, [router]);
};
