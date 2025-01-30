import { Car } from '@/store/types';
import Image from 'next/image';

interface CarDetailImageProps {
  car: Car;
}

const CarDetailImage = ({ car }: CarDetailImageProps) => {
  return (
    <div className='grid md:grid-cols-2 gap-6 p-6 h-1/2'>
      <div className='relative aspect-[4/3]'>
        <Image
          src={car.image}
          alt={car.brand}
          fill
          className='object-cover rounded-lg'
          priority
        />
      </div>
    </div>
  );
};

export default CarDetailImage;
