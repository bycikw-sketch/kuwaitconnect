'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingBag, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  Settings, 
  Bell, 
  ShieldCheck, 
  LayoutDashboard
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const MOCK_STATS = [
  { label: 'Total Users', value: '185,432', change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Ads', value: '42,120', change: '+5.2%', trend: 'up', icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Job Postings', value: '1,245', change: '-2.1%', trend: 'down', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Revenue (KWD)', value: '15,640', change: '+18.7%', trend: 'up', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const MOCK_MODERATION_QUEUE = [
  { id: '1', type: 'Ad', title: 'iPhone 15 Pro Max - Unlocked', user: 'John Doe', status: 'pending', time: '2 mins ago' },
  { id: '2', type: 'Job', title: 'Senior Software Engineer', user: 'Tech Corp', status: 'pending', time: '15 mins ago' },
  { id: '3', type: 'Forum', title: 'Controversial Topic Discussion', user: 'Anonymous', status: 'flagged', time: '1 hour ago' },
  { id: '4', type: 'Event', title: 'Underground Music Festival', user: 'Event Planner', status: 'pending', time: '3 hours ago' },
];

export default function AdminDashboard() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-400 p-6 space-y-8 border-r border-slate-800">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
          <span className="text-xl font-bold tracking-tight text-white">
            Kuwait<span className="text-blue-500">Admin</span>
          </span>
        </div>

        <nav className="flex-grow space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'User Management', icon: Users, active: false },
            { name: 'Content Moderation', icon: ShieldCheck, active: false },
            { name: 'Marketplace Ads', icon: ShoppingBag, active: false },
            { name: 'Job Board', icon: Briefcase, active: false },
            { name: 'Events & Calendar', icon: Calendar, active: false },
            { name: 'Forum Threads', icon: MessageSquare, active: false },
            { name: 'Site Settings', icon: Settings, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={cn(
                "w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-medium transition-all",
                item.active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <XCircle className="h-5 w-5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome back, Admin. Here is what is happening today.</p>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search records..." className="pl-10 rounded-full h-10 border-slate-200 w-64 bg-white" />
            </div>
            <Button variant="outline" size="icon" className="rounded-full bg-white border-slate-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white p-1 pr-4 rounded-full border border-slate-200 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs uppercase">AD</div>
              <span className="text-sm font-bold text-slate-900">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_STATS.map((stat) => (
            <Card key={stat.label} className="border-none shadow-xl rounded-[2rem] overflow-hidden group hover:-translate-y-1 transition-all">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                    stat.trend === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>
                    {stat.trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Moderation Queue */}
          <Card className="lg:col-span-2 border-none shadow-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-slate-50 p-8">
              <div>
                <CardTitle className="text-xl">Moderation Queue</CardTitle>
                <CardDescription>Items awaiting approval or flagged for review.</CardDescription>
              </div>
              <Button variant="ghost" className="text-blue-600 font-bold">View All Queue</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right">
                  <thead className="bg-slate-50/50 text-slate-400 text-xs uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-8 py-4">Content</th>
                      <th className="px-8 py-4">Type</th>
                      <th className="px-8 py-4">User</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_MODERATION_QUEUE.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</span>
                            <span className="text-xs text-slate-400">{item.time}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 border-slate-200">
                            {item.type}
                          </Badge>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-medium text-slate-600">{item.user}</span>
                        </td>
                        <td className="px-8 py-6">
                          <Badge className={cn(
                            "text-[10px] uppercase font-bold border-none",
                            item.status === 'pending' ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                          )}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50 rounded-lg">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-lg">
                              <XCircle className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "h-8 w-8 text-slate-400 rounded-lg")}>
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>User History</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Ban User</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed / Alerts */}
          <div className="space-y-8">
            <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-slate-50/50 p-8">
                <CardTitle className="text-xl flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-orange-500 rtl:ml-2 rtl:mr-0" /> System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {[
                  { title: 'High traffic detected', desc: 'Marketplace traffic is 40% higher than usual.', time: '10 mins ago', type: 'info' },
                  { title: 'Database Backup', desc: 'Daily backup completed successfully.', time: '2 hours ago', type: 'success' },
                  { title: 'Reported Content', desc: '5 new reports in the "Indians in Kuwait" forum.', time: '3 hours ago', type: 'warning' },
                ].map((alert, idx) => (
                  <div key={idx} className="flex items-start space-x-4 rtl:space-x-reverse group">
                    <div className={cn(
                      "h-2 w-2 rounded-full mt-1.5 flex-shrink-0",
                      alert.type === 'info' ? "bg-blue-500" : alert.type === 'success' ? "bg-green-500" : "bg-orange-500"
                    )} />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{alert.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{alert.desc}</p>
                      <p className="text-[10px] text-slate-400">{alert.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl py-6 text-slate-500 font-bold border-slate-100">
                  View All Logs
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900 text-white rounded-[2.5rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl" />
              <CardContent className="p-8 space-y-6 relative z-10">
                <h3 className="text-xl font-bold">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-white/10 hover:bg-white/20 border-none text-xs rounded-xl h-12 flex flex-col items-center justify-center gap-1">
                    <Bell className="h-4 w-4" /> Broadcast
                  </Button>
                  <Button className="bg-white/10 hover:bg-white/20 border-none text-xs rounded-xl h-12 flex flex-col items-center justify-center gap-1">
                    <Settings className="h-4 w-4" /> Config
                  </Button>
                  <Button className="bg-white/10 hover:bg-white/20 border-none text-xs rounded-xl h-12 flex flex-col items-center justify-center gap-1">
                    <Users className="h-4 w-4" /> Add Admin
                  </Button>
                  <Button className="bg-white/10 hover:bg-white/20 border-none text-xs rounded-xl h-12 flex flex-col items-center justify-center gap-1">
                    <BarChart3 className="h-4 w-4" /> Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
