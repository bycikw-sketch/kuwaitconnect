import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('nav.marketplace'),
      links: [
        { name: 'Electronics', href: '/marketplace?category=electronics' },
        { name: 'Vehicles', href: '/marketplace?category=vehicles' },
        { name: 'Real Estate', href: '/marketplace?category=real-estate' },
        { name: 'Furniture', href: '/marketplace?category=furniture' },
      ],
    },
    {
      title: t('nav.jobs'),
      links: [
        { name: 'Full-time', href: '/jobs?type=full-time' },
        { name: 'Part-time', href: '/jobs?type=part-time' },
        { name: 'Freelance', href: '/jobs?type=freelance' },
        { name: 'Contract', href: '/jobs?type=contract' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: t('nav.forum'), href: '/forum' },
        { name: t('nav.events'), href: '/events' },
        { name: t('nav.news'), href: '/news' },
        { name: 'About Us', href: '/about' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <span className="text-2xl font-bold tracking-tight text-white">
                Kuwait<span className="text-blue-500">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs mb-6">
              {t('common.description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {currentYear} Kuwait Connect. All rights reserved.</p>
          <div className="flex space-x-6 rtl:space-x-reverse">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
