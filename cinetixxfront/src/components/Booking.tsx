import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScreeningById, bookScreening } from '../services/bookingService';

const Booking = () => {
    const { screeningId } = useParams();
    const navigate = useNavigate();
    const [screening, setScreening] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(1);

    useEffect(() => {
        const fetchScreening = async () => {
            try {
                const data = await getScreeningById(screeningId);
                setScreening(data);
            } catch (error) {
                console.error('Failed to fetch screening', error);
            }
        };

        fetchScreening();
    }, [screeningId]);

    const handleBooking = async () => {
        try {
            await bookScreening(screeningId, numberOfTickets);
            navigate('/'); // Navigate back to home or to a success page
        } catch (error) {
            console.error('Failed to book tickets', error);
        }
    };

    if (!screening) return <div>Loading...</div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Booking</h1>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">{new Date(screening.startTime).toLocaleString()}</h2>
                <p className="text-gray-400 mb-4">{new Date(screening.endTime).toLocaleString()}</p>
                <span className="text-lg font-bold">{screening.price}$</span>
                <div className="mt-4">
                    <label className="block mb-2 text-lg">Number of Tickets</label>
                    <input
                        type="number"
                        value={numberOfTickets}
                        onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        min="1"
                    />
                </div>
                <button
                    onClick={handleBooking}
                    className="mt-4 w-full bg-blue-600 p-2 rounded-md text-white"
                >
                    Book Tickets
                </button>
            </div>
        </div>
    );
};

export default Booking;
