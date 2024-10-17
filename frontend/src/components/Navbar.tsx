import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  // Function to check token and set login state
  const checkLoginState = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      setEmail(payload.username);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setEmail(''); // Clear email if not logged in
    }
  };

  useEffect(() => {
    // Check the login state on initial load
    checkLoginState();

    // Listen for route changes and re-check the token on each route change
    const handleRouteChange = () => {
      checkLoginState();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the event listener when component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setEmail(''); // Clear the email
    router.push('/login'); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/articles" className="text-white">Articles</Link>
        </li>
        <li>
          <Link href="/account/my-activity" className="text-white">My Activity</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="text-white">Welcome, {email}</li>
            <li>
              <button onClick={handleLogout} className="text-white">Log out</button>
            </li>
            {/* Conditionally render the Dash link if the email is nanipip554@sgatra.com 
            TODO: Change to a JWT*/}
            {email === 'nanipip554@sgatra.com' && (
              <li>
                <Link href="/admin/dashboard" className="text-white">Dash</Link>
              </li>
            )}
            {/* TODO: Change to a JWT */}
            {email === 'gifyevalmu@gufum.com' && (
              <li>
                <Link href="/analyst/dashboard" className="text-white">Dash</Link>
                </li>
              )}
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="text-white">Log in</Link>
            </li>
            <li>
              <Link href="/signup" className="text-white">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
