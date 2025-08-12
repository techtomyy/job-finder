import { FileText, Briefcase, TrendingUp, Send } from "lucide-react";

interface StatsGridProps {
  stats?: {
    totalResumes: number;
    jobMatches: number;
    atsScore: number;
    applications: number;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statCards = [
    {
      title: "Total Resumes",
      value: stats?.totalResumes || 0,
      change: "+2 this week",
      icon: FileText,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-primary",
      testId: "stat-resumes"
    },
    {
      title: "Job Matches", 
      value: stats?.jobMatches || 0,
      change: "+12 today",
      icon: Briefcase,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-success",
      testId: "stat-matches"
    },
    {
      title: "ATS Score",
      value: `${stats?.atsScore || 0}%`,
      change: "+5% improved",
      icon: TrendingUp,
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30", 
      iconColor: "text-warning",
      testId: "stat-ats"
    },
    {
      title: "Applications",
      value: stats?.applications || 0,
      change: "5 this week",
      icon: Send,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600",
      testId: "stat-applications"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-testid="stats-grid">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            data-testid={card.testId}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2" data-testid={`${card.testId}-value`}>
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-success font-medium" data-testid={`${card.testId}-change`}>
                {card.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
