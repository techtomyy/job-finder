import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KeywordSuggestionsProps {
  resumeId: string | null;
}

export default function KeywordSuggestions({ resumeId }: KeywordSuggestionsProps) {
  // For now, we'll show static keyword suggestions
  // In a full implementation, this would fetch keyword analysis for the resume
  const keywords = {
    matched: ["JavaScript", "React", "Node.js", "AWS", "Git", "API Development"],
    missing: ["Python", "Machine Learning", "Docker", "Kubernetes"],
    suggested: ["TypeScript", "GraphQL", "MongoDB", "CI/CD", "Agile", "Microservices"]
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700" data-testid="keyword-suggestions">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ATS Keywords Analysis</h3>
      
      {/* Keyword Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg" data-testid="keywords-matched">
          <div className="text-2xl font-bold text-success">{keywords.matched.length}</div>
          <div className="text-sm text-green-600 dark:text-green-400">Matched</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg" data-testid="keywords-missing">
          <div className="text-2xl font-bold text-destructive">{keywords.missing.length}</div>
          <div className="text-sm text-red-600 dark:text-red-400">Missing</div>
        </div>
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg" data-testid="keywords-suggested">
          <div className="text-2xl font-bold text-primary">{keywords.suggested.length}</div>
          <div className="text-sm text-blue-600 dark:text-blue-400">Suggested</div>
        </div>
      </div>

      {/* Matched Keywords */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Matched Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.matched.map((keyword, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                data-testid={`matched-keyword-${index}`}
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Missing Important Keywords</h4>
          <div className="space-y-2">
            {keywords.missing.map((keyword, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                data-testid={`missing-keyword-${index}`}
              >
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="destructive"
                    className="bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200"
                  >
                    {keyword}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">High priority</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700"
                  data-testid={`add-keyword-${index}`}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Keywords */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Suggested Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.suggested.map((keyword, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                data-testid={`suggested-keyword-${index}`}
              >
                {keyword} +
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
