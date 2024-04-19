import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = ({ onSuccess }) => {
  const [movieName, setMovieName] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieTrailer, setMovieTrailer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5048/api/Movie', {
        movieName: movieName,
        movieDescription: movieDescription,
        movieTrailer: movieTrailer
      });
      onSuccess(); 
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Trailer:</label>
          <input
            type="text"
            value={movieTrailer}
            onChange={(e) => setMovieTrailer(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
