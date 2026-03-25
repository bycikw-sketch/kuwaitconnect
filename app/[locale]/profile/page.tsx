'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Bell, 
  LogOut, 
  Edit, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Heart
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const MOCK_USER = {
  full_name: 'Rahul Sharma',
  username: 'rahul_sharma',
  email: 'rahul.sharma@example.com',
  phone: '+965 9876 5432',
  nationality: 'Indian',
  location: 'Salmiya, Kuwait',
  avatar_url: 'https://i.pravatar.cc/150?u=rahul',
  bio: 'Passionate tech enthusiast and long-time Kuwait expat. Love exploring local food and community events.',
  role: 'user',
  joined: 'March 2024',
  stats: {
    ads: 12,
    jobs: 2,
    events: 5,
    posts: 45,
  }
};

const MOCK_USER_ADS = [
  { id: '1', title: 'iPhone 15 Pro Max', price: '320 KWD', status: 'active', views: 124 },
  { id: '2', title: 'Toyota Camry 2022', price: '6,500 KWD', status: 'sold', views: 890 },
  { id: '3', title: 'Gaming PC RTX 4080', price: '550 KWD', status: 'active', views: 45 },
];

export default function ProfilePage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Profile Header */}
      <section className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative group">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-2xl">
              <AvatarImage src={MOCK_USER.avatar_url} />
              <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-2 right-2 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg h-10 w-10">
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-grow text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse">
                  <h1 className="text-3xl font-extrabold text-slate-900">{MOCK_USER.full_name}</h1>
                  <Badge className="bg-blue-50 text-blue-600 border-none px-3 flex items-center">
                    <ShieldCheck className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> Verified
                  </Badge>
                </div>
                <p className="text-slate-500 font-medium">@{MOCK_USER.username}</p>
              </div>
              <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                <Button variant="outline" className="rounded-full px-6">
                  <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Settings
                </Button>
                <Button className="bg-slate-900 hover:bg-blue-600 rounded-full px-6">
                  <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Logout
                </Button>
              </div>
            </div>

            <p className="text-slate-600 max-w-2xl leading-relaxed">
              {MOCK_USER.bio}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-500 font-medium pt-2">
              <div className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-blue-600 rtl:ml-2 rtl:mr-0" /> {MOCK_USER.location}</div>
              <div className="flex items-center"><Globe className="mr-2 h-4 w-4 text-blue-600 rtl:ml-2 rtl:mr-0" /> {MOCK_USER.nationality}</div>
              <div className="flex items-center"><Clock className="mr-2 h-4 w-4 text-blue-600 rtl:ml-2 rtl:mr-0" /> Joined {MOCK_USER.joined}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100 h-14">
            <TabsTrigger value="overview" className="rounded-xl px-8 h-12 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              Overview
            </TabsTrigger>
            <TabsTrigger value="ads" className="rounded-xl px-8 h-12 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              My Ads
            </TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-xl px-8 h-12 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              Job Applications
            </TabsTrigger>
            <TabsTrigger value="activity" className="rounded-xl px-8 h-12 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
              Community Activity
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Ads', value: MOCK_USER.stats.ads, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Jobs Posted', value: MOCK_USER.stats.jobs, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Events Joined', value: MOCK_USER.stats.events, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Forum Posts', value: MOCK_USER.stats.posts, icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat) => (
              <Card key={stat.label} className="border-none shadow-lg hover:-translate-y-1 transition-all">
                <CardContent className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
                  <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <Card className="lg:col-span-1 border-slate-100 shadow-xl rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>Private details only visible to you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-400"><Mail className="h-5 w-5" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Email Address</span>
                    <span className="text-sm font-bold text-slate-900">{MOCK_USER.email}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-400"><Phone className="h-5 w-5" /></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Phone Number</span>
                    <span className="text-sm font-bold text-slate-900">{MOCK_USER.phone}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl py-6 text-blue-600 hover:bg-blue-50 border-blue-100">
                  Update Contact Details
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2 border-slate-100 shadow-xl rounded-[2rem]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Your latest actions on Kuwait Connect.</CardDescription>
                </div>
                <Button variant="ghost" className="text-blue-600 font-bold">View All</Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { type: 'ad', title: 'Posted a new ad for iPhone 15 Pro Max', time: '2 hours ago', icon: ShoppingBag, color: 'text-blue-600' },
                  { type: 'forum', title: 'Replied to "Best South Indian restaurants in Salmiya?"', time: '5 hours ago', icon: MessageSquare, color: 'text-orange-600' },
                  { type: 'event', title: 'Joined "Kuwait Tech Expo 2026"', time: '1 day ago', icon: Calendar, color: 'text-purple-600' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 rtl:space-x-reverse group cursor-pointer">
                    <div className={cn("p-3 rounded-xl bg-slate-50 transition-colors group-hover:bg-white group-hover:shadow-md", item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow border-b border-slate-50 pb-4 group-last:border-0 group-last:pb-0">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ads Tab */}
        <TabsContent value="ads" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Manage Your Ads</h2>
            <Button className="bg-blue-600 rounded-full">Post New Ad</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_USER_ADS.map((ad) => (
              <Card key={ad.id} className="border-slate-100 shadow-lg overflow-hidden group">
                <div className="relative h-40 bg-slate-100 flex items-center justify-center text-slate-300">
                  <ShoppingBag className="h-12 w-12" />
                  <Badge className={cn(
                    "absolute top-3 right-3 border-none",
                    ad.status === 'active' ? "bg-green-500 text-white" : "bg-slate-400 text-white"
                  )}>
                    {ad.status.toUpperCase()}
                  </Badge>
                </div>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ad.title}</h3>
                  <p className="text-lg font-extrabold text-blue-600">{ad.price}</p>
                  <div className="flex items-center text-xs text-slate-400">
                    <Bell className="mr-1 h-3 w-3 rtl:ml-1 rtl:mr-0" /> {ad.views} views
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-lg text-xs h-9">Edit</Button>
                  <Button variant="destructive" className="flex-1 rounded-lg text-xs h-9">Delete</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Placeholder Tabs */}
        <TabsContent value="jobs" className="text-center py-20 space-y-4">
          <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Briefcase className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Job Applications Yet</h3>
          <p className="text-slate-500 max-w-xs mx-auto">Start exploring opportunities in the Jobs Board to see your applications here.</p>
          <Link 
            href="/jobs" 
            className={cn(buttonVariants(), "bg-blue-600 rounded-full")}
          >
            Browse Jobs
          </Link>
        </TabsContent>

        <TabsContent value="activity" className="text-center py-20 space-y-4">
          <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Heart className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Community Activity</h3>
          <p className="text-slate-500 max-w-xs mx-auto">Your likes, bookmarks, and saved posts will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
