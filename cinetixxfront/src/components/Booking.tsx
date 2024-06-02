import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScreeningById, bookScreening } from '../services/bookingService';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Booking = () => {
    const { screeningId } = useParams();
    const navigate = useNavigate();
    const [screening, setScreening] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token is not found
            return;
        }

        const fetchScreening = async () => {
            try {
                const data = await getScreeningById(screeningId);
                setScreening(data);
            } catch (error) {
                console.error('Failed to fetch screening', error);
            }
        };

        fetchScreening();
    }, [screeningId, navigate]);

    const handleBooking = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.nameid;
            
            // Create the booking in the database
            await bookScreening(screeningId, numberOfTickets, userId);
    
            // Redirect to the home page or any other page as needed
            navigate('/');
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
                <PayPalScriptProvider options={{ clientId: "AUIxojMpXDAPU_QVAhr4IBXtFt7goHJinozSklnokGX_LNsU03dJMlloW0fqafKxjJ3oVdWQE0TRfQHe" }}>
                    <PayPalButtons
                        style={{ layout: 'horizontal' }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                intent: 'CAPTURE', // Add intent here
                                purchase_units: [{
                                    amount: {
                                        currency_code: 'USD',
                                        value: (screening.price * numberOfTickets).toString(),
                                    }
                                }]
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(function (details) {
                                handleBooking(data.orderID);
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
};

export default Booking;
