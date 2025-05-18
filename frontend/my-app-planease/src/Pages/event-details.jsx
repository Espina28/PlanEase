// import React from 'react';
// import weddingImage from '../assets/Wedding.jpg'; // Replace with your actual image path
// // import '../WeddingEvent.css'; // Optional: for styling if using external CSS

// const WeddingEvent = () => {
//   return (
//     <div className="wedding-event-page">
//       <div className="container mx-auto px-4 py-8">
//         <nav className="text-sm text-gray-500 mb-4">
//           Home / <span className="text-black font-medium">Wedding Event</span>
//         </nav>
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <img
//             src={weddingImage}
//             alt="Wedding Couple"
//             className="rounded-xl object-cover w-full h-full"
//           />
//           <div>
//             <h1 className="text-3xl font-bold mb-4">WEDDING EVENT</h1>
//             <p className="text-gray-600 mb-6">
//               Celebrate your special day with ease! <span className="text-blue-500 font-medium">EventEase</span> helps you book the perfect venue, catering, decorations, and entertainment—all in one place. Whether it's an intimate gathering or a grand celebration, we ensure a seamless booking experience.
//             </p>
//             <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">Book Now</button>
//           </div>
//         </div>

//         <h2 className="text-2xl font-semibold mt-16 mb-6">Customer Reviews</h2>

//         <div className="space-y-4">
//           <div className="bg-gray-900 text-white p-4 rounded-md flex items-start gap-4">
//             <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Ivy" className="w-12 h-12 rounded-full object-cover" />
//             <div>
//               <h3 className="text-yellow-400 font-bold">Ivy Madrid Tumblod</h3>
//               <p>thank you po sa team nyo super maaasahan pretty ang mga dress, thank you so guro ganda ko na wedding gown thank you thank you</p>
//             </div>
//           </div>

//           <div className="bg-gray-900 text-white p-4 rounded-md flex items-start gap-4">
//             <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Lyka" className="w-12 h-12 rounded-full object-cover" />
//             <div>
//               <h3 className="text-yellow-400 font-bold">Lyka Padera - Esguerra</h3>
//               <p>it was worth it! I almost didn’t do anything yet I was really satisfied with everything! (yes, ganung level an kahassle-free) Thank you,</p>
//             </div>
//           </div>

//           <div className="bg-gray-900 text-white p-4 rounded-md flex items-start gap-4">
//             <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="Ann" className="w-12 h-12 rounded-full object-cover" />
//             <div>
//               <h3 className="text-yellow-400 font-bold">Ann Aganan Salvacion</h3>
//               <p>Momsh is all in one. As in hassle free/bridezilla free wedding. From the very start up to the last detail very hands on si mamshie. Never kang papabayaan.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeddingEvent;
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust if you're using sessionStorage

    axios.get(`http://localhost:8080/api/events/${id}`, {
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
  }, [id]);

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
