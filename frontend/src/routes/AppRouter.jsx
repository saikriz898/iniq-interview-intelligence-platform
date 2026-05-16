import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
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
 */
const AppRouter = () => {
  const { user } = useGlobalContext();

  // Helper for Authenticated Routes
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  // Helper for Admin Only Routes
  const AdminRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== 'admin') return <Navigate to="/error/access-denied" replace />;
    return children;
  };

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/experiences" element={<ExplorePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/support" element={<SupportHubPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Protected User Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
      <Route path="/submit" element={<ProtectedRoute><SubmitExperiencePage /></ProtectedRoute>} />
      <Route path="/my-submissions" element={<ProtectedRoute><MySubmissionsPage /></ProtectedRoute>} />
      <Route path="/my-submissions/:id/edit" element={<ProtectedRoute><EditSubmissionPage /></ProtectedRoute>} />
      <Route path="/my-submissions/:id" element={<ProtectedRoute><SubmissionDetailsPage /></ProtectedRoute>} />
      <Route path="/drafts" element={<ProtectedRoute><DraftsPage /></ProtectedRoute>} />
      <Route path="/drafts/:id" element={<ProtectedRoute><ContinueDraftPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/settings/logs" element={<ProtectedRoute><AuditLogsPage /></ProtectedRoute>} />
      <Route path="/settings/logs/:id" element={<ProtectedRoute><LogDetailsPage /></ProtectedRoute>} />
      <Route path="/saved" element={<ProtectedRoute><SavedItemsPage /></ProtectedRoute>} />
      
      {/* Admin Operations Hub */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
      <Route path="/admin/experiences" element={<AdminRoute><ManageExperiencesPage /></AdminRoute>} />
      <Route path="/admin/pending" element={<AdminRoute><PendingReviewsPage /></AdminRoute>} />
      <Route path="/admin/pending/:id" element={<AdminRoute><ReviewSubmissionDetailsPage /></AdminRoute>} />
      <Route path="/admin/pending/:id/rounds/:roundIndex" element={<AdminRoute><AdminRoundDetailsPage /></AdminRoute>} />
      <Route path="/admin/pending/:id/report" element={<AdminRoute><AdminModerationReportPage /></AdminRoute>} />
      <Route path="/admin/edit/:id" element={<AdminRoute><AdminEditExperiencePage /></AdminRoute>} />
      <Route path="/admin/companies" element={<AdminRoute><ManageCompaniesPage /></AdminRoute>} />
      <Route path="/admin/roles" element={<AdminRoute><ManageRolesPage /></AdminRoute>} />
      <Route path="/admin/notifications" element={<AdminRoute><AdminNotificationsPage /></AdminRoute>} />
      <Route path="/admin/profile/edit" element={<AdminRoute><AdminEditProfilePage /></AdminRoute>} />
      <Route path="/admin/profile" element={<AdminRoute><AdminProfilePage /></AdminRoute>} />
      <Route path="/admin/security" element={<AdminRoute><AdminSecurityPage /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><ManageUsersPage /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><PlatformAnalyticsPage /></AdminRoute>} />
      
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
      
      {/* Error Management */}
      <Route path="*" element={<NotFoundPage />} />
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

