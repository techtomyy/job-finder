import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsGrid from "@/components/StatsGrid";
import ResumeUploader from "@/components/ResumeUploader";
import KeywordSuggestions from "@/components/KeywordSuggestions";
import RecentResumes from "@/components/RecentResumes";
import JobMatches from "@/components/JobMatches";
import LoadingModal from "@/components/LoadingModal";
import { useState } from "react";

// Mock data for the dashboard
const mockDashboardData = {
  stats: {
    totalResumes: 12,
    tailoredResumes: 8,
    jobMatches: 24,
    applications: 15,
    atsScore: 87 
  },
  recentResumes: [
    {
      id: "resume_1",
      title: "Software Engineer Resume", 
      createdAt: "2024-01-15T10:30:00Z", 
      matchScore: 85,
      isSelected: false
    },
    {
      id: "resume_2", 
      title: "Product Manager CV",
      createdAt: "2024-01-14T14:20:00Z",
      matchScore: 92,
      isSelected: false
    },
    {
      id: "resume_3",
      title: "Data Scientist Resume",
      createdAt: "2024-01-13T09:15:00Z",
      matchScore: 78,
      isSelected: false
    }
  ],
  jobMatches: [
    {
      id: "job_1",
      jobTitle: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      matchScore: 95,
      jobUrl: "https://careers.google.com",
      postedDate: "2024-01-15T08:00:00Z",
      isFavorite: true
    },
    {
      id: "job_2",
      jobTitle: "Full Stack Developer",
      company: "Microsoft",
      location: "Redmond, WA",
      matchScore: 88,
      jobUrl: "https://careers.microsoft.com",
      postedDate: "2024-01-14T10:00:00Z",
      isFavorite: false
    },
    {
      id: "job_3",
      jobTitle: "React Developer",
      company: "Meta",
      location: "Menlo Park, CA",
      matchScore: 82,
      jobUrl: "https://careers.meta.com",
      postedDate: "2024-01-13T12:00:00Z",
      isFavorite: false
    }
  ],
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    plan: "Pro Plan"
  }
};

export default function Dashboard() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [dashboardData] = useState(mockDashboardData);

  const { stats, recentResumes, jobMatches, user } = dashboardData;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <StatsGrid stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ResumeUploader 
                onProcessingStart={(step) => {
                  setIsProcessing(true);
                  setCurrentStep(step);
                }}
                onProcessingEnd={() => {
                  setIsProcessing(false);
                  setCurrentStep("");
                }}
                onResumeSelected={setSelectedResumeId}
              />
              
              <KeywordSuggestions 
                resumeId={selectedResumeId}
              />
            </div>
            
            <div className="space-y-6">
              <RecentResumes 
                resumes={recentResumes}
                onResumeSelect={setSelectedResumeId}
              />
              <JobMatches jobMatches={jobMatches} />
            </div>
          </div>
        </main>
      </div>

      <LoadingModal 
        isOpen={isProcessing}
        currentStep={currentStep}
      />
    </div>
  );
}
