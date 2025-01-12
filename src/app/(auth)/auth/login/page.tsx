'use client';
import MailInput from '@/components/Inputs/mail.input';
import PasswordInput from '@/components/Inputs/password.input';
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
import { UserRole } from '@/store/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
    validateInputs: false,
  });
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidationChange = (field: string, isValid: boolean) => {
    setForm((prev) => ({ ...prev, [field]: isValid }));
  };
  const handleLogin = async () => {
    setForm((prev) => ({ ...prev, validateInputs: true }));
    const { isEmailValid, isPasswordValid } = form;
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const result = await signIn({
        email: form.email,
        password: form.password,
      }).unwrap();

      if ('data' in result && result.data?.access_token) {
        dispatch(
          setAuthToken({
            isAuthenticated: true,
            access_token: result.data.access_token,
            role: result.data.role as UserRole,
          })
        );
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Card className='w-[400px]'>
      <CardHeader>Giriş Yap</CardHeader>
      <CardContent>
        <CardDescription>
          <p>Rent A Car giriş yaparak araçlarınızı yönetebilirsiniz.</p>
        </CardDescription>
        <div className='mt-10 gap-3 flex flex-col'>
          <MailInput
            label='E-posta'
            placeholder='example@gmai.com'
            id='email'
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            setIsValidate={(isValid) =>
              handleValidationChange('isEmailValid', isValid)
            }
            validateOnDemand={form.validateInputs}
          />
          <PasswordInput
            id='password'
            value={form.password}
            placeholder='Şifre'
            onChangeText={(value) => handleChange('password', value)}
            label='Şifre'
            setIsValidate={(isValid) =>
              handleValidationChange('isPasswordValid', isValid)
            }
            validateOnDemand={form.validateInputs}
          />
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
