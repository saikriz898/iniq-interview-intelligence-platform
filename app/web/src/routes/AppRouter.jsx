import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/common/Home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ExplorePage from '../pages/public/ExplorePage';
import ExperienceOverviewPage from '../pages/public/ExperienceOverviewPage';
import { 
  NotFoundPage, NoResultsPage, SubmissionFailedPage, 
  AccessDeniedPage, ServerErrorPage, OfflinePage, 
  MaintenancePage, SessionExpiredPage, ExperienceUnavailablePage, 
  ValidationErrorPage 
} from '../pages/common/Errors/ErrorPages';
import RoundDetailsPage from '../pages/public/RoundDetailsPage';
import HowItWorksPage from '../pages/public/HowItWorksPage';
import HelpCenterPage from '../pages/public/HelpCenterPage';
import ContactPage from '../pages/public/ContactPage';
import ResourcesPage from '../pages/public/ResourcesPage';
// Resources Sub-Modules
import CompaniesPage from '../pages/public/resources/CompaniesPage';
import RolesPage from '../pages/public/resources/RolesPage';
import TopicsPage from '../pages/public/resources/TopicsPage';
import InterviewRoundsPage from '../pages/public/resources/InterviewRoundsPage';
import DSAPrepPage from '../pages/public/resources/DSAPrepPage';
import SystemDesignPage from '../pages/public/resources/SystemDesignPage';
// Legal & Policy Modules
import PrivacyPolicyPage from '../pages/public/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/public/TermsOfServicePage';
import CookiePolicyPage from '../pages/public/CookiePolicyPage';

/**
 * --- INIQ APP ROUTER ---
 * Central hub for all application navigation.
 * Each route defines a different page of the intelligence platform.
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/experiences" element={<ExplorePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Resources Hub & Modules */}
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/companies" element={<CompaniesPage />} />
      <Route path="/resources/roles" element={<RolesPage />} />
      <Route path="/resources/topics" element={<TopicsPage />} />
      <Route path="/resources/interview-rounds" element={<InterviewRoundsPage />} />
      <Route path="/resources/dsa-prep" element={<DSAPrepPage />} />
      <Route path="/resources/system-design" element={<SystemDesignPage />} />

      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      <Route path="/experiences/:id" element={<ExperienceOverviewPage />} />
      <Route path="/experiences/:expId/rounds/:roundId" element={<RoundDetailsPage />} />
      
      {/* --- ERROR MANAGEMENT & DIAGNOSTIC ROUTES --- */}
      {/* 404 - Not Found (Catch-all) */}
      <Route path="*" element={<NotFoundPage />} />
      
      {/* Specific Platform Error States */}
      <Route path="/error/no-results" element={<NoResultsPage />} />
      <Route path="/error/submission-failed" element={<SubmissionFailedPage />} />
      <Route path="/error/access-denied" element={<AccessDeniedPage />} />
      <Route path="/error/server-error" element={<ServerErrorPage />} />
      <Route path="/error/offline" element={<OfflinePage />} />
      <Route path="/error/maintenance" element={<MaintenancePage />} />
      <Route path="/error/session-expired" element={<SessionExpiredPage />} />
      <Route path="/error/experience-unavailable" element={<ExperienceUnavailablePage />} />
      <Route path="/error/validation-error" element={<ValidationErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
