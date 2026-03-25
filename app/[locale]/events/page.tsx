'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Ticket, 
  Search, 
  Filter, 
  Plus,
  Share2,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Kuwait Tech Expo 2026',
    description: 'The largest technology exhibition in the region featuring AI, Robotics, and Future Tech.',
    date: 'Oct 15, 2026',
    time: '10:00 AM - 8:00 PM',
    location: 'Kuwait International Fairgrounds',
    price: 'Free',
    category: 'Technology',
    attendees: '1.2k+',
    image: 'https://picsum.photos/seed/tech/800/400',
    is_featured: true,
  },
  {
    id: '2',
    title: 'Indian Cultural Night & Food Festival',
    description: 'A vibrant celebration of Indian culture with live music, dance, and authentic street food.',
    date: 'Nov 05, 2026',
    time: '6:00 PM - 11:00 PM',
    location: 'Al Shaheed Park',
    price: '5.000 KWD',
    category: 'Culture',
    attendees: '800+',
    image: 'https://picsum.photos/seed/culture/800/400',
    is_featured: false,
  },
  {
    id: '3',
    title: 'Startup Weekend Kuwait',
    description: 'Build a startup in 54 hours. Pitch to investors and win exciting prizes.',
    date: 'Dec 12, 2026',
    time: '9:00 AM onwards',
    location: 'The Hub, Kuwait City',
    price: '15.000 KWD',
    category: 'Business',
    attendees: '200+',
    image: 'https://picsum.photos/seed/business/800/400',
    is_featured: false,
  },
  {
    id: '4',
    title: 'Desert Camping & Stargazing',
    description: 'Experience the magic of the Kuwaiti desert with guided stargazing and traditional BBQ.',
    date: 'Jan 20, 2027',
    time: '4:00 PM - 10:00 AM',
    location: 'Subiya Desert',
    price: '10.000 KWD',
    category: 'Adventure',
    attendees: '50+',
    image: 'https://picsum.photos/seed/desert/800/400',
    is_featured: false,
  },
];

const EVENT_CATEGORIES = ['All', 'Technology', 'Culture', 'Business', 'Adventure', 'Sports', 'Music', 'Education'];

export default function EventsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Upcoming Events</h1>
          <p className="text-slate-500 text-lg">Discover and attend the best events in Kuwait.</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button variant="outline" className="rounded-full border-slate-200">
            <Calendar className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> My Calendar
          </Button>
          <Link 
            href="/events/create" 
            className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-700 rounded-full")}
          >
            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Create Event
          </Link>
        </div>
      </div>

      {/* Featured Event Hero */}
      <section className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
        <Image 
          src={MOCK_EVENTS[0].image} 
          alt={MOCK_EVENTS[0].title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4 max-w-3xl text-white">
          <Badge className="bg-blue-600 text-white border-none px-4 py-1">Featured Event</Badge>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">{MOCK_EVENTS[0].title}</h2>
          <p className="text-slate-200 text-lg line-clamp-2">{MOCK_EVENTS[0].description}</p>
          <div className="flex flex-wrap gap-6 text-sm font-medium pt-2">
            <div className="flex items-center"><Calendar className="mr-2 h-5 w-5 text-blue-400 rtl:ml-2 rtl:mr-0" /> {MOCK_EVENTS[0].date}</div>
            <div className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-blue-400 rtl:ml-2 rtl:mr-0" /> {MOCK_EVENTS[0].location}</div>
            <div className="flex items-center"><Ticket className="mr-2 h-5 w-5 text-blue-400 rtl:ml-2 rtl:mr-0" /> {MOCK_EVENTS[0].price}</div>
          </div>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 rounded-full px-8 font-bold mt-4">
            Get Tickets Now
          </Button>
        </div>
      </section>

      {/* Categories & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
          {EVENT_CATEGORIES.map((cat) => (
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
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_EVENTS.slice(1).map((event) => (
          <Card key={event.id} className="group overflow-hidden border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
              <Image 
                src={event.image} 
                alt={event.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex flex-col items-center justify-center bg-white rounded-2xl p-2 w-14 h-16 shadow-lg">
                <span className="text-xs font-bold text-blue-600 uppercase">{event.date.split(' ')[0]}</span>
                <span className="text-xl font-extrabold text-slate-900 leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
              </div>
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white hover:bg-white/40 rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none px-3">{event.category}</Badge>
                <div className="flex items-center text-xs text-slate-400">
                  <Users className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> {event.attendees} going
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">
                {event.description}
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="mr-2 h-4 w-4 text-slate-400 rtl:ml-2 rtl:mr-0" /> {event.time}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="mr-2 h-4 w-4 text-slate-400 rtl:ml-2 rtl:mr-0" /> {event.location}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
              <span className="font-bold text-lg text-slate-900">{event.price}</span>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button className="bg-slate-900 hover:bg-blue-600 rounded-lg px-6">
                  Book Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-slate-900 rounded-[2rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Organizing an event?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Reach thousands of people in Kuwait. From small workshops to massive concerts, we help you manage tickets and promotion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse pt-6">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-full px-10 py-7 text-lg font-bold">
              List Your Event
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg font-bold">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
