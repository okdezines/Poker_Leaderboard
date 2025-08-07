'use client';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  role?: string
) {
  const AuthComponent = (props: P) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (role && user?.role !== role) {
        router.push('/');
      }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || (role && user?.role !== role)) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
}
