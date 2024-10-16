import React from 'react';

const FeaturedTechCompanies = () => {
  const companies = [
    { name: 'TechCorp', logo: 'path/to/techcorp-logo.png' },
    { name: 'CloudSoft', logo: 'path/to/cloudsoft-logo.png' },
    { name: 'DevOps Pro', logo: 'path/to/devopspro-logo.png' },
    { name: 'AI Innovate', logo: 'path/to/aiinnovate-logo.png' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Tech Companies Hiring Remotely</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <img src={company.logo} alt={company.name} className="w-24 h-24 object-contain mb-4" />
            <h3 className="text-xl font-semibold">{company.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTechCompanies;