// A temporary page for logging out
// To be merged with the navbar when it is created

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LogoutTestPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    alert('You have been logged out');
    router.push('/login'); // Redirect to login after logging out
  }, [router]);

  return null; // No need to render anything
}
