
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const demoUsers = [
    { email: 'supplier@aktina.com', role: 'Supplier' },
    { email: 'production@aktina.com', role: 'Production Manager' },
    { email: 'hr@aktina.com', role: 'HR Manager' },
    { email: 'admin@aktina.com', role: 'System Administrator' },
    { email: 'wholesaler@aktina.com', role: 'Wholesaler' },
    { email: 'retailer@aktina.com', role: 'Retailer' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-aktina-primary/10 to-aktina-blue/10 p-4">
      <div className="w-full max-w-md animate-scale-in">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-aktina-primary to-aktina-forest rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-aktina-primary to-aktina-forest bg-clip-text text-transparent">
              Aktina Supply Chain
            </CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-aktina-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-aktina-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-aktina-primary hover:bg-aktina-forest button-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Demo Accounts (Password: password)
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
              {demoUsers.map((user) => (
                <Button
                  key={user.email}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('password');
                  }}
                  className="justify-start text-xs"
                >
                  <span className="font-medium">{user.role}</span>
                  <span className="ml-auto text-muted-foreground">{user.email}</span>
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
