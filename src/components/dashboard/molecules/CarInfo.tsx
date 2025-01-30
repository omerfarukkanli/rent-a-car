import { CarImage } from '../atoms/CarImage';

interface CarInfoProps {
  image: string;
  brand: string;
  model: string;
}

export const CarInfo = ({ image, brand, model }: CarInfoProps) => {
  return (
    <div className='flex items-center gap-3'>
      <CarImage src={image} alt={brand} />
      <div>
        <p className='font-medium'>{brand}</p>
        <p className='text-sm text-gray-500'>{model}</p>
      </div>
    </div>
  );
};