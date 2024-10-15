import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from "./components/layout/Layout";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import JobListPage from "./pages/JobListPage";
import Home from "./pages/Home";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import ConfEmail from "./components/confimEmail/ConfEmail";
import SavedJobs from './pages/SavedJobs';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Component that wraps Layout with Navbar and Footer
const LayoutWithNavFooter = ({ children }) => (
  <>
    <Navbar />
    <Layout>{children}</Layout>
    <Footer />
  </>
);

const AppContent = ({ savedJobs, setSavedJobs }) => {
  const location = useLocation();
  const isAuthPage = ['/signUp', '/login', '/verify-email'].includes(location.pathname);

  return (
    <>
      {isAuthPage ? (
        <Layout>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<ConfEmail />} />
          </Routes>
        </Layout>
      ) : (
        <LayoutWithNavFooter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobListPage savedJobs={savedJobs} setSavedJobs={setSavedJobs} />} />
              <Route path="/saved-jobs" element={<SavedJobs savedJobs={savedJobs} />} />
          </Routes>
        </LayoutWithNavFooter>
      )}
    </>
  );
};

function App() {
  const [savedJobs, setSavedJobs] = useState([]); // Manage saved jobs state here

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent savedJobs={savedJobs} setSavedJobs={setSavedJobs} /> 
      </Router>
    </QueryClientProvider>
  );
}

export default App;