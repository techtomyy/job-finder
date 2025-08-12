import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    plan: string;
    usage?: string; 
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4" data-testid="header">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white" data-testid="page-title">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your resumes and job applications
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Usage indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-300" data-testid="usage-indicator">
              {user?.usage || "7/10 resumes this month"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            data-testid="notifications-button"
          >
            <Bell className="w-5 h-5 text-gray-400" />
          </Button>
          <Button 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            data-testid="new-resume-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Resume
          </Button>
        </div>
      </div>
    </header>
  );
}

// Usage example
<Header user={{ name: "John Doe", email: "john@example.com", avatar: "path/to/avatar.jpg", plan: "Pro Plan", usage: "5/10 resumes this month" }} />
