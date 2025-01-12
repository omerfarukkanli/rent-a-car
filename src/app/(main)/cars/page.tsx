'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { carService } from '@/store/service/car.service';
import { Car } from '@/store/types';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CarsPage = () => {
  const [fetch, { data, isLoading, isError }] =
    carService.useLazyGetCarsQuery();
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (data && 'data' in data) {
      setCars(data.data as unknown as Car[]);
    }
  }, [data]);
  if (isLoading) {
    return (
      <div className='flex h-[200px] items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin text-primary' />
      </div>
    );
  }

  console.log('cars', cars);

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1>Cars</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto my-5'>
        {cars.map((car, index) => (
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
            <CardContent className='py-4 flex flex-col gap-2'>
              <CardTitle className='text-lg font-semibold text-center'>
                {car.brand} - {car.carModel}
              </CardTitle>

              <div className='flex items-center justify-around'>
                <div className='text-left'>
                  <span>Araç Tipi:</span>
                  <p className='text-sm text-gray-500'>{car.carType}</p>
                </div>
                <div className='text-left'>
                  <span>Araç Yaşı:</span>
                  <p className='text-sm text-gray-500'>{car.year}</p>
                </div>
              </div>

              <div className='flex items-center justify-around'>
                <div className='text-left'>
                  <span>Araç Rengi:</span>
                  <p className='text-sm text-gray-500'>{car.color}</p>
                </div>
                <div className='text-left'>
                  <span>Yakıt Tipi:</span>
                  <p className='text-sm text-gray-500'>{car.carFuelType}</p>
                </div>
              </div>
              <Button>Kirala</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
