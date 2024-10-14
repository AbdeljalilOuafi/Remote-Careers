import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from "./components/layout/Layout";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import JobListPage from "./pages/JobListPage";
import Home from "./pages/Home";
import SignUp from "./components/signup/signUp";
import Login from "./components/login/Login";
import ConfEmail from "./components/confimEmail/ConfEmail";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// component that wraps Layout with Navbar and Footer
const LayoutWithNavFooter = ({ children }) => (
  <>
    <Navbar />
    <Layout>{children}</Layout>
    <Footer />
  </>
);

const AppContent = () => {
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
            <Route path="/jobs" element={<JobListPage />} />
          </Routes>
        </LayoutWithNavFooter>
      )}
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;