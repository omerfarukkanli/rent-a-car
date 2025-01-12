'use client';
import { useAppSelector } from '@/hooks/store';
import '../../globals.css';
import { notFound } from 'next/navigation';
import DashBoardHeader from '@/components/header/dashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useAppSelector((state) => state.authendication.role);

  if (role !== 'ADMIN') {
    notFound();
  }
  return (
    <div>
      <DashBoardHeader />
      {children}
    </div>
  );
}
