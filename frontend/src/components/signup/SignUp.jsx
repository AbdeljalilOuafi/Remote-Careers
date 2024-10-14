import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/axios';

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate


  // State for form inputs
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setConfirmPassword] = useState('');

  // State for handling errors and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make the login request using the custom axiosInstance
      const response = await axiosInstance.post('/auth/register/', {
        first_name, last_name, email, password, password2
      });

      console.log(response.data)

      // Handle successful registration
      setSuccess('Registration successful!');
      setError('');
      // Redirect to verify-email page after successful registration
      navigate('/verify-email');


    } catch (err) {
      // Handle errors
      if (err.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error status:', err.response.status);
        console.error('Error data:', err.response.data);
        console.error('Error headers:', err.response.headers);
        setError(err.response.data.detail || 'Registration failed. Please try again.');
      } else if (err.request) {
        // The request was made, but no response was received
        console.error('No response received:', err.request);
        setError('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', err.message);
        setError('An error occurred. Please try again.');
      }
      setSuccess('');
    }
  };


  return (
    // start bg img container
    <div className=" flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 ">
      {/* start login container */}
      <div>
        <div className="bg-blue-100 border border-slale-400 rounded-[64px] p-16 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-80 relative ">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Create An Account!</h2>


          {error && <p className="text-lg text-center mb-4 text-red-600 " >{error}</p>}
          {success && <p className="text-lg text-center mb-4 text-success">{success}</p>}


          {/* test the p err */}
          {/* <p className="text-lg text-center mb-4 text-success" >test the paragraph</p> */}
          {/* test the p err */}


          <form onSubmit={handleSubmit}>
            
            {/* start firs name */}
            <div className="relative my-4 mb-10">
              <input
                className="block w-72 py-2.5 px-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-primaryBlack focus:border-blue-600 "
                type="text"
                id="first_name"
                placeholder="Enter your first name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="email" className="text-primaryBlack font-semibold absolute bg-transparent">First Name</label>
            </div>
            {/* end firs name */}
            {/* start last name */}

            <div className="relative my-4 mb-10">
              <input
                className="block w-72 py-2.5 px-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-primaryBlack focus:border-blue-600 "
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor="email" className="text-primaryBlack font-semibold absolute bg-transparent">Last Name</label>
            </div>           

            {/* end last name */}
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
              <label htmlFor="email" className="text-primaryBlack font-semibold absolute bg-transparent">Your Email</label>
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
            {/* start password2 */}

            <div className="relative my-4 mb-10">
              <input
                className="block w-72 py-2.5 px-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-primaryBlack focus:border-blue-600 "
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="text-primaryBlack font-semibold absolute bg-transparent">Confirm Password</label>
            </div>


            {/* end password */}
            {/* start Forget Password2 */}

            <p className="text-center py-4 text-primaryBlack hover:text-primaryBlackHover hover:underline font-medium ">
            <a href="/forget-password">Forget Password?</a>
            </p>

            {/* end Forget Password */}
            {/* start Login btn*/}

            <button type="submit" className="w-full mb-4 rounded-full bg-primary text-white font-semibold text-xl py-3 hover:bg-white hover:text-primary transition-colors duration-300 ">Sign Up</button>


            {/* end Login btn*/}
          </form>
          {/* start sign up */}

          <p className="text-center py-4 text-primaryBlack ">Already have an account?  <a href="/login" className=" font-semibold hover:text-primaryBlackHover hover:underline">Login</a>
          </p>


          {/* start sign up */}

        </div>
      </div>
      
      {/* end login container */}
      
    </div>
  )
};

export default SignUp;
