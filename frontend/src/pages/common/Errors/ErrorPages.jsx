import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorView from '../../../components/common/Errors/ErrorView';

const ErrorPageWrapper = ({ children }) => (
  <div className="h-screen w-full flex items-center justify-center p-6 md:p-12 lg:p-20 overflow-hidden relative">
    <div className="w-full max-w-7xl relative z-10 flex items-center justify-center">
      {children}
    </div>
  </div>
);

// 1. 404 NOT FOUND
export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="404 Error"
        title="Interview experience not found"
        description="The page you are trying to open does not exist or may have been removed. Please check the URL and try again."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="404"
      />
    </ErrorPageWrapper>
  );
};

// 2. NO EXPERIENCES FOUND (SEARCH SUCCESS BUT 0 RESULTS)
export const NoResultsPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="No Results"
        title="No interview experiences found"
        description="Try changing the company, role, or topic filters to discover more results. We're constantly adding new data."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="empty"
      />
    </ErrorPageWrapper>
  );
};

// 3. SUBMISSION FAILED
export const SubmissionFailedPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Submission Error"
        title="We could not submit your interview experience"
        description="Please review the details and try again. There might be a temporary issue with our database connection."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="server"
      />
    </ErrorPageWrapper>
  );
};

// 4. ACCESS DENIED
export const AccessDeniedPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Access Denied"
        title="You do not have permission to view this page"
        description="This area is restricted to authorized users. If you believe this is an error, please contact your administrator."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="denied"
      />
    </ErrorPageWrapper>
  );
};

// 5. SERVER ERROR
export const ServerErrorPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="500 Internal Error"
        title="Something went wrong"
        description="We could not load this page right now. Our servers are experiencing a temporary issue. Please refresh later."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="server"
      />
    </ErrorPageWrapper>
  );
};

// 6. OFFLINE
export const OfflinePage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Offline"
        title="You are offline"
        description="Your internet connection appears to be lost. Please check your network cables or Wi-Fi and try again."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="offline"
      />
    </ErrorPageWrapper>
  );
};

// 7. MAINTENANCE
export const MaintenancePage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Maintenance"
        title="We’ll be back soon"
        description="The platform is currently under maintenance or scheduled updates. Please check back again in a few minutes."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="maintenance"
      />
    </ErrorPageWrapper>
  );
};

// 8. SESSION EXPIRED
export const SessionExpiredPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Session State"
        title="Session expired"
        description="Your session has ended for security reasons. Please sign in again to continue using the platform and your tools."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="session"
      />
    </ErrorPageWrapper>
  );
};

// 9. EXPERIENCE UNAVAILABLE
export const ExperienceUnavailablePage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Unavailable"
        title="This experience is unavailable"
        description="The interview experience you are trying to view has been removed, hidden, or is no longer active on the platform."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="unavailable"
      />
    </ErrorPageWrapper>
  );
};

// 10. FORM VALIDATION ERROR
export const ValidationErrorPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorPageWrapper>
      <ErrorView 
        code="Validation Error"
        title="Please complete required fields"
        description="Some required details are missing from your submission. Review the highlighted fields and try again to submit."
        primaryAction={{ label: "Go back", action: () => navigate(-1) }}
        secondaryAction={{ label: "Refresh", action: () => window.location.reload() }}
        visualType="validation"
      />
    </ErrorPageWrapper>
  );
};
;
