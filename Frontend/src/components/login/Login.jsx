import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for handling errors and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the login request using the custom axiosInstance
      const response = await axiosInstance.post('/auth/login/', {
        email,
        password,
      });
    
      // Explicitly extract access_token and refresh_token from the response
      const { access_token, refresh_token } = response.data;
    
      if (access_token && refresh_token) {
        // Save the access_token in the Authorization header
        console.log(access_token)
        // axiosInstance.defaults.headers.common['Authorization'] = null;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    
        // Save the access_token and refresh_token in local storage
        localStorage.setItem('access_token', access_token);
        // localStorage.removeItem('refresh_token');
        localStorage.setItem('refresh_token', refresh_token);
    
        // Handle successful login
        setSuccess('Login successful!');
        setError('');
    
        // Redirect to home page after successful login =>
        navigate('/');
      } else {
        setError('Login failed. Tokens not received.');
        setSuccess('');
      }

    } catch (err) {
      // Handle errors with custom messages from backend
      if (err.response && err.response.data && err.response.data.detail) {
        // Extract and display custom error message from backend
        setError(err.response.data.detail);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      setSuccess('');
      console.error('login error:', err);
    }
    

  };

  return (
    // start bg img container
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 ">
      {/* start login container */}
      <div>
        <div className="bg-blue-100 border border-slale-400 rounded-[64px] p-32 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-80 relative ">
          <h2 className="text-4xl font-bold text-center text-primaryBlack mb-16">Welcome back!</h2>


          {error && <p className="text-lg text-center mb-4 text-red-600 " >{error}</p>}
          {success && <p className="text-lg text-center mb-4 text-success">{success}</p>}


          {/* test the p err */}
          {/* <p className="text-lg text-center mb-4 text-success" >test the paragraph</p> */}
          {/* test the p err */}


          <form onSubmit={handleSubmit}>
            {/* start email */}

            <div className="relative my-4 mb-10">
              <input
                className="block w-72 py-2.5 px-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-primaryBlack focus:border-blue-600 "
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="text-primaryBlack font-semibold absolute bg-transparent ">Your Email</label>
            </div> 
            
            {/* end email */}
            {/* start password */}

            <div className="relative my-4 mb-10">
              <input
                className="block w-72 py-2.5 px-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-primaryBlack focus:border-blue-600 "
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="text-primaryBlack font-semibold absolute bg-transparent">Password</label>
            </div>


            {/* end password */}
            {/* start Forget Password */}

            <p className="text-center py-4 text-primaryBlack hover:text-primaryBlackHover hover:underline font-medium ">
            <a href="/forget-password">Forget Password?</a>
            </p>

            {/* end Forget Password */}
            {/* start Login btn*/}

            <button type="submit" className="w-full mb-4 rounded-full bg-primary text-white font-semibold text-xl py-3 hover:bg-white hover:text-primary transition-colors duration-300 ">Login</button>


            {/* end Login btn*/}
          </form>
          {/* start sign up */}

          <p className="text-center py-4 text-primaryBlack ">Don’t have an account?  <a href="/signUp" className=" font-semibold hover:text-primaryBlackHover hover:underline">Sign Up</a>
          </p>


          {/* start sign up */}

        </div>
      </div>
      
      {/* end login container */}
      
    </div>
  )
};

export default Login;
