import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EventDetails = () => {
    const { event_name } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Adjust if you're using sessionStorage

        axios.get(`http://localhost:8080/api/events/event-details/${event_name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setEvent(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching event details:', error);
                setLoading(false);
            });
    }, [event_name]);

    if (loading) return <p className="p-10">Loading...</p>;
    if (!event) return <p className="p-10">Event not found</p>;

    return (
        <div className="p-10">
            <nav className="text-sm text-gray-500 mb-4">
                Home / Events / <span className="text-black font-medium">{event.event_name}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <img
                    src={event.event_image || 'https://via.placeholder.com/400x300'}
                    alt={event.event_name || 'Event Image'}
                    className="rounded-xl object-cover w-full h-full"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-4">{event.event_name || 'Untitled Event'}</h1>
                    <p className="text-gray-600 mb-6">{event.event_description || 'No description available.'}</p>
                    <p className="text-xl font-semibold mb-4 text-green-600">
                        {event.event_price != null ? `₱${event.event_price.toLocaleString()}` : 'Price not available'}
                    </p>
                    {!event.event_isAvailable ? (
                        <button className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed" disabled>
                            Unavailable
                        </button>
                    ) : (
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">
                            Book Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;