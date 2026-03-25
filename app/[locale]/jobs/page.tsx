'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  Filter, 
  Bookmark, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Developer (Next.js)',
    company: 'TechSolutions Kuwait',
    location: 'Kuwait City',
    type: 'Full-time',
    salary: '800 - 1,200 KWD',
    posted: '2 days ago',
    category: 'IT & Software',
    is_verified: true,
  },
  {
    id: '2',
    title: 'Registered Nurse (MOH Licensed)',
    company: 'Al-Amiri Hospital',
    location: 'Sharq',
    type: 'Full-time',
    salary: '600 - 900 KWD',
    posted: '5 hours ago',
    category: 'Healthcare',
    is_verified: true,
  },
  {
    id: '3',
    title: 'Sales Executive - Real Estate',
    company: 'Kuwait Homes',
    location: 'Salmiya',
    type: 'Commission-based',
    salary: '400 KWD + Commission',
    posted: '1 day ago',
    category: 'Sales & Marketing',
    is_verified: false,
  },
  {
    id: '4',
    title: 'Graphic Designer (Social Media)',
    company: 'Creative Agency',
    location: 'Hawally',
    type: 'Part-time',
    salary: '300 - 450 KWD',
    posted: '3 days ago',
    category: 'Design',
    is_verified: false,
  },
  {
    id: '5',
    title: 'Delivery Driver (Bike/Car)',
    company: 'Talabat Partner',
    location: 'All Areas',
    type: 'Contract',
    salary: '250 - 400 KWD',
    posted: '6 hours ago',
    category: 'Logistics',
    is_verified: true,
  },
];

const JOB_TYPES = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];

export default function JobsPage() {
  const t = useTranslations();
  const [selectedType, setSelectedType] = useState('All Types');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-blue-600 p-8 rounded-3xl text-white">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Find Your Next Career in Kuwait</h1>
          <p className="text-blue-100">Browse thousands of verified job listings from top companies.</p>
        </div>
        <Link 
          href="/jobs/post" 
          className={cn(buttonVariants(), "bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-6 font-bold")}
        >
          Post a Job Opening
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 text-blue-600" /> Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-900">Job Type</label>
                <div className="space-y-2">
                  {JOB_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input 
                        type="radio" 
                        id={type} 
                        name="jobType" 
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <label htmlFor={type} className="text-sm text-slate-600 cursor-pointer">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <label className="text-sm font-bold text-slate-900">Salary Range (KWD)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Min" className="h-9 text-xs" />
                  <Input placeholder="Max" className="h-9 text-xs" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <label className="text-sm font-bold text-slate-900">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search area..." className="pl-9 h-10 text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Card */}
          <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full -mr-12 -mt-12 blur-2xl" />
            <CardContent className="p-6 space-y-4 relative z-10">
              <h3 className="font-bold">Job Alerts</h3>
              <p className="text-xs text-slate-400">Get the latest jobs matching your profile directly in your inbox.</p>
              <Input placeholder="Email address" className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 h-10" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10">Subscribe</Button>
            </CardContent>
          </Card>
        </aside>

        {/* Main Job List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search by job title, company, or keywords..." 
              className="pl-12 h-14 rounded-2xl border-slate-200 shadow-sm"
            />
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {MOCK_JOBS.map((job) => (
              <Card key={job.id} className="group hover:shadow-lg transition-all border-slate-100 cursor-pointer overflow-hidden">
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  {/* Company Logo Placeholder */}
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Building2 className="h-8 w-8" />
                  </div>

                  <div className="flex-grow space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          {job.is_verified && (
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-slate-600 font-medium">{job.company}</p>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                        <Button className="bg-slate-900 hover:bg-blue-600 rounded-lg px-6">
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <MapPin className="mr-1.5 h-4 w-4 rtl:ml-1.5 rtl:mr-0 text-slate-400" /> {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-1.5 h-4 w-4 rtl:ml-1.5 rtl:mr-0 text-slate-400" /> {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1.5 h-4 w-4 rtl:ml-1.5 rtl:mr-0 text-slate-400" /> {job.posted}
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-4">
            <Button variant="ghost" className="text-slate-500 hover:text-blue-600 group">
              View more jobs <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rtl:mr-2 rtl:ml-0 rtl:group-hover:-translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
