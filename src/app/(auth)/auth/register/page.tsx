'use client';
import MailInput from '@/components/Inputs/mail.input';
import PasswordInput from '@/components/Inputs/password.input';
import TextInput from '@/components/Inputs/text.input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { useSignUpMutation } from '@/store/service/auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isEmailValid: false,
    isPasswordValid: false,
    isFirstNameValid: false,
    isLastNameValid: false,
    validateInputs: false,
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidationChange = (field: string, isValid: boolean) => {
    setForm((prev) => ({ ...prev, [field]: isValid }));
  };

  const [signUp] = useSignUpMutation();

  const handleSıgnUp = () => {
    setForm((prev) => ({ ...prev, validateInputs: true }));
    const { isEmailValid, isPasswordValid, isFirstNameValid, isLastNameValid } =
      form;

    if (
      !isEmailValid ||
      !isPasswordValid ||
      !isFirstNameValid ||
      !isLastNameValid
    ) {
      console.error('Validation failed');
      return;
    }
    try {
      signUp({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });
      router.push('/auth/login');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <Card className='w-[400px]'>
      <CardHeader>Kayıt Ol</CardHeader>
      <CardContent>
        <CardDescription>
          <p>Rent A Car ailesine katılarak araçlarınızı yönetebilirsiniz.</p>
          <div className='mt-10 gap-3 flex flex-col'>
            <TextInput
              label='Ad'
              placeholder='Adınızı giriniz'
              id='firstName'
              value={form.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
              setIsValidate={(isValid) =>
                handleValidationChange('isFirstNameValid', isValid)
              }
              required
              validateOnDemand={form.validateInputs}
            />
            <TextInput
              label='Soyad'
              placeholder='Soyadınızı giriniz'
              id='lastName'
              value={form.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
              setIsValidate={(isValid) =>
                handleValidationChange('isLastNameValid', isValid)
              }
              required
              validateOnDemand={form.validateInputs}
            />
            <MailInput
              label='E-posta'
              id='email'
              placeholder='example@gmail.com'
              value={form.email}
              onChangeText={(value) => handleChange('email', value)}
              setIsValidate={(isValid) =>
                handleValidationChange('isEmailValid', isValid)
              }
              validateOnDemand={form.validateInputs}
            />
            <PasswordInput
              label='Şifre'
              placeholder='Şifrenizi giriniz'
              id='password'
              value={form.password}
              onChangeText={(value) => handleChange('password', value)}
              setIsValidate={(isValid) =>
                handleValidationChange('isPasswordValid', isValid)
              }
              validateOnDemand={form.validateInputs}
            />
            <Button className='mt-5' onClick={handleSıgnUp}>
              Kayıt Ol
            </Button>
          </div>
          <div>
            <p className='mt-5'>
              Hesabınız var mı?{' '}
              <Button variant='link' onClick={() => router.push('/auth/login')}>
                <a>Giriş Yap</a>
              </Button>
            </p>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
