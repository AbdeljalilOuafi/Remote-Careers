import React from 'react';

const Modal = ({ isOpen, onClose, job }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{job.title}</h2>
                {job.company.logo && <img src={job.company.logo} alt={`${job.company.name} logo`} className="w-16 h-16 object-contain mb-4" />}
                <p><strong>Company:</strong> {job.company.name}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Posted:</strong> {job.postDate}</p>
                {/* Add more fields as needed */}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
            </div>
        </div>
    );
};

export default Modal;