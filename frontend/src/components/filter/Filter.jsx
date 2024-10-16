import React from 'react';

const Filter = ({ setCategory, setLocation }) => {
    const languages = [
        'React', 
        'Node.js', 
        'Python', 
        'Java', 
        'Go', 
        'Ruby on Rails', 
        'Next.js', 
        'three.js'
    ];

    const handleCategoryClick = (language) => {
        console.log('Selected category:', language); // Log the selected category
        setCategory(language);
    };

    return (
        <div className="flex flex-col mb-4">
            <div className="flex space-x-4 mb-2">
                {languages.map((language) => (
                    <button
                        key={language}
                        onClick={() => handleCategoryClick(language)}
                        className="border p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        {language}
                    </button>
                ))}
            </div>
            <input 
                type="text" 
                placeholder="Location" 
                onChange={(e) => setLocation(e.target.value)} 
                className="border p-2 rounded"
            />
        </div>
    );
};

export default Filter;