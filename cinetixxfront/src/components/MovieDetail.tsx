import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScreeningsForMovie } from '../services/movieService';
import Header from "../components/Header"
import Footer from "../components/Footer"

const MovieDetail = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [screenings, setScreenings] = useState([]);

    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const data = await getScreeningsForMovie(movieId);
                setScreenings(data);
            } catch (error) {
                console.error('Failed to fetch screenings', error);
            }
        };

        fetchScreenings();
    }, [movieId]);

    const handleScreeningClick = (screeningId) => {
        navigate(`/booking/${screeningId}`);
    };

    return (
       <div>
         <Header/>
         <div className="bg-gray-900 min-h-screen text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Screenings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {screenings.map(screening => (
                    <button
                        key={screening.id}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer focus:outline-none relative"
                        onClick={() => handleScreeningClick(screening.id)}
                    >
                        <h2 className="text-2xl font-semibold mb-2">{new Date(screening.startTime).toLocaleString()}</h2>
                        <p className="text-gray-400 mb-4">{new Date(screening.endTime).toLocaleString()}</p>
                        <span className="text-lg font-bold">{screening.price}$</span>
                        <span className="text-sm ml-2 bg-blue-500 px-2 py-1 rounded-lg absolute bottom-4 left-4 sm:left-auto sm:right-4">Book a Ticket</span>
                    </button>
                ))}
            </div>
        </div>
        <Footer/>
       </div>
    );
};

export default MovieDetail;
