import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllComingSoon } from '../services/comingsoonService';

const ComingSoonList = () => {
    const navigate = useNavigate();
    const [comingSoonList, setComingSoonList] = useState([]);

    useEffect(() => {
        const fetchComingSoonList = async () => {
            try {
                const data = await getAllComingSoon();
                setComingSoonList(data);
            } catch (error) {
                console.error('Failed to fetch coming soon list', error);
            }
        };

        fetchComingSoonList();
    }, []);

    const handleComingSoonClick = (comingSoonId) => {
        navigate(`/coming-soon/${comingSoonId}`);
    };

    const getFullPhotoUrl = (photoUrl) => {
        const baseUrl = "http://localhost:5048"; // Update to your actual backend URL
        return `${baseUrl}${photoUrl}`;
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-900 min-h-screen text-white p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Coming Soon Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {comingSoonList.map(comingSoon => (
                        <button
                            key={comingSoon.id}
                            className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer focus:outline-none relative"
                            onClick={() => handleComingSoonClick(comingSoon.id)}
                        >
                            {comingSoon.photoUrl && (
                                <img
                                    src={getFullPhotoUrl(comingSoon.photoUrl)}
                                    alt={comingSoon.title}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-semibold mb-2">{comingSoon.title}</h2>
                            <p className="text-gray-400 mb-4">{comingSoon.description}</p>
                            <p className="text-lg font-bold">{comingSoon.releaseDate}</p>
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComingSoonList;
