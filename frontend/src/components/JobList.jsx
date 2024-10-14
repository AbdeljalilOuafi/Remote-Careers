import React, { useState } from 'react';
import Modal from './Modal';

const JobList = ({ jobs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleViewJob = (job) => {
        setSelectedJob(job); // Set the selected job
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedJob(null); // Clear selected job
    };

    return (
        <div className="space-y-4">
            {jobs.map((job, index) => (
                <div key={index} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{job.title || 'Unnamed Job'}</h2>
                    {job.company.logo && <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-16 h-16 object-contain" />}
                    <button 
                        onClick={() => handleViewJob(job)} 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        View Job
                    </button>
                    {job.staffCountRange && <p><strong>Staff Count Range:</strong> {job.staffCountRange}</p>}
                    {job.headquarter && <p><strong>Headquarters:</strong> {job.headquarter}</p>}
                </div>
            ))}
            {/* Render Modal */}
            {selectedJob && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} job={selectedJob} />
            )}
        </div>
    );
};

export default JobList;