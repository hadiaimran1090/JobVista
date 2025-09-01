import React from 'react';
import { Switch, Route } from 'wouter';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/employer/Dashboard';

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/employer/dashboard" component={Dashboard} />
      {/* Add more routes here as needed */}
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
