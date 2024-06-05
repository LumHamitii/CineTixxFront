import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('fromDate', fromDate);
        formData.append('toDate', toDate);
        formData.append('photo', photo);

        try {
            const response = await axios.post('http://localhost:5048/api/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (typeof onAdd === 'function') {
                onAdd(response.data); // Call the onAdd callback to handle addition
            }
            // Reset the form after successful addition
            setTitle('');
            setDescription('');
            setFromDate('');
            setToDate('');
            setPhoto(null);
        } catch (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event. Please try again later.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1">From Date:</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">To Date:</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Photo:</label>
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
