'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authendication.isAuthenticated
  );

  const publicRoutes = ['/auth/login', '/auth/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/auth/login');
    }

    if (isAuthenticated && isPublicRoute) {
      router.push('/');
    }
  }, [isAuthenticated, isPublicRoute, router]);

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
