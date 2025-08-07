'use client';

import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { selectIsAuthenticated, selectUser } from '@/lib/features/auth/authSlice';
=======
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
>>>>>>> main
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth<P extends object>(
<<<<<<< HEAD
  WrappedComponent: React.ComponentType<P>,
  role?: string
) {
  const AuthComponent = (props: P) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
=======
  WrappedComponent: React.ComponentType<P>
) {
  const AuthComponent = (props: P) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
>>>>>>> main
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
<<<<<<< HEAD
      } else if (role && user?.role !== role) {
        router.push('/');
      }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || (role && user?.role !== role)) {
=======
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
>>>>>>> main
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
}
