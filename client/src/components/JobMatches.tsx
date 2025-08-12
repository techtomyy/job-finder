import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface JobMatch {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  matchScore: number;
  jobUrl?: string;
  postedDate?: string;
  isFavorite: boolean;
}

interface JobMatchesProps {
  jobMatches: JobMatch[];
}

export default function JobMatches({ jobMatches }: JobMatchesProps) {
  const { toast } = useToast();
  const [localJobMatches, setLocalJobMatches] = useState<JobMatch[]>(jobMatches);

  const handleToggleFavorite = (matchId: string, currentFavorite: boolean) => {
    setLocalJobMatches(prev => 
      prev.map(job => 
        job.id === matchId 
          ? { ...job, isFavorite: !currentFavorite }
          : job
      )
    );
    
    toast({
      title: currentFavorite ? "Removed from favorites" : "Added to favorites",
      description: currentFavorite 
        ? "Job removed from your favorites." 
        : "Job added to your favorites.",
    });
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
    if (score >= 75) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
    return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
  };

  const handleApply = (jobUrl?: string) => {
    if (jobUrl) {
      window.open(jobUrl, '_blank');
    } else {
      toast({
        title: "Job URL not available",
        description: "Please visit the company's website to apply.",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700" data-testid="job-matches">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Job Matches</h3>
        <button className="text-sm text-primary hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {localJobMatches.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No job matches yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Upload a resume to see matching opportunities</p>
          </div>
        ) : (
          localJobMatches.map((job, index) => (
            <div 
              key={job.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              data-testid={`job-match-${index}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white" data-testid={`job-title-${index}`}>
                  {job.jobTitle}
                </h4>
                <Badge className={getMatchColor(job.matchScore)} data-testid={`match-score-${index}`}>
                  {job.matchScore}% match
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2" data-testid={`job-company-${index}`}>
                {job.company}
                {job.location && ` • ${job.location}`}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400" data-testid={`job-posted-${index}`}>
                  {job.postedDate 
                    ? `Posted ${formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}`
                    : "Recently posted"
                  }
                </span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleApply(job.jobUrl)}
                    data-testid={`apply-button-${index}`}
                  >
                    Apply
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2"
                    onClick={() => handleToggleFavorite(job.id, job.isFavorite)}
                    data-testid={`favorite-button-${index}`}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        job.isFavorite 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400 hover:text-red-500'
                      }`} 
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
