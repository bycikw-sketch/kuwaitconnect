'use client';

import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button-variants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Coins, 
  PlusCircle,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import HeroSection from '@/components/home/HeroSection';

export default function HomePage() {
  const t = useTranslations();

  const categories = [
    { name: t('nav.marketplace'), icon: ShoppingBag, color: 'bg-blue-600/10 text-blue-600', href: '/marketplace', description: 'Buy & sell anything' },
    { name: t('nav.jobs'), icon: Briefcase, color: 'bg-[#CE1126]/10 text-[#CE1126]', href: '/jobs', description: 'Find your dream career' },
    { name: t('nav.events'), icon: Calendar, color: 'bg-[#FACC15]/10 text-[#FACC15]', href: '/events', description: 'Local events & meetups' },
    { name: t('nav.forum'), icon: MessageSquare, color: 'bg-blue-100 text-blue-600', href: '/forum', description: 'Community discussions' },
  ];

  const liveRates = [
    { name: 'Gold (24K)', value: '26.450', change: '+0.15', unit: 'KWD/g' },
    { name: 'USD to KWD', value: '0.307', change: '-0.01', unit: 'KWD' },
    { name: 'INR to KWD', value: '0.0037', change: '0.00', unit: 'KWD' },
    { name: 'PHP to KWD', value: '0.0055', change: '+0.02', unit: 'KWD' },
  ];

  const trendingItems = [
    { title: 'Latest Ads', image: 'https://picsum.photos/seed/kuwait-cars/400/300', count: '1.2k+ new', icon: ShoppingBag, desc: 'Browse the latest cars, electronics, and more.' },
    { title: 'Hot Jobs', image: 'https://picsum.photos/seed/kuwait-office/400/300', count: '450+ vacancies', icon: Briefcase, desc: 'Top companies are hiring right now in Kuwait.' },
    { title: 'Upcoming Events', image: 'https://picsum.photos/seed/kuwait-festival/400/300', count: '12 this week', icon: Calendar, desc: 'Don\'t miss out on local festivals and meetups.' },
    { title: 'Active Discussions', image: 'https://picsum.photos/seed/kuwait-talk/400/300', count: '85+ active', icon: MessageSquare, desc: 'Join the conversation about life in Kuwait.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="flex flex-col space-y-16 pb-20 bg-white dark:bg-slate-950">
      <HeroSection />

      <div className="container mx-auto px-4 space-y-24">
        {/* Live Rates Section - Elegant Dark Card with Gold */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative -mt-24 z-20"
        >
          <Card className="border-none shadow-2xl bg-slate-900 text-white overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6 p-6 md:p-8">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center tracking-tight uppercase">
                  <Coins className="mr-2 h-6 w-6 text-[#FACC15] rtl:ml-2 rtl:mr-0" />
                  Live Market Rates
                </CardTitle>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Real-time updates from Kuwait</p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Live Now</span>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {liveRates.map((rate) => (
                  <div key={rate.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{rate.name}</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded",
                        rate.change.startsWith('+') ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      )}>
                        {rate.change}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{rate.value}</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{rate.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Explore Community Services - Clean White Cards */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Explore <span className="text-blue-600">Community</span> Services
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              Everything you need to thrive in Kuwait, all in one place.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link href={cat.href}>
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
                    <CardContent className="flex flex-col items-start p-6 space-y-4">
                      <div className={cn("p-4 rounded-xl transition-transform duration-300 group-hover:scale-110", cat.color)}>
                        <cat.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{cat.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{cat.description}</p>
                      </div>
                      <div className="pt-2 flex items-center text-blue-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="ml-1 h-4 w-4 rtl:mr-1 rtl:ml-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* What's Hot Section - Relevant cards with images */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-[#CE1126] text-white hover:bg-[#CE1126]/90 px-3 py-0.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
                Trending
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                What&apos;s <span className="text-[#CE1126]">Hot</span> in Kuwait
              </h2>
            </div>
            <Link 
              href="/marketplace" 
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-blue-600 font-bold uppercase tracking-widest hover:bg-blue-600/5")}
            >
              View All <ArrowRight className="ml-1 h-4 w-4 rtl:mr-1 rtl:ml-0" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItems.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <Badge className="bg-[#FACC15] text-black font-bold text-[10px] border-none">{item.count}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-2">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section - Clean Green Banner */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-3xl p-10 md:p-20 text-white text-center space-y-6 relative overflow-hidden shadow-xl shadow-blue-600/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
              Ready to join the <br />
              <span className="text-[#FACC15]">Biggest community</span> in Kuwait?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto font-medium">
              Join 180,000+ residents. Post ads, find jobs, and connect with your community today.
            </p>
            <div className="pt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/register" 
                  className={cn(buttonVariants({ size: "lg" }), "bg-[#FACC15] text-black hover:bg-[#FACC15]/90 px-10 py-7 rounded-xl font-bold text-lg shadow-xl uppercase tracking-widest")}
                >
                  Create Free Account
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Floating Post Ad Button */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link 
            href="/marketplace/post"
            className={cn(buttonVariants({ size: "icon" }), "h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 p-0 flex items-center justify-center")}
          >
            <PlusCircle className="h-7 w-7 md:h-8 md:w-8" />
            <span className="sr-only">Post Ad</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
