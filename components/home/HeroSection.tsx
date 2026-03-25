'use client';

import { motion } from 'motion/react';
import { buttonVariants } from '@/components/ui/button-variants';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { PlusCircle, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[550px] md:h-[650px] flex items-center overflow-hidden bg-slate-100">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/kuwait-city-life/1920/1080"
          alt="Diverse people in modern Kuwait"
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        {/* Lighter, cleaner gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-slate-950/90 dark:via-slate-950/40 rtl:bg-gradient-to-l" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <Badge className="bg-[#FACC15] text-black hover:bg-[#FACC15]/90 px-4 py-1 rounded-full font-bold text-xs mb-2 border-none shadow-sm uppercase tracking-wider">
            Community First
          </Badge>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none flex flex-col">
              <span className="text-slate-900 dark:text-white">KUWAIT</span>
              <span className="text-blue-600">CONNECT</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
              One Platform for All Communities in Kuwait
            </p>
          </div>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-xl">
            Connect • Buy & Sell • Find Jobs • Join Events • Build Friendships
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/marketplace/post"
                className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-7 text-lg font-bold shadow-lg shadow-blue-600/20")}
              >
                <PlusCircle className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                Post Free Ad
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/marketplace"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-white/80 dark:bg-slate-900/80 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 rounded-xl px-8 py-7 text-lg font-bold backdrop-blur-sm transition-all")}
              >
                <ShoppingBag className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                Browse Marketplace
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Kuwait Flag Colors Accent Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 flex">
        <div className="flex-1 bg-blue-600" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE1126]" />
      </div>
    </section>
  );
}
