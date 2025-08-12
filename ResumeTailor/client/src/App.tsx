import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import ResumeUpload from "@/pages/resume-upload";
import JobDescription from "@/pages/job-description";
import TailorResume from "@/pages/tailor-resume";
import KeywordSuggestions from "@/pages/keyword-suggestions";
import JobMatches from "@/pages/job-matches";
import ApplicationTracker from "@/pages/application-tracker";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/upload" component={ResumeUpload} />
      <Route path="/job-description" component={JobDescription} />
      <Route path="/tailor" component={TailorResume} />
      <Route path="/keywords" component={KeywordSuggestions} />
      <Route path="/matches" component={JobMatches} />
      <Route path="/tracker" component={ApplicationTracker} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
