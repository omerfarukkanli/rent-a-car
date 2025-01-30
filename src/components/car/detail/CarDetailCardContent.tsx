import { Car } from '@/store/types';
import { CardContent } from '../../ui/card';
import RentCarButton from './RentCarButton';
import { useEnumConverter } from '@/hooks/enumConvert';

interface CarDetailCardContentProps {
  car: Car;
}

const CarDetailCardContent = ({ car }: CarDetailCardContentProps) => {
  const { convertCarType, convertFuelType } = useEnumConverter();

  return (
    <CardContent className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold mb-2'>
          {car.brand} {car.carModel}
        </h1>
        <p className='text-gray-600 text-sm mb-6 w-full'>
          {car.brand} {car.carModel}, {car.year} model,{' '}
          {convertFuelType(car.carFuelType)} yakıt tipine sahip konforlu bir
          araçtır.
          {convertCarType(car.carType)} sınıfında yer alan bu {car.color} renkli
          araç, seyahatleriniz için ideal bir seçimdir.
        </p>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-2 space-y-2 border-r pr-4'>
            <div>
              <h3 className='text-sm font-semibold text-gray-700'>Araç Tipi</h3>
              <p className='text-sm text-gray-600'>
                {convertCarType(car.carType)}
              </p>
            </div>
            <div>
              <h3 className='text-sm font-semibold text-gray-700'>
                Model Yılı
              </h3>
              <p className='text-sm text-gray-600'>{car.year}</p>
            </div>
          </div>

          <div className='col-span-2 space-y-2 border-r px-4'>
            <div>
              <h3 className='text-sm font-semibold text-gray-700'>Renk</h3>
              <p className='text-sm text-gray-600'>{car.color}</p>
            </div>
            <div>
              <h3 className='text-sm font-semibold text-gray-700'>
                Yakıt Tipi
              </h3>
              <p className='text-sm text-gray-600'>
                {convertFuelType(car.carFuelType)}
              </p>
            </div>
          </div>

          <div className='col-span-1 flex flex-col justify-center items-center pl-4'>
            <h3 className='text-xs font-semibold text-gray-700'>
              Günlük Fiyat
            </h3>
            <p className='text-xl font-bold text-primary'>100 ₺</p>
          </div>
        </div>
      </div>
      <RentCarButton car={car} />
    </CardContent>
  );
};

export default CarDetailCardContent;
