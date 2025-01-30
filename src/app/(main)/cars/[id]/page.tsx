import CarDetailClient from '@/components/car/detail/CarDetail';

interface CarDetailPageProps {
  params: {
    id: string;
  };
}

const CarDetailPage = ({ params }: CarDetailPageProps) => {
  return <CarDetailClient id={params.id} />;
};

export default CarDetailPage;
