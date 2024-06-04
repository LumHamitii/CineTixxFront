import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import Footer from "../components/Footer"
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
                            <h2 className="text-2xl font-semibold mb-2">{comingSoon.title}</h2>
                            <p className="text-gray-400 mb-4">{comingSoon.description}</p>
                            <p className="text-lg font-bold">{comingSoon.releaseDate}</p>
                            {/* <span className="text-sm ml-2 bg-blue-500 px-2 py-1 rounded-lg absolute bottom-4 left-4 sm:left-auto sm:right-4">View Details</span> */}
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComingSoonList;
