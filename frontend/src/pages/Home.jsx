import React from 'react';
import Hero from '../components/hero/Hero';
import PopularTechStacks from '../components/PopularTechStacks.jsx';
import FeaturedTechCompanies from '../components/FeaturedTechCompanies.jsx';
import RemoteJobBenefits from '../components/RemoteJobBenefits.jsx';
import CallToAction from '../components/CallToAction.jsx';

const Home = () => {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <PopularTechStacks />
      <FeaturedTechCompanies />
      <RemoteJobBenefits />
      <CallToAction />
    </div>
  );
};

export default Home;