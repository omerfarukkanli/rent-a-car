import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Car, CarFuelType, CarType } from '@/store/types';
import { useState } from 'react';

interface EditCarFormProps {
  car: Car;
  onSave: (updatedCar: Car) => void;
  onCancel: () => void;
}

export const EditCarForm = ({ car, onSave, onCancel }: EditCarFormProps) => {
  const [formData, setFormData] = useState<Car>(car);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <label>Image URL</label>
          <Input
            value={formData.image}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <div className='grid gap-2'>
          <label>Brand</label>
          <Input
            value={formData.brand}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, brand: e.target.value }))
            }
          />
        </div>
        <div className='grid gap-2'>
          <label>Model</label>
          <Input
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
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CarType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
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
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CarFuelType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='grid gap-2'>
          <label>Year</label>
          <Input
            type='number'
            value={formData.year}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, year: e.target.value }))
            }
          />
        </div>
      </div>
      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit'>Save Changes</Button>
      </div>
    </form>
  );
};
