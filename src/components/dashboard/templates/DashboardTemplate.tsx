'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { CarsTable } from '../organisms/CarsTable';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { Car } from '@/store/types';
import { AddCarForm } from '../molecules/AddCarForm';
import { useState } from 'react';

interface DashboardTemplateProps {
  cars?: Car[];
  isLoading: boolean;
}

export const DashboardTemplate = ({
  cars,
  isLoading,
}: DashboardTemplateProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold'>Araç Yönetimi</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size='lg'>
              <Plus className='mr-2 h-5 w-5' /> Yeni Araç Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Yeni Araç Ekle</DialogTitle>
            </DialogHeader>
            <AddCarForm onCancel={() => setIsAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {cars && <CarsTable cars={cars} />}
    </div>
  );
};
