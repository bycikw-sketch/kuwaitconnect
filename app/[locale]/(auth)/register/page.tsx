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
  User, 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Phone, 
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

const NATIONALITIES = [
  'Kuwaiti', 'Indian', 'Filipino', 'Egyptian', 'Pakistani', 'Bangladeshi', 'Sri Lankan', 'Lebanese', 'Syrian', 'Jordanian', 'Others'
];

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            nationality: selectedNationality,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        // Create profile manually if no trigger exists
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            nationality: selectedNationality,
            phone: phone || null,
            email: email,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // We don't toast error here because user is already signed up
        }

        toast.success('Registration successful! Please check your email for verification.');
        router.push('/login');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <Image 
          src="https://picsum.photos/seed/kuwait-city/1920/1080?blur=4" 
          alt="Kuwait City" 
          fill 
          className="object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg space-y-8 text-white">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-12 group">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform rtl:group-hover:translate-x-1" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-extrabold leading-tight">Join the Kuwait Connect Community</h2>
            <p className="text-xl text-blue-100">The modern platform for everyone in Kuwait. Reconnect with your community today.</p>
          </div>

          <div className="space-y-6 pt-8">
            {[
              "Post ads in the marketplace for free",
              "Apply to verified job opportunities",
              "Join community groups by nationality",
              "Stay updated with real-time local news"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-lg font-medium text-blue-50">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/10 flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {[5, 6, 7, 8].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-blue-600 bg-blue-500 overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={40} height={40} />
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-100 font-medium">Join <span className="text-white font-bold">180k+</span> members in Kuwait</p>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="space-y-4 p-8 md:p-10 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-2">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-3xl font-extrabold text-slate-900">Create Account</CardTitle>
              <CardDescription className="text-slate-500">Join the #1 community platform in Kuwait</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-8 md:px-10 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="full_name" 
                      placeholder="John Doe" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-xs font-bold uppercase tracking-wider text-slate-500">Nationality</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select 
                      id="nationality"
                      required
                      value={selectedNationality}
                      onChange={(e) => setSelectedNationality(e.target.value)}
                      className="w-full pl-10 pr-4 h-12 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white text-sm appearance-none"
                    >
                      <option value="" disabled>Select nationality</option>
                      {NATIONALITIES.map((nat) => (
                        <option key={nat} value={nat}>{nat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+965 1234 5678" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Minimum 8 characters" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 rtl:space-x-reverse pt-2">
                <input type="checkbox" id="terms" required className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                  I agree to the <Link href="/terms" className="text-blue-600 font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-lg shadow-lg shadow-blue-600/20"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Free Account"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5 rtl:mr-2 rtl:ml-0" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="px-8 md:px-10 pb-10 pt-4 flex flex-col space-y-6">
            <p className="text-center text-sm text-slate-500">
              Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
            </p>
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse opacity-50">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-medium">Secure & Verified Community</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
