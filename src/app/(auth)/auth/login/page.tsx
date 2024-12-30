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
import { useAppDispatch } from '@/hooks/store';
import { useSignInMutation } from '@/store/service/auth.service';
import { setAuthToken } from '@/store/slices/authendication.slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { data, isSuccess }] = useSignInMutation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      return;
    }

    signIn({ email, password }).then(() => {
      if (isSuccess) {
        console.log('Login success');
        if ('data' in data && data.data) {
          dispatch(
            setAuthToken({
              isAuthenticated: true,
              access_token: data.data.access_token,
            })
          );
        }
      }
    });
  };

  const validatePassword = (value: string) => {
    if (!value || value.trim().length === 0) {
      return 'Şifre alanı boş bırakılamaz';
    }
    return '';
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(password);
    setErrorMessages(error ? [error] : []);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errorMessages.length > 0) {
      setErrorMessages([]);
    }
  };
  return (
    <Card className='w-[400px]'>
      <CardHeader>Giriş Yap</CardHeader>
      <CardContent>
        <CardDescription>
          <p>Rent A Car giriş yaparak araçlarınızı yönetebilirsiniz.</p>
        </CardDescription>
        <div className='mt-10 gap-5 flex flex-col'>
          <TextInput
            label='E-posta'
            id='email'
            value={email}
            onChangeText={setEmail}
          />
          <div>
            <PasswordInput
              id='password'
              value={password}
              onChangeText={handlePasswordChange}
              label='Şifre'
              onBlur={handlePasswordBlur}
              errorMessage={errorMessages[0]}
            />
          </div>
          <Button className='mt-5' onClick={handleLogin}>
            Giriş Yap
          </Button>
          <div>
            <p className='mt-5'>
              Hesabınız var mı?{' '}
              <Button
                variant='link'
                onClick={() => router.push('/auth/register')}
              >
                <a>Kayıt Ol</a>
              </Button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
