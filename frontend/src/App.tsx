import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import EmployerDashboard from './pages/employer/Dashboard';
import FindJobs from './pages/FindJobs';
import Feedback from './pages/Feedback'; 
import Profile from './pages/Profile';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      <Route path="/find-jobs" element={<FindJobs />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile />} />
      {/* Add more routes here as needed */}
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
