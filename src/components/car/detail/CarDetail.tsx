'use client';

import { Card } from '@/components/ui/card';
import { carService } from '@/store/service/car.service';
import { Loader2 } from 'lucide-react';

import CarDetailCardContent from './CarDetailCardContent';
import CarDetailImage from './CarDetailImage';

interface CarDetailClientProps {
  id: string;
}

const CarDetailClient = ({ id }: CarDetailClientProps) => {
  const { data: cars, isLoading, isError } = carService.useGetCarsQuery();
  const car = cars?.find((car) => car._id === id);

  if (isLoading) {
    return (
      <div className='flex h-[200px] items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-primary' />
      </div>
    );
  }

  if (isError || !car) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className='my-24'>
      <Card className='w-[600px] mx-auto h-full'>
        <div className='border-b mb-3'>
          <CarDetailImage car={car} />
        </div>
        <CarDetailCardContent car={car} />
      </Card>
    </div>
  );
};

export default CarDetailClient;
