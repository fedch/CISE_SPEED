// This is a temporary page to test the login token functionality.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TestPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get the user data (username in this case)
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
      setUsername(payload.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login'); // Redirect to login after sign-out
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div className="logged-in">
          <h2>Welcome, {username}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="not-logged-in">
          <h2>You are not logged in.</h2>
          <button onClick={() => router.push('/login')}>Log In</button>
          <button onClick={() => router.push('/signup')}>Sign Up</button>
        </div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        h2 {
          margin-bottom: 1.5rem;
        }

        button {
          display: block;
          margin: 0.5rem;
          padding: 0.75rem;
          background-color: #7e7e7e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 200px;
          text-align: center;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
