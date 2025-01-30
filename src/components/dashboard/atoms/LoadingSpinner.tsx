export const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center min-h-[400px]'>
      <div className='animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent' />
    </div>
  );
};