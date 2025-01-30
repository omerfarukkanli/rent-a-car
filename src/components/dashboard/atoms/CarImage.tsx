import Image from 'next/image';

interface CarImageProps {
  src: string;
  alt: string;
}

export const CarImage = ({ src, alt }: CarImageProps) => {
  return (
    <div className='relative w-16 h-16'>
      <Image
        src={src}
        alt={alt}
        fill
        className='object-cover rounded-lg'
      />
    </div>
  );
};