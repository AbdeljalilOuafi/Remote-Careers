import React from 'react';

const PopularTechStacks = () => {
  const techStacks = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟩' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'Go', icon: '🐹' },
    { name: 'Ruby on Rails', icon: '💎' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Popular Tech Stacks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {techStacks.map((stack, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <span className="text-4xl mb-4 block">{stack.icon}</span>
            <h3 className="text-xl font-semibold">{stack.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTechStacks;