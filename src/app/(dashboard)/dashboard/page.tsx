'use client';

import { carService } from '@/store/service/car.service';
import { DashboardTemplate } from '@/components/dashboard/templates/DashboardTemplate';

const DashboardPage = () => {
  const { data: cars, isLoading } = carService.useGetCarsQuery();

  return <DashboardTemplate cars={cars} isLoading={isLoading} />;
};

export default DashboardPage;
