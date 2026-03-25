'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/i18n/routing';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Successfully signed in!');
        router.push('/');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) toast.error(error.message);
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <Image 
          src="https://picsum.photos/seed/kuwait-night/1920/1080?blur=4" 
          alt="Kuwait Night" 
          fill 
          className="object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        
        <div className="relative z-10 max-w-lg space-y-8 text-white">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-12 group">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform rtl:group-hover:translate-x-1" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-extrabold leading-tight">Welcome Back to Kuwait Connect</h2>
            <p className="text-xl text-slate-300">The #1 community platform for everyone in Kuwait. Reconnect with your community today.</p>
          </div>

          <div className="space-y-6 pt-8">
            {[
              "Access verified marketplace listings",
              "Find the latest job opportunities",
              "Join exclusive community groups",
              "Get real-time local news updates"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-lg font-medium text-slate-200">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/10 flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={40} height={40} />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 font-medium">Joined by <span className="text-white font-bold">180k+</span> members in Kuwait</p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="space-y-4 p-8 md:p-10 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-2">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-extrabold text-slate-900">Sign In</CardTitle>
              <CardDescription className="text-slate-500">Enter your credentials to access your account</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-8 md:px-10 space-y-6">
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="rounded-xl h-12 border-slate-200 hover:bg-slate-50 font-bold text-xs"
                onClick={() => handleSocialLogin('google')}
              >
                <Chrome className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 text-red-500" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="rounded-xl h-12 border-slate-200 hover:bg-slate-50 font-bold text-xs"
                onClick={() => handleSocialLogin('github')}
              >
                <Github className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold">Or continue with email</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</Label>
                  <Link href="/forgot-password" title="Forgot password?" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-lg shadow-lg shadow-blue-600/20"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5 rtl:mr-2 rtl:ml-0" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="px-8 md:px-10 pb-10 pt-4 flex flex-col space-y-6">
            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
            </p>
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse opacity-50">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">Available in 6 languages</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
