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
import UserDashboardPage from '../pages/user/UserDashboardPage';
import SubmitExperiencePage from '../pages/user/SubmitExperiencePage';
import MySubmissionsPage from '../pages/user/MySubmissionsPage';
import DraftsPage from '../pages/user/DraftsPage';
import NotificationsPage from '../pages/user/NotificationsPage';
import ProfilePage from '../pages/user/ProfilePage';
import SettingsPage from '../pages/user/SettingsPage';
import SavedItemsPage from '../pages/user/SavedItemsPage';
import SubmissionDetailsPage from '../pages/user/SubmissionDetailsPage';
import ContinueDraftPage from '../pages/user/ContinueDraftPage';
import EditProfilePage from '../pages/user/EditProfilePage';
import AuditLogsPage from '../pages/user/AuditLogsPage';
import LogDetailsPage from '../pages/user/LogDetailsPage';
import FAQPage from '../pages/user/FAQPage';
import SupportHubPage from '../pages/user/SupportHubPage';
import EditSubmissionPage from '../pages/user/EditSubmissionPage';

// Admin Intelligence Modules
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ManageExperiencesPage from '../pages/admin/ManageExperiencesPage';
import PendingReviewsPage from '../pages/admin/PendingReviewsPage';
import ReviewSubmissionDetailsPage from '../pages/admin/ReviewSubmissionDetailsPage';
import AdminEditExperiencePage from '../pages/admin/AdminEditExperiencePage';
import ManageCompaniesPage from '../pages/admin/ManageCompaniesPage';
import ManageRolesPage from '../pages/admin/ManageRolesPage';
import AdminNotificationsPage from '../pages/admin/AdminNotificationsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import AdminRoundDetailsPage from '../pages/admin/AdminRoundDetailsPage';
import AdminModerationReportPage from '../pages/admin/AdminModerationReportPage.jsx';
import AdminEditProfilePage from '../pages/admin/AdminEditProfilePage.jsx';
import AdminSecurityPage from '../pages/admin/AdminSecurityPage.jsx';
import ManageUsersPage from '../pages/admin/ManageUsersPage.jsx';
import PlatformAnalyticsPage from '../pages/admin/PlatformAnalyticsPage.jsx';

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
      <Route path="/dashboard" element={<UserDashboardPage />} />
      <Route path="/submit" element={<SubmitExperiencePage />} />
      <Route path="/my-submissions" element={<MySubmissionsPage />} />
      <Route path="/my-submissions/:id/edit" element={<EditSubmissionPage />} />
      <Route path="/my-submissions/:id" element={<SubmissionDetailsPage />} />
      <Route path="/drafts" element={<DraftsPage />} />
      <Route path="/drafts/:id" element={<ContinueDraftPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/settings/logs" element={<AuditLogsPage />} />
      <Route path="/settings/logs/:id" element={<LogDetailsPage />} />
      <Route path="/saved" element={<SavedItemsPage />} />
      <Route path="/experiences" element={<ExplorePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/support" element={<SupportHubPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Admin Operations Hub */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/experiences" element={<ManageExperiencesPage />} />
      <Route path="/admin/pending" element={<PendingReviewsPage />} />
      <Route path="/admin/pending/:id" element={<ReviewSubmissionDetailsPage />} />
      <Route path="/admin/pending/:id/rounds/:roundIndex" element={<AdminRoundDetailsPage />} />
      <Route path="/admin/pending/:id/report" element={<AdminModerationReportPage />} />
      <Route path="/admin/edit/:id" element={<AdminEditExperiencePage />} />
      <Route path="/admin/companies" element={<ManageCompaniesPage />} />
      <Route path="/admin/roles" element={<ManageRolesPage />} />
      <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
      <Route path="/admin/profile/edit" element={<AdminEditProfilePage />} />
      <Route path="/admin/profile" element={<AdminProfilePage />} />
      <Route path="/admin/security" element={<AdminSecurityPage />} />
      <Route path="/admin/settings" element={<AdminSettingsPage />} />
      <Route path="/admin/users" element={<ManageUsersPage />} />
      <Route path="/admin/analytics" element={<PlatformAnalyticsPage />} />
      
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
