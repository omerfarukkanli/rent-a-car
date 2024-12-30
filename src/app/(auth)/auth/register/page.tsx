'use client';
import PasswordInput from '@/components/Inputs/password.input';
import TextInput from '@/components/Inputs/text.input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSıgnUp = () => {
    console.log('Sign Up');
  };

  return (
    <Card className='w-[400px]'>
      <CardHeader>Kayıt Ol</CardHeader>
      <CardContent>
        <CardDescription>
          <p>Rent A Car ailesine katılarak araçlarınızı yönetebilirsiniz.</p>
          <div className='mt-10 gap-5 flex flex-col'>
            <TextInput
              label='Ad'
              placeholder='Adınızı giriniz'
              id='firstName'
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              label='Soyad'
              placeholder='Soyadınızı giriniz'
              id='lastName'
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              label='E-posta'
              id='email'
              placeholder='example@gmail.com'
              value={email}
              onChangeText={setEmail}
            />
            <div>
              <PasswordInput
                id='password'
                label='Şifre'
                placeholder='Şifrenizi giriniz'
                value={password}
                onChangeText={setPassword}
              />
            </div>
            <Button className='mt-5' onClick={handleSıgnUp}>
              Kayıt Ol
            </Button>
            <div>
              <p className='mt-5'>
                Hesabınız var mı?{' '}
                <Button
                  variant='link'
                  onClick={() => router.push('/auth/login')}
                >
                  <a>Giriş Yap</a>
                </Button>
              </p>
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
