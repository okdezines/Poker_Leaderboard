'use client';

import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  role?: string
) {
  const AuthComponent = (props: P) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // We need to wait for the Redux store to be hydrated on the client side
      // before we can check the authentication status.
      if (isAuthenticated !== null) {
        setIsLoading(false);
      }
    }, [isAuthenticated]);

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login');
        } else if (role && user?.role !== role) {
          router.push('/');
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading || !isAuthenticated || (role && user?.role !== role)) {
      return <div>Loading...</div>; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
}
