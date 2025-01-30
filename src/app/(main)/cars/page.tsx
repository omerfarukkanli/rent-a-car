'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { carService } from '@/store/service/car.service';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEnumConverter } from '@/hooks/enumConvert';

const CarsPage = () => {
  const { data: cars, isLoading, isError } = carService.useGetCarsQuery();
  const router = useRouter();
  const { convertCarType, convertFuelType } = useEnumConverter();

  const handleCarClick = (id: string) => {
    router.push(`/cars/${id}`);
  };

  if (isLoading) {
    return (
      <div className='flex h-[200px] items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-primary' />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (!cars || !Array.isArray(cars)) {
    return <div>No cars available</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto my-5 py-5'>
      {cars &&
        cars.map((car, index) => (
          <Card key={index}>
            <div className='w-full relative aspect-[4/3] border-b-2 border-gray-200'>
              <Image
                src={car.image}
                fill
                className='object-cover rounded-t-lg'
                priority
                alt={car.brand}
              />
            </div>
            <CardContent className='py-4 flex flex-col gap-4'>
              <CardTitle className='text-lg font-semibold text-center'>
                {car.brand} - {car.carModel}
              </CardTitle>

              <div className='grid grid-cols-2 gap-4'>
                <div className='text-left'>
                  <span className='text-sm font-medium'>Araç Tipi</span>
                  <p className='text-sm text-gray-500'>{convertCarType(car.carType)}</p>
                </div>
                <div className='text-left'>
                  <span className='text-sm font-medium'>Model Yılı</span>
                  <p className='text-sm text-gray-500'>{car.year}</p>
                </div>
                <div className='text-left'>
                  <span className='text-sm font-medium'>Renk</span>
                  <p className='text-sm text-gray-500'>{car.color}</p>
                </div>
                <div className='text-left'>
                  <span className='text-sm font-medium'>Yakıt Tipi</span>
                  <p className='text-sm text-gray-500'>{convertFuelType(car.carFuelType)}</p>
                </div>
              </div>

              <Button onClick={() => handleCarClick(car._id)}>Kirala</Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CarsPage;
