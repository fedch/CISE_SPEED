import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/account/my-activity" className="text-white">My Activity</Link>
        </li>
        <li>
          <Link href="/account/login" className="text-white">Login/Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
