import React from 'react';
import { Switch, Route } from 'wouter';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/employer/Dashboard';
import FindJobs from './pages/FindJobs';

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/employer/dashboard" component={Dashboard} />
      <Route path="/find-jobs" component={FindJobs} />
      {/* Add more routes here as needed */}
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
