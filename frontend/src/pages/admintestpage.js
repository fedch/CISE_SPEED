// A temporary page to test the admin functionality

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginTestPage() {
  const [email, setEmail] = useState('');  // State to hold the email input
  const [loggedInEmail, setLoggedInEmail] = useState(''); // State for the logged-in email
  const router = useRouter();

  // Handle login button click
  const handleLogin = () => {
    if (email === 'nanipip554@sgatra.com') {
      // Save the email to localStorage and set loggedInEmail state
      localStorage.setItem('email', email);
      setLoggedInEmail(email); // Set the email as logged in

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } else {
      alert('You are not an admin!');
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    // Clear the email from localStorage and reset state
    localStorage.removeItem('email');
    setLoggedInEmail('');  // Clear the logged-in state
    setEmail('');  // Clear the email input field
  };

  return (
    <div>
      <h1>Login Test Page</h1>
      {loggedInEmail ? (
        <div>
          <p>Welcome, {loggedInEmail}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
