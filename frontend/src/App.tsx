import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import EmployerDashboard from './pages/employer/Dashboard';
import FindJobs from './pages/FindJobs';
import Feedback from './pages/Feedback'; 
import Profile from './pages/Profile';
import PostJob from './pages/employer/PostJob';
import EmployerLayout from './components/EmployerLayout';
import JobDetail from './pages/JobDetail';
import SavedJobs from './pages/SavedJobs';
import JobManagement from './pages/employer/JobManagement';

function Router() {
  return (
    <Routes>
      {/* Employer pages */}
      <Route element={<EmployerLayout><EmployerDashboard /></EmployerLayout>} path="/employer/dashboard" />
      <Route element={<EmployerLayout><PostJob /></EmployerLayout>} path="/post-job" />
      <Route element={<EmployerLayout><JobManagement /></EmployerLayout>} path="/manage-jobs" />
      {/* Add other employer pages here in EmployerLayout */}

      {/* Jobseeker and other pages (no sidebar/navbar) */}
      <Route element={<LandingPage />} path="/" />
      <Route element={<AuthPage />} path="/auth" />
      <Route path="/find-jobs" element={<FindJobs />} />
      <Route path="/job/:id" element={<JobDetail />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route element={<Feedback />} path="/feedback" />
      <Route element={<Profile />} path="/profile" />
      {/* Add more routes as needed */}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
