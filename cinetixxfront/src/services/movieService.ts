import axios from 'axios';

const API_URL = 'http://localhost:5048/api'; // Adjust the base URL as necessary

export const getAllMovies = async () => {
    const response = await axios.get(`${API_URL}/Movie`);
    return response.data;
};

export const getScreeningsForMovie = async (movieId) => {
    const response = await axios.get(`${API_URL}/Screening/movie/${movieId}`);
    return response.data;
};
