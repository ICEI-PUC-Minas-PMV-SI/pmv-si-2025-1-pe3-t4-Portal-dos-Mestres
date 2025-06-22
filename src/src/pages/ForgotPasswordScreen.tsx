
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
      setIsLoading(false);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen rpg-gradient flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 dragon-shadow">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary mb-2">Email Enviado!</h1>
              <p className="text-secondary/70">
                Enviamos um link para redefinir sua senha para <strong>{email}</strong>
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={() => setEmailSent(false)} variant="outline" className="w-full">
                Tentar outro email
              </Button>
              <Link to="/login">
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen rpg-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 dragon-shadow">
        <div className="space-y-6">
          <Link to="/login" className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao login
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-2">Esqueceu a senha?</h1>
            <p className="text-secondary/70">
              Digite seu email e enviaremos um link para redefinir sua senha
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-12 bg-primary hover:bg-primary-dark"
            >
              {isLoading ? "Enviando..." : "Enviar Link"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordScreen;
