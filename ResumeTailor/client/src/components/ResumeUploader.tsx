import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload, FileText, Link, Wand2 } from "lucide-react";

interface ResumeUploaderProps {
  onProcessingStart: (step: string) => void;
  onProcessingEnd: () => void;
  onResumeSelected: (resumeId: string | null) => void;
}

export default function ResumeUploader({ 
  onProcessingStart, 
  onProcessingEnd, 
  onResumeSelected 
}: ResumeUploaderProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [uploadedResumeId, setUploadedResumeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  
  const { toast } = useToast();

  // Mock file upload function
  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF or DOCX files only.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size must be less than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const mockResumeId = `resume_${Date.now()}`;
      setUploadedResumeId(mockResumeId);
      onResumeSelected(mockResumeId);
      setIsUploading(false);
      
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been parsed and is ready for tailoring.",
      });
    }, 1500);
  }, [toast, onResumeSelected]);

  // Mock resume tailoring function
  const handleTailorResume = async () => {
    if (!uploadedResumeId || !jobDescription.trim() || !jobTitle.trim() || !company.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and fill in all job details.",
        variant: "destructive",
      });
      return;
    }

    setIsTailoring(true);
    onProcessingStart("Analyzing job description...");
    
    // Simulate processing delay
    setTimeout(() => {
      onProcessingEnd();
      setIsTailoring(false);
      
      toast({
        title: "Resume tailored successfully",
        description: "Your resume has been optimized for this job posting.",
      });
      
      // Reset form
      setJobDescription("");
      setJobTitle("");
      setCompany("");
    }, 3000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700" data-testid="resume-uploader">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upload & Tailor Resume</h2>
        <button className="text-sm text-primary hover:text-blue-700 font-medium">
          View All <span className="ml-1">→</span>
        </button>
      </div>

      {/* File Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isDragging 
            ? 'border-primary bg-blue-50 dark:bg-blue-900/10' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-testid="file-drop-zone"
      >
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <CloudUpload className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload Your Resume</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop your PDF or DOCX file here, or click to browse
        </p>
        <div className="space-y-2">
          <Button
            onClick={() => document.getElementById('file-input')?.click()}
            disabled={isUploading}
            data-testid="choose-file-button"
          >
            {isUploading ? "Uploading..." : "Choose File"}
          </Button>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="file-input"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Supports PDF and DOCX up to 10MB</p>
        
        {uploadedResumeId && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4 text-success" />
              <span className="text-sm text-success font-medium">Resume uploaded successfully!</span>
            </div>
          </div>
        )}
      </div>

      {/* Job Details Input */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g. Senior Software Engineer"
              data-testid="input-job-title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="e.g. Google Inc."
              data-testid="input-company"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Description *
          </label>
          <Textarea 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Paste the job description here..."
            data-testid="textarea-job-description"
          />
        </div>
        
        <div className="flex space-x-3">
          <Button 
            className="flex-1"
            onClick={handleTailorResume}
            disabled={!uploadedResumeId || isTailoring || !jobDescription.trim() || !jobTitle.trim() || !company.trim()}
            data-testid="button-tailor-resume"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isTailoring ? "Tailoring..." : "Tailor Resume"}
          </Button>
          <Button 
            variant="outline"
            data-testid="button-from-url"
          >
            <Link className="w-4 h-4 mr-2" />
            From URL
          </Button>
        </div>
      </div>
    </div>
  );
}
