import React from 'react';
import Hero from '../components/home/Hero';
import PopularTechStacks from '../components/home/PopularTechStacks.jsx';
import FeaturedTechCompanies from '../components/home/FeaturedTechCompanies.jsx';
import RemoteJobBenefits from '../components/home/RemoteJobBenefits.jsx';
import CallToAction from '../components/home/CallToAction.jsx';

const Home = () => {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <CallToAction />
      <PopularTechStacks />
      <FeaturedTechCompanies />
      <RemoteJobBenefits />
    </div>
  );
};

export default Home;