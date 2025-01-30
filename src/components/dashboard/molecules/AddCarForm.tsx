import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { carService } from '@/store/service/car.service';
import { Car, CarFuelType, CarType } from '@/store/types';
import { useEnumConverter } from '@/hooks/enumConvert';
import { useState } from 'react';

interface AddCarFormProps {
  onCancel: () => void;
}

export const AddCarForm = ({ onCancel }: AddCarFormProps) => {
  const [addCar] = carService.useCreateCarMutation();
  const { convertCarType, convertFuelType } = useEnumConverter();

  const [formData, setFormData] = useState<Car>({
    image: '',
    brand: '',
    carModel: '',
    carType: CarType.SEDAN,
    carFuelType: CarFuelType.GASOLINE,
    year: '',
    color: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCar(formData).unwrap();
      onCancel();
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <label>Image URL</label>
          <Input
            required
            value={formData.image}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <div className='grid gap-2'>
          <label>Brand</label>
          <Input
            required
            value={formData.brand}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, brand: e.target.value }))
            }
          />
        </div>
        <div className='grid gap-2'>
          <label>Model</label>
          <Input
            required
            value={formData.carModel}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, carModel: e.target.value }))
            }
          />
        </div>
        <div className='grid gap-2'>
          <label>Car Type</label>
          <Select
            value={formData.carType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, carType: value as CarType }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select car type">
                {convertCarType(formData.carType)}
              </SelectValue>
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
        <div className='grid gap-2'>
          <label>Fuel Type</label>
          <Select
            value={formData.carFuelType}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                carFuelType: value as CarFuelType,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type">
                {convertFuelType(formData.carFuelType)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.values(CarFuelType).map((type) => (
                <SelectItem key={type} value={type}>
                  {convertFuelType(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='grid gap-2'>
          <label>Year</label>
          <Input
            type='number'
            required
            value={formData.year}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, year: e.target.value }))
            }
          />
        </div>
        <div className='grid gap-2'>
          <label>Color</label>
          <Input
            required
            value={formData.color}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, color: e.target.value }))
            }
          />
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit'>Add Car</Button>
      </div>
    </form>
  );
};
