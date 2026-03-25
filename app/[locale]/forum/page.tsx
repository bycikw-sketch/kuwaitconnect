'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageCircle, 
  Eye, 
  Pin, 
  Flame, 
  BarChart3,
  ChevronRight,
  User,
  Clock
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const MOCK_GROUPS = [
  { id: '1', name: 'Expats in Kuwait', members: '45k', color: 'bg-blue-100 text-blue-600' },
  { id: '2', name: 'Indians in Kuwait', members: '120k', color: 'bg-orange-100 text-orange-600' },
  { id: '3', name: 'Filipinos in Kuwait', members: '32k', color: 'bg-red-100 text-red-600' },
  { id: '4', name: 'Kuwaiti Locals', members: '15k', color: 'bg-green-100 text-green-600' },
  { id: '5', name: 'Tech & Startups', members: '8k', color: 'bg-purple-100 text-purple-600' },
];

const MOCK_POSTS = [
  {
    id: '1',
    title: 'New Residency Law 2026: What you need to know',
    author: 'Ahmed Al-Sabah',
    author_avatar: 'https://i.pravatar.cc/150?u=ahmed',
    group: 'Expats in Kuwait',
    content: 'The Ministry of Interior has officially announced the new residency rules for family visas...',
    likes: 245,
    replies: 89,
    views: '12k',
    time: '2 hours ago',
    is_pinned: true,
    is_hot: true,
  },
  {
    id: '2',
    title: 'Best South Indian restaurants in Salmiya?',
    author: 'Rahul Sharma',
    author_avatar: 'https://i.pravatar.cc/150?u=rahul',
    group: 'Indians in Kuwait',
    content: 'Looking for authentic Kerala sadhya this weekend. Any recommendations?',
    likes: 56,
    replies: 34,
    views: '2.5k',
    time: '5 hours ago',
    is_pinned: false,
    is_hot: false,
  },
  {
    id: '3',
    title: 'Weekend getaway ideas near Kuwait City?',
    author: 'Maria Santos',
    author_avatar: 'https://i.pravatar.cc/150?u=maria',
    group: 'Filipinos in Kuwait',
    content: 'Planning a small picnic with friends. Is Al Shaheed Park open this Friday?',
    likes: 120,
    replies: 45,
    views: '5.6k',
    time: '1 day ago',
    is_pinned: false,
    is_hot: true,
  },
];

export default function ForumPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('trending');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Community Forum</h1>
          <p className="text-slate-500">Connect, discuss, and share with everyone in Kuwait.</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search discussions..." className="pl-10 rounded-full h-10 border-slate-200" />
          </div>
          <Link 
            href="/forum/create" 
            className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-700 rounded-full")}
          >
            <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> New Thread
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Groups */}
        <aside className="lg:col-span-3 space-y-6">
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 text-blue-600" /> Community Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              {MOCK_GROUPS.map((group) => (
                <Link key={group.id} href={`/forum/group/${group.id}`}>
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={cn("p-2 rounded-lg", group.color)}>
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{group.name}</span>
                        <span className="text-xs text-slate-400">{group.members} members</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </div>
                </Link>
              ))}
              <Button variant="ghost" className="w-full text-xs text-blue-600 hover:text-blue-700 mt-2">
                View All Groups
              </Button>
            </CardContent>
          </Card>

          {/* Forum Stats */}
          <Card className="border-slate-100 shadow-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-blue-100">Total Threads</p>
                  <p className="text-2xl font-bold">156,432</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-300/50" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-blue-100">Active Users</p>
                  <p className="text-2xl font-bold">12,890</p>
                </div>
                <Users className="h-8 w-8 text-blue-300/50" />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content: Threads */}
        <div className="lg:col-span-6 space-y-6">
          {/* Tabs */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse bg-slate-100 p-1 rounded-xl w-fit">
            <Button 
              variant={activeTab === 'trending' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('trending')}
              className={cn("rounded-lg px-6 h-9", activeTab === 'trending' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}
            >
              <TrendingUp className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Trending
            </Button>
            <Button 
              variant={activeTab === 'latest' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('latest')}
              className={cn("rounded-lg px-6 h-9", activeTab === 'latest' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}
            >
              <Clock className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Latest
            </Button>
            <Button 
              variant={activeTab === 'hot' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('hot')}
              className={cn("rounded-lg px-6 h-9", activeTab === 'hot' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500")}
            >
              <Flame className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" /> Hot
            </Button>
          </div>

          {/* Post Feed */}
          <div className="space-y-4">
            {MOCK_POSTS.map((post) => (
              <Card key={post.id} className="group hover:shadow-md transition-all border-slate-100 cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={post.author_avatar} />
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{post.author}</span>
                        <span className="text-xs text-slate-400">posted in <span className="text-blue-600 font-medium">{post.group}</span> • {post.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {post.is_pinned && <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50"><Pin className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> Pinned</Badge>}
                      {post.is_hot && <Badge variant="outline" className="text-orange-600 border-orange-100 bg-orange-50"><Flame className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" /> Hot</Badge>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-2 text-sm">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-slate-400">
                      <div className="flex items-center hover:text-blue-600 transition-colors">
                        <ThumbsUp className="mr-1.5 h-4 w-4 rtl:ml-1.5 rtl:mr-0" /> <span className="text-xs font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center hover:text-blue-600 transition-colors">
                        <MessageCircle className="mr-1.5 h-4 w-4 rtl:ml-1.5 rtl:mr-0" /> <span className="text-xs font-medium">{post.replies}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="mr-1.5 h-4 w-4 rtl:ml-1.5 rtl:mr-0" /> <span className="text-xs font-medium">{post.views}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 rounded-lg">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full rounded-xl py-6 text-slate-500 hover:text-blue-600 border-dashed border-2">
            Load More Discussions
          </Button>
        </div>

        {/* Right Sidebar: Polls & Trending */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Community Poll */}
          <Card className="border-slate-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 text-orange-500" /> Community Poll
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm font-bold text-slate-900">What is your favorite weekend activity in Kuwait?</p>
              <div className="space-y-3">
                {[
                  { label: 'Beach & Chalet', percent: 45 },
                  { label: 'Shopping Malls', percent: 25 },
                  { label: 'Desert Camping', percent: 20 },
                  { label: 'Dining Out', percent: 10 },
                ].map((option) => (
                  <div key={option.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{option.label}</span>
                      <span>{option.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${option.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-slate-900 hover:bg-blue-600 text-xs h-9">Vote Now</Button>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 text-blue-600" /> Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {[
                '#KuwaitResidency',
                '#SalmiyaFood',
                '#WeekendVibes',
                '#TechInKuwait',
                '#FamilyVisas',
              ].map((tag) => (
                <div key={tag} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                  <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">{tag}</span>
                  <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600">1.2k posts</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
