// This is the admin dashboard page that only the admin user can access.
// It allows the admin to manage user roles (assigning and removing roles).

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the JWT token to get the payload (username in this case)
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);

      // Check if the logged-in user is the admin
      if (payload.username === 'nanipip554@sgatra.com') {
        setIsAdmin(true);
      } else {
        alert('You are not authorized to view this page.');
        router.push('/login');
      }
    } else {
      // If no token is found, redirect to login
      router.push('/login');
    }
    setLoading(false); // Stop loading once the check is done
  }, [router]);

  // Show loading message while checking token
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not admin, display Access Denied message
  if (!isAdmin) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be an admin to view this page.</p>
        <button onClick={() => router.push('/')}>Go Home</button>
      </div>
    );
  }

  // Render the admin dashboard if the user is logged in as nanipip554@sgatra.com
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {username}!</p>
      <p>This is where you can manage user roles (coming soon).</p>

      <div>
        <h3>Assign Roles</h3>
        <button onClick={() => alert('Assigned role: Moderator')}>Assign Moderator</button>
        <button onClick={() => alert('Assigned role: Analyst')}>Assign Analyst</button>
        <button onClick={() => alert('Removed Moderator')}>Remove Moderator</button>
        <button onClick={() => alert('Removed Analyst')}>Remove Analyst</button>
      </div>
      
      <button onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }}>Sign Out</button>
    </div>
  );
}
