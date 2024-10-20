// This is the signup page. It contains a form with an email and password input field. 
// When the form is submitted, a POST request is made to the /auth/signup endpoint with the email and password in the request body. 
// If the request is successful, a POST request is made to the /auth/login endpoint with the same email and password to log in the user. 
// If the login request is successful, the access token is stored in localStorage and the user is redirected to the homepage.

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Automatically log in after signup
        const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('token', loginData.access_token); // Store the token in localStorage
          router.push('/'); // Redirect to homepage after login
        } else {
          const loginError = await loginResponse.json();
          setError(loginError.message || 'Signup successful but login failed'); // Handle login failure
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed'); // Set error message from backend
      }
    } catch (err) {
      setError('An error occurred. Please try again.'); // Handle network errors
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignup} className="form">
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
      <style jsx>{`
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .form {
            background-color: #f0f0f0;
            padding: 2rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }

        h2 {
            margin-bottom: 1.5rem;
            color: #333;
        }

        p {
            color: #333;
        }

        input {
            display: block;
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            color: #7e7e7e;
        }

        button {
            display: block;
            width: 100%;
            padding: 0.75rem;
            background-color: #7e7e7e;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 1rem;
        }

        button:hover {
            background-color: #005bb5;
        }

        p {
            margin-top: 1rem;
        }

        a {
            color: #0070f3;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
        `}</style>
    </div>
  );
}
