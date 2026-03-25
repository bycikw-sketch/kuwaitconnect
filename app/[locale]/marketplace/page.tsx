'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Tag, 
  Clock, 
  ChevronDown, 
  Plus,
  LayoutGrid,
  List
} from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const MOCK_ADS = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max - 256GB - Titanium Blue',
    price: '320',
    category: 'Electronics',
    location: 'Salmiya, Kuwait',
    time: '2 hours ago',
    image: 'https://picsum.photos/seed/phone/400/300',
    is_boosted: true,
  },
  {
    id: '2',
    title: 'Toyota Camry 2022 - Low Mileage - Excellent Condition',
    price: '6,500',
    category: 'Vehicles',
    location: 'Kuwait City',
    time: '5 hours ago',
    image: 'https://picsum.photos/seed/car/400/300',
    is_boosted: false,
  },
  {
    id: '3',
    title: 'Luxury 2BHK Apartment for Rent - Sea View',
    price: '450',
    category: 'Real Estate',
    location: 'Mahboula',
    time: '1 day ago',
    image: 'https://picsum.photos/seed/house/400/300',
    is_boosted: true,
  },
  {
    id: '4',
    title: 'Gaming PC - RTX 4080 - 32GB RAM - 1TB SSD',
    price: '550',
    category: 'Electronics',
    location: 'Hawally',
    time: '3 hours ago',
    image: 'https://picsum.photos/seed/pc/400/300',
    is_boosted: false,
  },
  {
    id: '5',
    title: 'Modern Sofa Set - 7 Seater - Like New',
    price: '120',
    category: 'Furniture',
    location: 'Farwaniya',
    time: '6 hours ago',
    image: 'https://picsum.photos/seed/sofa/400/300',
    is_boosted: false,
  },
  {
    id: '6',
    title: 'Professional DSLR Camera - Canon EOS R5',
    price: '850',
    category: 'Electronics',
    location: 'Salmiya',
    time: '12 hours ago',
    image: 'https://picsum.photos/seed/camera/400/300',
    is_boosted: false,
  },
];

const CATEGORIES = [
  'All Categories',
  'Electronics',
  'Vehicles',
  'Real Estate',
  'Furniture',
  'Fashion',
  'Services',
  'Others',
];

export default function MarketplacePage() {
  const t = useTranslations();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Marketplace</h1>
          <p className="text-slate-500">Buy and sell anything in Kuwait</p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Link 
            href="/marketplace/create" 
            className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-700 rounded-full")}
          >
            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Post an Ad
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-3xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input 
          placeholder="What are you looking for today?" 
          className="pl-12 h-14 rounded-2xl border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-blue-600">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Filter className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Categories
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedCategory === cat 
                      ? "bg-blue-50 text-blue-600 font-bold" 
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-bold text-slate-900 mb-4">Price Range (KWD)</h3>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Input placeholder="Min" type="number" className="h-9" />
              <span className="text-slate-400">-</span>
              <Input placeholder="Max" type="number" className="h-9" />
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-bold text-slate-900 mb-4">Location</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Select area..." className="pl-9 h-10" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-slate-500">
              <span>Showing 124 results</span>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center cursor-pointer hover:text-blue-600">
                Sort by: Newest <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Button 
                variant={viewType === 'grid' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setViewType('grid')}
                className="h-8 w-8"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewType === 'list' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setViewType('list')}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Ads Grid */}
          <div className={cn(
            "grid gap-6",
            viewType === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}>
            {MOCK_ADS.map((ad) => (
              <Card key={ad.id} className="group overflow-hidden hover:shadow-xl transition-all border-slate-100">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={ad.image} 
                    alt={ad.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {ad.is_boosted && (
                    <Badge className="absolute top-3 left-3 bg-yellow-400 text-slate-900 border-none font-bold">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-blue-600 shadow-sm">
                    {ad.price} KWD
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center text-xs text-slate-400 space-x-2 rtl:space-x-reverse">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{ad.category}</Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {ad.title}
                  </h3>
                  <div className="flex items-center text-xs text-slate-500 space-x-4 rtl:space-x-reverse pt-2">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> {ad.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> {ad.time}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-lg text-xs h-9">
                    Details
                  </Button>
                  <Button className="flex-1 rounded-lg bg-blue-600 text-xs h-9">
                    Contact
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="flex justify-center pt-8">
            <Button variant="outline" className="rounded-full px-8">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
