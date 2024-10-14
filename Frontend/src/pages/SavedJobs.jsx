// src/pages/SavedJobs.jsx
import React from 'react';

const SavedJobs = ({ savedJobs }) => {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
            {savedJobs.length === 0 ? (
                <div>No saved jobs yet.</div>
            ) : (
                <div className="space-y-4">
                    {savedJobs.map((job, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-bold">{job.title || 'Unnamed Job'}</h2>
                            {job.company.logo && <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-16 h-16 object-contain" />}
                            <p><strong>Company:</strong> {job.company.name}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            {/* Add more job details as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;