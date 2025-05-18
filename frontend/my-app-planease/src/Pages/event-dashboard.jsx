// import Wedding from '../assets/Wedding.jpg';
// import CompanyEvent from '../assets/CompanyEvent.jpg';
// import Birthday from '../assets/Birthday.jpg';
// import Debut from '../assets/Debut.jpg';
// import Pageant from '../assets/Pageant.jpg';
// import Rose from '../assets/Rose.png';
// import Tulip from '../assets/Tulip.jpg';
// import CherryBlossom from '../assets/Bloom.jpg';
// import FindTrustedProfessionals from '../assets/FindTrustedProfessionals.jpg';

// const EventPage = () => {
//   const services = [
//     { name: 'Wedding', img: Wedding },
//     { name: 'Company Event', img: CompanyEvent },
//     { name: 'Birthday', img: Birthday },
//     { name: 'Birthday Debut', img: Debut },
//     { name: 'Pageant', img: Pageant },
//   ];

//   const weddingPackages = [
//     { name: 'Rose', img: Rose, price: '₱350k', description: 'Catering, Decorations, Bridal Entourage, 2 Tier Wedding Cake, Wine for toasting...' },
//     { name: 'Tulip', img: Tulip, price: '₱450k', description: 'Catering, Decorations, 4-tier Wedding Cake and Cupcakes, 1 Lechon, Dessert station ...' },
//     { name: 'Cherry Blossom', img: CherryBlossom, price: '₱300k', description: 'Catering, Decorations, 3-tier Wedding Cake, Professional Host, Photobooth...' },
//   ];

//   return (
//     <div className="flex flex-col gap-10 p-10">
//       {/* Hero Section */}
//       <section
//         className="bg-cover bg-center h-80 flex items-center justify-left text-white text-5xl font-bold pl-10"
//         style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${FindTrustedProfessionals})` }}
//         >
//         <div>
//             <div>FIND TRUSTED PROFESSIONALS</div>
//             <div className="text-3xl mt-2">For your events</div>
//         </div>
//         </section>

      

//       {/* Services Section */}
//        <section className="flex items-center justify-between mb-5">
//         <h2 className="text-3xl font-semibold text-gray-700">Find the Best Service for your Needs</h2>
//         <button className="text-black px-5 py-2 rounded-lg hover:text-gray-600 border-b-2 border-transparent hover:border-gray-600">
//           View All
//         </button>
//       </section>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
//         {services.map((service) => (
//           <div key={service.name} className="shadow-lg rounded-lg overflow-hidden text-center">
//             <img src={service.img} alt={service.name} className="h-52 w-full object-cover rounded-lg" />
//             <div className="p-5">
//               <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
//               <p>Trusted experts to bring your dream event to life.</p>
//               <button className="mt-3 bg-black text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800">
//                 See more
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Wedding Packages Section */}
//       <section className="text-center">
//         <h3 className="text-xl font-medium text-orange-500 mb-2">WE OFFER</h3>
//         <h2 className="text-4xl font-bold mb-10">WEDDING PACKAGES</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {weddingPackages.map((packageItem) => (
//             <div key={packageItem.name} className="border rounded-lg p-5 shadow-lg text-center h-130">
//               <img src={packageItem.img} alt={packageItem.name} className="h-40 w-40 object-cover mb-3 rounded-full mx-auto" />
//               <h3 className="text-2xl font-semibold mb-2">{packageItem.name}</h3>
//               <p className="text-xl text-gray-500 mb-3">{packageItem.price}</p>
//               <p>{packageItem.description}</p>
//               <button className="mt-3 bg-black text-white px-4 py-2 rounded-lg">
//                 BOOK AN EVENT TO SEE MORE
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default EventPage;
// ""
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import FindTrustedProfessionals from '../assets/FindTrustedProfessionals.jpg'; // Hero image

// const EventPage = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/events') // Adjust port if different
//       .then(response => {
//         setEvents(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching events:', error);
//       });
//   }, []);

