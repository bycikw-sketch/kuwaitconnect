'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Newspaper, 
  TrendingUp, 
  Globe, 
  Clock, 
  Share2, 
  Bookmark, 
  MessageCircle, 
  ChevronRight, 
  Flame, 
  Bell, 
  Search,
  Filter
} from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Kuwait Announces New Residency Rules for Family Visas in 2026',
    summary: 'The Ministry of Interior has released a comprehensive guide regarding the updated salary requirements and age limits for family visa sponsorship...',
    category: 'Local News',
    time: '2 hours ago',
    image: 'https://picsum.photos/seed/news1/800/500',
    is_breaking: true,
    author: 'KUNA',
  },
  {
    id: '2',
    title: 'Oil Prices Stabilize as Global Demand Shows Signs of Recovery',
    summary: 'Kuwait Petroleum Corporation (KPC) reports a steady increase in export volumes as major Asian economies ramp up production...',
    category: 'Economy',
    time: '5 hours ago',
    image: 'https://picsum.photos/seed/news2/800/500',
    is_breaking: false,
    author: 'Reuters',
  },
  {
    id: '3',
    title: 'New Metro Project: Construction to Begin in Early 2027',
    summary: 'The Public Authority for Roads and Transportation (PART) has finalized the first phase of the Kuwait Metro project, connecting major residential areas...',
    category: 'Infrastructure',
    time: '1 day ago',
    image: 'https://picsum.photos/seed/news3/800/500',
    is_breaking: false,
    author: 'Arab Times',
  },
];

const NATIONALITY_NEWS = [
  { id: '1', country: 'India', title: 'New Flight Routes Announced Between Kuwait and major Indian Cities', time: '3h ago' },
  { id: '2', country: 'Philippines', title: 'Embassy to Host Special Consular Mission in Salmiya this Weekend', time: '6h ago' },
  { id: '3', country: 'Pakistan', title: 'Community Event: Pakistan Day Celebrations at Al Shaheed Park', time: '12h ago' },
  { id: '4', country: 'Egypt', title: 'New Remittance Rules for Egyptian Expats Explained', time: '1d ago' },
];

export default function NewsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Local News', 'Economy', 'Infrastructure', 'Health', 'Sports', 'Entertainment'];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-3 px-6 rounded-2xl flex items-center overflow-hidden shadow-lg">
        <div className="flex items-center flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0 font-bold uppercase text-xs tracking-widest">
          <Flame className="mr-2 h-4 w-4 animate-pulse rtl:ml-2 rtl:mr-0" /> Breaking News
        </div>
        <div className="flex-grow overflow-hidden whitespace-nowrap">
          <p className="animate-marquee inline-block text-sm font-medium">
            New Residency Laws Announced for Expats in Kuwait for 2026 • Kuwait Metro Project Phase 1 Finalized • Oil Prices Stabilize at $85 per Barrel • 
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Kuwait Connect News</h1>
          <p className="text-slate-500 text-lg">Your trusted source for local and international updates.</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button variant="outline" className="rounded-full border-slate-200">
            <Bell className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Notifications
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
            <Globe className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Language: English
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main News Feed */}
        <div className="lg:col-span-8 space-y-12">
          {/* Categories */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'ghost'}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-6",
                  activeCategory === cat ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Top Story */}
          <section className="relative h-[500px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl">
            <Image 
              src={MOCK_NEWS[0].image} 
              alt={MOCK_NEWS[0].title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4 max-w-3xl text-white">
              <Badge className="bg-red-600 text-white border-none px-4 py-1">Breaking News</Badge>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight group-hover:text-blue-400 transition-colors">{MOCK_NEWS[0].title}</h2>
              <p className="text-slate-200 text-lg line-clamp-2">{MOCK_NEWS[0].summary}</p>
              <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium pt-2 text-slate-300">
                <div className="flex items-center"><Clock className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> {MOCK_NEWS[0].time}</div>
                <div className="flex items-center"><Newspaper className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> {MOCK_NEWS[0].author}</div>
              </div>
            </div>
          </section>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_NEWS.slice(1).map((news) => (
              <Card key={news.id} className="group overflow-hidden border-none shadow-none bg-transparent cursor-pointer">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-4 shadow-lg">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 border-none font-bold">
                    {news.category}
                  </Badge>
                </div>
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center text-xs text-slate-400 space-x-4 rtl:space-x-reverse">
                    <span className="flex items-center"><Clock className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> {news.time}</span>
                    <span className="flex items-center"><Newspaper className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> {news.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-4 rtl:space-x-reverse text-slate-400">
                      <button className="hover:text-blue-600 transition-colors"><Share2 className="h-4 w-4" /></button>
                      <button className="hover:text-blue-600 transition-colors"><Bookmark className="h-4 w-4" /></button>
                      <button className="hover:text-blue-600 transition-colors"><MessageCircle className="h-4 w-4" /></button>
                    </div>
                    <Button variant="ghost" className="text-blue-600 font-bold p-0 hover:bg-transparent group">
                      Read More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform rtl:mr-1 rtl:ml-0 rtl:group-hover:-translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar: Localized News & Trending */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Nationality News */}
          <Card className="border-slate-100 shadow-xl rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
              <CardTitle className="text-xl flex items-center">
                <Globe className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0 text-blue-600" /> Home Country News
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {NATIONALITY_NEWS.map((item) => (
                <div key={item.id} className="group cursor-pointer space-y-2 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-blue-600 border-blue-100 bg-blue-50">
                      {item.country}
                    </Badge>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl text-xs font-bold text-slate-500">
                View All Community News
              </Button>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="border-slate-100 shadow-xl rounded-[2rem]">
            <CardHeader className="p-6">
              <CardTitle className="text-xl flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0 text-orange-500" /> Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              {[
                { tag: '#KuwaitMetro', count: '12.4k' },
                { tag: '#FamilyVisaUpdate', count: '8.2k' },
                { tag: '#SalmiyaFoodFest', count: '5.1k' },
                { tag: '#KuwaitWeather', count: '4.3k' },
                { tag: '#ExpatsInKuwait', count: '3.9k' },
              ].map((topic) => (
                <div key={topic.tag} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{topic.tag}</span>
                  <span className="text-xs text-slate-400">{topic.count} reads</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card className="bg-slate-900 text-white rounded-[2rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl" />
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Stay Updated</h3>
              <p className="text-slate-400 text-sm">Get the most important Kuwait news delivered to your inbox every morning.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6 font-bold">
                  Subscribe Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
