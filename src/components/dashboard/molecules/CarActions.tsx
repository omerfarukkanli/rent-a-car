import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Car } from '@/store/types';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditCarForm } from './EditCarForm';
import { carService } from '@/store/service/car.service';

interface CarActionsProps {
  car: Car;
}

export const CarActions = ({ car }: CarActionsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updateCar] = carService.useUpdateCarMutation();
  const [deleteCar] = carService.useDeleteCarMutation();

  const handleUpdate = async (updatedCar: Car) => {
    try {
      await updateCar({ id: car._id!, data: updatedCar }).unwrap();
      setIsEditOpen(false);
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(car._id!).unwrap();
      } catch (error) {
        console.error('Failed to delete car:', error);
      }
    }
  };

  return (
    <>
      <div className='flex gap-2'>
        <Button variant='ghost' size='icon' onClick={() => setIsEditOpen(true)}>
          <Pencil className='h-4 w-4' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='text-red-500 hover:text-red-700'
          onClick={handleDelete}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Car</DialogTitle>
          </DialogHeader>
          <EditCarForm
            car={car}
            onSave={handleUpdate}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
