import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>
          <span>Email</span>
          <Input type='email' />
        </Label>
        <Label>
          <span>Password</span>
          <Input type='password' />
        </Label>
        <Button className={cn('mt-4')}>Login</Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
