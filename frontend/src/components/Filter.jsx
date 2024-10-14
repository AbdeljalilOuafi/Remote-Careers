import React from 'react';

const Filter = ({ setCategory, setLocation }) => {
    return (
        <div className="flex space-x-4 mb-4">
            <input 
                type="text" 
                placeholder="Job Category" 
                onChange={(e) => setCategory(e.target.value)} 
                className="border p-2 rounded"
            />
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