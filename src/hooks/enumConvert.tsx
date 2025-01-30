import { CarType, CarFuelType } from '@/store/types';

export const useEnumConverter = () => {
  const convertCarType = (type: CarType): string => {
    const carTypes = {
      [CarType.SEDAN]: 'Sedan',
      [CarType.SUV]: 'SUV',
      [CarType.TRUCK]: 'Kamyonet',
      [CarType.VAN]: 'Van',
      [CarType.COUPE]: 'Coupe',
      [CarType.CONVERTIBLE]: 'Cabrio',
      [CarType.SPORTS]: 'Spor',
    };
    return carTypes[type] || type;
  };

  const convertFuelType = (type: CarFuelType): string => {
    const fuelTypes = {
      [CarFuelType.GASOLINE]: 'Benzinli',
      [CarFuelType.DIESEL]: 'Dizel',
      [CarFuelType.ELECTRIC]: 'Elektrikli',
      [CarFuelType.HYBRID]: 'Hibrit',
    };
    return fuelTypes[type] || type;
  };

  return {
    convertCarType,
    convertFuelType,
  };
};
