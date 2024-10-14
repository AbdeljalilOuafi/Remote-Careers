import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios';

const ConfEmail = () => {
  const navigate = useNavigate();
  const [opt, setOpt] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/verify-email/', { opt });
      setSuccess('Login successful!');
      setError('');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        console.error('Error status:', err.response.status);
        console.error('Error data:', err.response.data);
        console.error('Error headers:', err.response.headers);
        setError(err.response.data.detail || 'Registration failed. Please try again.');
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response from the server. Please try again later.');
      } else {
        console.error('Error setting up request:', err.message);
        setError('An error occurred. Please try again.');
      }
      setSuccess('');
    }
  };

  const handleOptChange = (e) => {
    setOpt(e.target.value);
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the homepage
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900'>
      <div className="bg-blue-100 border border-slale-400 rounded-[64px] p-32 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-80 relative">
        <div className="conf-container">
          <form onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center text-primaryBlack mb-1">Enter Verification Code</h2>
            <p className="text-xl font-medium text-center text-primaryBlack mb-16">We've Sent A Code To Your Email</p>
            {error && <p className="text-lg text-center mb-4 text-red-600">{error}</p>}
            {success && <p className="text-lg text-center mb-4 text-success">{success}</p>}
            <input 
              className="block w-full py-2.5 px-1 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-primaryBlack focus:border-blue-600"
              type="number"
              value={opt}
              onChange={handleOptChange}
              placeholder="Enter your code"
              required
            />
            <p className="text-center py-4 text-text pb-7">Don't Get A Code? <a href="/resend" className="font-semibold hover:text-primaryBlackHover hover:underline">Click To Resend</a></p>
            <div className="conf-btn">
              <button type="submit" className="w-full mb-4 rounded-full bg-primary text-white font-semibold text-xl py-3 hover:bg-white hover:text-primary transition-colors duration-300">Verify</button>
              <button onClick={handleCancel} className="w-full mb-4 rounded-full bg-gray-400 text-text font-semibold text-xl py-3 hover:bg-white hover:text-primaryBlack transition-colors duration-300">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfEmail;