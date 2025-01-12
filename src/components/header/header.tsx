'use client';
import { Car } from 'lucide-react';
import HeaderLink from './HeaderLink';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { Button } from '../ui/button';
import { clearAuthToken } from '@/store/slices/authendication.slice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authendication.isAuthenticated
  );

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    await dispatch(clearAuthToken());
    router.push('/auth/login');
  };

  return (
    <div className='py-3 flex justify-between items-center container mx-auto'>
      <Link className='flex items-center gap-5	' href='/'>
        <Car size={32} />
        <h1 className='font-semibold text-xl'>Rent A Car</h1>
      </Link>
      <div className='flex gap-5 items-center'>
        <HeaderLink href='/cars' name='Araçlar' />
        <HeaderLink href='/about' name='Hakkımızda' />
        <HeaderLink href='/contact' name='İletişim' />
        {isAuthenticated && <Button onClick={handleLogOut}>Çıkış Yap</Button>}
      </div>
    </div>
  );
};

export default Header;
