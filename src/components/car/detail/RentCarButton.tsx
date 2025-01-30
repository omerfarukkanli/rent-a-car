import React, { HtmlHTMLAttributes } from 'react';
import { Button } from '../../ui/button';
import { Car } from '@/store/types';
import DatePicker from '../../DatePicker';

interface RentACarButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  car: Car;
}

const RentCarButton = ({ car }: RentACarButtonProps) => {
  const handleRentClick = () => {
    console.log('Rent button clicked', car);
  };

  return (
    <div className='items-center flex flex-col'>
      <DatePicker
        className='w-1/2 mb-5'
        onDateChange={(dateRange) => {
          if (dateRange?.from && dateRange?.to) {
            console.log('Seçilen tarih aralığı:');
            console.log('Başlangıç tarihi:', dateRange.from);
            console.log('Bitiş tarihi:', dateRange.to);
          }
        }}
      />
      <Button
        className='w-1/2 text-lg py-6'
        size='lg'
        onClick={handleRentClick}
      >
        Hemen Kirala
      </Button>
    </div>
  );
};

export default RentCarButton;
