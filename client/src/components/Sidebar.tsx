import { cn } from "@/lib/utils";
import { LayoutDashboard, Upload, Briefcase, FileText, Key, TrendingUp, Settings } from "lucide-react";

interface SidebarProps {
  user?: {
    name: string;
    plan: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#", current: true },
    { name: "Upload Resume", icon: Upload, href: "#", current: false },
    { name: "Job Matches", icon: Briefcase, href: "#", current: false },
    { name: "Tailored Resumes", icon: FileText, href: "#", current: false },
    { name: "Keywords", icon: Key, href: "#", current: false },
    { name: "Analytics", icon: TrendingUp, href: "#", current: false },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col" data-testid="sidebar">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Tailor</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Matching</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                item.current
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
            alt="User profile" 
            className="w-10 h-10 rounded-full"
            data-testid="user-avatar"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate" data-testid="user-name">
              {user?.name || "John Doe"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400" data-testid="user-plan">
              {user?.plan || "Pro Plan"}
            </p>
          </div>
          <button 
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            data-testid="user-settings"
          >
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
