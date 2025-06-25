# Broski Drive - Chauffeur Service Application

## Overview
Broski Drive is a premium chauffeur service web application built with React, Express, and Drizzle ORM. The application provides an elegant interface for customers to book private driver services, calculate route pricing, and contact the company. It features a modern, responsive design with a focus on user experience and professional presentation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with Hot Module Replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Connect PG Simple for session storage
- **Development**: Hot reload with tsx

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle Kit for migrations
- **Session Storage**: PostgreSQL-based session store
- **Development Fallback**: In-memory storage implementation

## Key Components

### Database Schema
The application uses three main tables:
- **Users**: Authentication and user management (id, username, password)
- **Bookings**: Service reservations with customer details, route information, pricing, and status tracking
- **Contact Messages**: Customer inquiries and communication

### API Endpoints
- `POST /api/calculate-route`: Route distance and pricing calculation
- `POST /api/bookings`: Booking creation and management
- `POST /api/contact`: Contact form submissions
- `GET /api/bookings`: Booking retrieval (admin functionality)

### UI Components Structure
- **Header**: Navigation with smooth scrolling to sections
- **Hero Section**: Main landing area with call-to-action
- **Booking Form**: Multi-step reservation process with route calculation
- **Services Section**: Service offerings presentation
- **Pricing Section**: Transparent pricing structure
- **Contact Section**: Customer communication interface
- **Footer**: Company information and social links

## Data Flow

1. **Route Calculation**: Users input start/end addresses → API calculates distance, duration, and pricing → Results displayed in booking form
2. **Booking Process**: Customer fills form → Validation via Zod schemas → Route calculation → Database storage → Confirmation
3. **Contact Submissions**: Form submission → Validation → Database storage → User feedback
4. **Real-time Updates**: TanStack Query manages cache invalidation and optimistic updates

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem with Radix UI components
- **Database**: Neon PostgreSQL serverless platform
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for schema validation
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography

### Development Dependencies
- **Build System**: Vite with TypeScript support
- **Development Server**: Express with Vite middleware
- **Code Quality**: TypeScript strict mode configuration
- **Hot Reload**: Vite HMR with error overlay

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` runs both frontend and backend with HMR
- **Database**: Connects to Neon PostgreSQL via DATABASE_URL environment variable
- **Port Configuration**: Backend on port 5000, frontend proxied through Vite

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment Target**: Replit autoscale deployment
- **Environment**: Production mode with optimized builds

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port Mapping**: Internal 5000 → External 80

## Changelog
- June 25, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.