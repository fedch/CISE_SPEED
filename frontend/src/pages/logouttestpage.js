// A temporary page for logging out
// To be merged with the navbar when it is created

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LogoutTestPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem('email');
    alert('You have been logged out');
    router.push('/login');
  }, [router]);

  return null; // Nothing to render, it's just for logging out
}
