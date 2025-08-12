# AI Resume Tailor & Job Matcher

## Overview

This is an AI-powered resume tailoring and job matching platform that helps users optimize their resumes for Applicant Tracking Systems (ATS) and find relevant job opportunities. The application allows users to upload their resumes, input job descriptions, and receive tailored resume suggestions with keyword analysis and matching scores.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **File Uploads**: Native FormData API with drag-and-drop support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **File Processing**: Multer for handling multipart file uploads
- **AI Integration**: OpenAI GPT-4o for resume analysis and tailoring
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple

### Database Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with Zod integration for type-safe schema validation
- **Connection Pooling**: Neon serverless connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema management

### Core Data Models
- **Users**: Authentication and usage tracking with plan-based limitations
- **Resumes**: Original and tailored resume content with ATS scoring
- **Job Descriptions**: Parsed job postings with extracted requirements
- **Job Matches**: Resume-to-job matching results with similarity scores

### File Processing Pipeline
- **Supported Formats**: PDF and DOCX file uploads
- **Text Extraction**: Custom parsing service for document content extraction
- **Validation**: File type, size, and content validation
- **Storage**: Temporary file system storage with cleanup

### AI Processing Workflow
- **Resume Analysis**: Extract skills, experience, and keywords from uploaded resumes
- **Job Description Parsing**: Identify key requirements and skills from job postings
- **Content Tailoring**: Generate optimized resume versions using AI
- **ATS Scoring**: Calculate compatibility scores based on keyword matching
- **Keyword Analysis**: Provide matched, missing, and suggested keywords

## External Dependencies

### Core Services
- **OpenAI API**: GPT-4o model for resume analysis and content generation
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit Platform**: Development and hosting environment

### Frontend Libraries
- **React Ecosystem**: React, React DOM, React Query
- **UI Framework**: Radix UI components, Tailwind CSS, Lucide icons
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Utilities**: clsx, class-variance-authority, date-fns

### Backend Libraries
- **Web Framework**: Express.js with CORS and middleware support
- **File Processing**: Multer for uploads, filesystem operations
- **Database**: Drizzle ORM, PostgreSQL drivers, connection pooling
- **Development**: tsx for TypeScript execution, Vite for development server

### Development Tools
- **Build System**: Vite with React plugin and development optimizations
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESBuild for production bundling
- **Hot Reload**: Vite HMR integration with Express middleware