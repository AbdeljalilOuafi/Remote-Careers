import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Modal from './Modal';

const JobList = ({ jobs, savedJobs, onToggleSaveJob }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleApply = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="space-y-4">
            {jobs.map((job, index) => (
                <div key={index} className="relative border p-4 rounded-2xl shadow">
                    <button 
                        onClick={() => onToggleSaveJob(job)} 
                        className="absolute top-4 right-4 text-2xl text-red-500"
                    >
                        {savedJobs.some(savedJob => savedJob.id === job.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <h2 className="text-xl font-bold">{job.title || 'Unnamed Job'}</h2>
                    {job.company.logo && <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-16 h-16 object-contain" />}
                    
                    <button 
                        onClick={() => handleViewJob(job)} 
                        className="mt-2 px-4 py-2 bg-blue-500 cursor-pointer hover:bg-blue-400 text-white rounded"
                    >
                        View Job
                    </button>

                    <button 
                        onClick={() => handleApply(job.url)}
                        className="mt-2 px-4 py-2 ml-4 bg-green-500 text-white rounded cursor-pointer hover:bg-green-400"
                    >
                        Apply Now
                    </button>

                    {job.staffCountRange && <p><strong>Staff Count Range:</strong> {job.staffCountRange}</p>}
                    {job.headquarter && <p><strong>Headquarters:</strong> {job.headquarter}</p>}
                </div>
            ))}
            {selectedJob && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} job={selectedJob} />
            )}
        </div>
    );
};

export default JobList;