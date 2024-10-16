import React from 'react';

const RemoteJobBenefits = () => {
  const benefits = [
    { title: 'Flexible Schedule', description: "Work when you're most productive" },
    { title: 'No Commute', description: 'Save time and reduce stress' },
    { title: 'Global Opportunities', description: 'Work for companies worldwide' },
    { title: 'Better Work-Life Balance', description: 'More time for personal pursuits' },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Remote Software Engineering Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemoteJobBenefits;