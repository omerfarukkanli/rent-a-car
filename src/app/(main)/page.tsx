'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useEnumConverter } from '@/hooks/enumConvert';
import { CarFuelType, CarType } from '@/store/types';
import { DateRange } from 'react-day-picker';

export default function Home() {
  const { convertCarType, convertFuelType } = useEnumConverter();
  const [date, setDate] = useState<DateRange | undefined>();

  // Generate years from 1990 to current year
  const years = Array.from(
    { length: new Date().getFullYear() - 1989 },
    (_, i) => (1990 + i).toString()
  );

  return (
    <main className='min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100'>
      <div className='w-full max-w-3xl p-6 space-y-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>
            Hayalinizdeki Aracı Bulun
          </h1>
          <p className='text-gray-500'>
            İhtiyacınıza uygun aracı filtreleyerek kolayca bulun
          </p>
        </div>

        <div className='bg-white p-8 rounded-xl shadow-sm space-y-6'>
          <div>
            <Input
              placeholder='Araç adına göre ara...'
              className='w-full text-lg h-12'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Yıl seçin' />
              </SelectTrigger>
              <SelectContent>
                {years.reverse().map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Yakıt tipi' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CarFuelType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {convertFuelType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Araç tipi' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CarType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {convertCarType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal h-12',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd MMM yyyy')} -{' '}
                        {format(date.to, 'dd MMM yyyy')}
                      </>
                    ) : (
                      format(date.from, 'dd MMM yyyy')
                    )
                  ) : (
                    <span>Tarih aralığı seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button className='w-full h-12 text-lg'>Müsait Araçları Ara</Button>
        </div>
      </div>
    </main>
  );
}