//   return (
//     <div className="flex flex-col gap-10 p-10">
//       {/* Hero Section */}
//       <section
//         className="bg-cover bg-center h-80 flex items-center justify-left text-white text-5xl font-bold pl-10"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${FindTrustedProfessionals})`
//         }}
//       >
//         <div>
//           <div>FIND TRUSTED PROFESSIONALS</div>
//           <div className="text-3xl mt-2">For your events</div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="flex items-center justify-between mb-5">
//         <h2 className="text-3xl font-semibold text-gray-700">Find the Best Service for your Needs</h2>
//         <button className="text-black px-5 py-2 rounded-lg hover:text-gray-600 border-b-2 border-transparent hover:border-gray-600">
//           View All
//         </button>
//       </section>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
//         {events.map((event) => (
//           <div key={event.id} className="shadow-lg rounded-lg overflow-hidden text-center">
//             {/* Optional: You can assign images dynamically if they’re returned by backend */}
//             <div className="h-52 w-full bg-gray-200 flex items-center justify-center text-xl font-bold">
//               {event.name}
//             </div>
//             <div className="p-5">
//               <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
//               <p>{event.description}</p>
//               <p className="text-gray-600 font-medium mt-2">₱{event.price.toLocaleString()}</p>
//               <button className="mt-3 bg-black text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800">
//                 See more
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventPage;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FindTrustedProfessionals from '../assets/FindTrustedProfessionals.jpg'; // Hero image

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')

  axios.get('http://localhost:8080/api/events/getEvents', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then(response => {
    setEvents(response.data);
  })
  .catch(error => {
    console.error('Error fetching events:', error);
  });
}, []);


  return (
    <div className="flex flex-col gap-10 p-10">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-80 flex items-center justify-left text-white text-5xl font-bold pl-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${FindTrustedProfessionals})`
        }}
      >
        <div>
          <div>FIND TRUSTED PROFESSIONALS</div>
          <div className="text-3xl mt-2">For your events</div>
        </div>
      </section>

      {/* Services Section */}
      <section className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-semibold text-gray-700">Find the Best Service for your Needs</h2>
        {/* <button className="text-black px-5 py-2 rounded-lg hover:text-gray-600 border-b-2 border-transparent hover:border-gray-600">
          View All
        </button> */}
      </section>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {events.map((event) => (
            <div key={event.id} className="shadow-lg rounded-lg overflow-hidden text-center">
                <div className="h-52 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {event.event_image ? (
                    <img
                      src={event.event_image}
                      alt={event.event_name || 'Event Image'}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold">No Image</span>
                  )}
                </div>
                <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{event.event_name || 'Untitled Event'}</h3>
                <p>{event.event_description || 'No description available.'}</p>
                <p className="text-gray-600 font-medium mt-2">
                    {event.event_price != null ? `₱${event.event_price.toLocaleString()}` : 'Price not available'}
                </p>
                {!event.event_isAvailable ? (
                    <button
                    className="mt-3 bg-gray-400 text-white w-full px-4 py-2 rounded-lg cursor-not-allowed"
                    disabled
                    >
                    Unavailable
                    </button>
                ) : (
                    <Link to={`/event/${event.id}`}>
                    <button className="mt-3 bg-black text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800">
                        See more
                    </button>
                    </Link>
                )}
                </div>
            </div>
            ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
  {events.map((event) => (
    <div
      key={event.id}
      className="shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
    >
      {/* Image section */}
      <div className="h-52 w-full bg-gray-200 flex items-center justify-center">
        {event.event_image ? (
          <img
            src={event.event_image}
            alt={event.event_name || 'Event Image'}
            className="object-cover h-full w-full"
          />
        ) : (
          <span className="text-xl font-bold">No Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 text-center">
        <h3 className="text-xl font-semibold mb-2">{event.event_name || 'Untitled Event'}</h3>
        <p className="text-gray-600 mb-2 flex-1">{event.event_description || 'No description available.'}</p>
        <p className="text-gray-700 font-medium mb-4">
          {event.event_price != null ? `₱${event.event_price.toLocaleString()}` : 'Price not available'}
        </p>

        {/* Button */}
        {!event.event_isAvailable ? (
          <button
            className="bg-gray-400 text-white w-full px-4 py-2 rounded-lg cursor-not-allowed mt-auto"
            disabled
          >
            Unavailable
          </button>
        ) : (
          <Link to={`/event/${event.id}`} className="mt-auto">
            <button className="bg-black text-white w-full px-4 py-2 rounded-lg hover:bg-gray-800">
              See more
            </button>
          </Link>
        )}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default EventPage;