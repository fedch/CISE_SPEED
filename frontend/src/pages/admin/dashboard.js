// This is the admin dashboard page that only the admin user can access.
// It allows the admin to manage user roles (assigning and removing roles).

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [username, setUsername] = useState('');
  // const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [moderators, setModerators] = useState([]);
  const [analysts, setAnalysts] = useState([]);
  const [email, setEmail] = useState('');
  const [newRole, setNewRole] = useState(''); // To store the new role for updating
  const router = useRouter();

  // Fetch users and set moderators/analysts
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8082/admin/users'); // Fetch all users
      const data = await response.json();
      setUsers(data);
      setModerators(data.filter(user => user.role === 'Moderator'));
      setAnalysts(data.filter(user => user.role === 'Analyst'));
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
      setUsername(payload.username);

      // Check if the logged-in user is the admin
      if (payload.username === 'nanipip554@sgatra.com') {
        setIsAdmin(true);
        fetchUsers(); // Fetch users on load
      } else {
        alert('You are not authorized to view this page.');
        router.push('/login');
      }
    } else {
      // If no token is found, redirect to login
      alert('You need to log in first.');
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

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
      setNewRole(data.role); // Set current role for the user to the dropdown
    } catch (err) {
      setSearchError(err.message);
      setSearchResult(null);
    }
  };

  // Handle role change
  const handleRoleChange = async () => {
    try {
      const response = await fetch('http://localhost:8082/admin/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: searchResult.username,
          newRole: newRole,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update role');
      }
      const updatedUser = await response.json();
      alert(`Role updated to ${updatedUser.role}`);
      setSearchResult(updatedUser); // Update the displayed user with the new role

      // Refetch the updated list of users to update moderators/analysts
      await fetchUsers(); // Fetch the updated list after role change
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {username}!</p>
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

          <div>
            <label htmlFor="role">Change Role:</label>
            <select
              id="role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Analyst">Analyst</option>
            </select>
            <button onClick={handleRoleChange}>Update Role</button>
          </div>
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
