'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Menu, Search, User, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store/use-auth-store';
import { useTheme } from 'next-themes';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: t('nav.marketplace'), href: '/marketplace' },
    { name: t('nav.jobs'), href: '/jobs' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.forum'), href: '/forum' },
    { name: t('nav.news'), href: '/news' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'ur', name: 'اردو' },
  ];

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase group-hover:scale-105 transition-transform">
                Kuwait
              </span>
              <span className="text-2xl font-black tracking-tighter text-blue-600 uppercase group-hover:scale-105 transition-transform">
                Connect
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors hover:text-blue-600",
                  pathname.startsWith(item.href) ? "text-blue-600" : "text-slate-600 dark:text-slate-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" className="dark:text-slate-400">
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="dark:text-slate-400"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "dark:text-slate-400")}>
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-slate-900 dark:border-slate-800">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "font-medium",
                      locale === lang.code && "bg-slate-100 dark:bg-slate-800 font-bold"
                    )}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Auth */}
            {user ? (
              <Button variant="outline" size="sm" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-600 dark:text-blue-600">
                <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {profile?.full_name || user.email}
              </Button>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link href="/login" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "font-bold uppercase tracking-widest dark:text-slate-400")}>
                  {t('common.login')}
                </Link>
                <Link href="/register" className={cn(buttonVariants({ size: 'sm' }), "rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest px-6")}>
                  {t('common.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-lg font-medium text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t flex flex-col space-y-2">
            {!user && (
              <>
                <Link 
                  href="/login" 
                  className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.login')}
                </Link>
                <Link 
                  href="/register" 
                  className={cn(buttonVariants(), "w-full bg-blue-600")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
