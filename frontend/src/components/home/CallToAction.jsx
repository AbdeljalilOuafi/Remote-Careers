import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Remote Software Engineering Career?
        </h2>
        <p className="text-xl mb-8">Join thousands of developers who have found their dream remote job through our platform.</p>
        <Link to="jobs">
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors">
          Explore Remote Jobs
        </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;