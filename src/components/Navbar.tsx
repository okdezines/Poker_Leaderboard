'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { logout } from '@/lib/features/auth/authSlice';
import { selectIsAuthenticated, selectUser } from '@/lib/features/auth/authSlice';
import { useState } from 'react';

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-white text-lg font-bold">
          <Image
            src="https://placehold.co/40x40.png"
            alt="Logo"
            width={40}
            height={40}
            alt="placeholder"
            className="rounded-full"
          />
          <span>PokerLeaderboard</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/events" className="text-gray-300 hover:text-white">
            Events
          </Link>
          <Link href="/members" className="text-gray-300 hover:text-white">
            Members
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
          {user?.role === 'admin' && (
            <Link href="/admin" className="text-gray-300 hover:text-white">
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <span className="text-white">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-300 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link
            href="/"
            className="block text-gray-300 hover:text-white py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/events"
            className="block text-gray-300 hover:text-white py-2"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/members"
            className="block text-gray-300 hover:text-white py-2"
            onClick={() => setIsOpen(false)}
          >
            Members
          </Link>
          <Link
            href="/contact"
            className="block text-gray-300 hover:text-white py-2"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <span className="block text-white py-2">Welcome, {user?.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block text-gray-300 hover:text-white py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
