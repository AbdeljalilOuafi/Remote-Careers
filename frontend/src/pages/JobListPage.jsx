// src/pages/JobListPage.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import JobList from '../components/JobList';
import Filter from '../components/Filter';
import axiosInstance from '../axios/axios';

const fetchJobs = async (keywords, location) => {
    const options = {
        method: 'GET',
        url: '/jobs/',
        params: {
            keywords: keywords || 'react',
            datePosted: 'anyTime',
            onsiteRemote: 'remote',
            sort: 'mostRecent',
            location: location || ''
        }
    };

    try {
        const response = await axiosInstance.request(options);
        console.log('API Response:', response.data);
        return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
        console.error('Error fetching jobs:', error.response?.data || error.message);
        throw error;
    }
};

const JobListPage = ({ savedJobs, setSavedJobs }) => {
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');

    const { data: jobs = [], isLoading, error } = useQuery({
        queryKey: ['jobs', category, location],
        queryFn: () => fetchJobs(category, location),
        enabled: true
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching jobs: {error.message}</div>;

    console.log('Fetched jobs:', jobs);

    const handleToggleSaveJob = (job) => {
        // Check if the job is already saved
        if (savedJobs.some(savedJob => savedJob.id === job.id)) {
            // Remove job from saved jobs
            setSavedJobs(savedJobs.filter(savedJob => savedJob.id !== job.id));
            alert('Job unsaved successfully!'); // Optional feedback to user
        } else {
            // Save the job
            setSavedJobs([...savedJobs, job]);
            alert('Job saved successfully!'); // Optional feedback to user
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Remote Job Opportunities</h1>
            <Filter setCategory={setCategory} setLocation={setLocation} />
            {jobs.length === 0 ? (
                <div>No jobs found. Try adjusting your search criteria.</div>
            ) : (
                <JobList jobs={jobs} savedJobs={savedJobs} onToggleSaveJob={handleToggleSaveJob} />
            )}
        </div>
    );
};

export default JobListPage;