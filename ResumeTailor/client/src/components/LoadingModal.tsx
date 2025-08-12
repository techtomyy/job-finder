import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface LoadingModalProps {
  isOpen: boolean;
  currentStep: string;
}

export default function LoadingModal({ isOpen, currentStep }: LoadingModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = Math.min(prev + increment, 95);
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen]);

  const processingSteps = [
    "Analyzing job description...",
    "Extracting key requirements...", 
    "Optimizing resume content...",
    "Calculating ATS score...",
    "Finalizing tailored resume..."
  ];

  const getCurrentStepIndex = () => {
    const index = processingSteps.findIndex(step => step === currentStep);
    return index >= 0 ? index : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-md w-full mx-4 p-8"
        hideCloseButton
        data-testid="loading-modal"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white animate-spin" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M12 2v5l10-5-10-5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            AI is tailoring your resume...
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This process typically takes 30-60 seconds
          </p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <Progress 
              value={progress} 
              className="w-full h-2" 
              data-testid="progress-bar"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="current-step">
              {currentStep || "Preparing..."}
            </p>
            
            {/* Step indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {processingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= getCurrentStepIndex() 
                      ? 'bg-primary' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  data-testid={`step-indicator-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
