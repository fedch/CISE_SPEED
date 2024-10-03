// This is the admin dashboard page that only the admin user can access.
// It allows the admin to manage user roles (assigning and removing roles).

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [moderators, setModerators] = useState([]);
  const [analysts, setAnalysts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch users on load
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8082/admin/users'); // Fetch all users
        const data = await response.json();
        setUsers(data);
        setModerators(data.filter(user => user.role === 'Moderator'));
        setAnalysts(data.filter(user => user.role === 'Analyst'));
        setLoading(false);
      } catch (err) {
        console.error('Failed to load users:', err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user search by email
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8082/admin/user?email=${email}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setSearchResult(data);
      setSearchError('');
    } catch (err) {
      setSearchError(err.message);
      setSearchResult(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, nanipip554@sgatra.com!</p>
      <h2>Search for a User by Email</h2>
      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {searchError && <p style={{ color: 'red' }}>{searchError}</p>}
      {searchResult && (
        <div>
          <h3>User Found:</h3>
          <p>Email: {searchResult.username}</p>
          <p>Role: {searchResult.role}</p>
        </div>
      )}

      <h2>Moderators</h2>
      {moderators.length > 0 ? (
        <ul>
          {moderators.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No moderators found</p>
      )}

      <h2>Analysts</h2>
      {analysts.length > 0 ? (
        <ul>
          {analysts.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No analysts found</p>
      )}
    </div>
  );
}
