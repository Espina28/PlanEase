import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div>
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-blue-500 font-bold text-xl">
            Event<span className="text-gray-700">Ease</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="#" className="text-gray-600 hover:text-blue-500">
            ABOUT
          </Link>
          <Link to="#" className="text-gray-600 hover:text-blue-500">
            SERVICES
          </Link>
          <Link to="#" className="text-gray-600 hover:text-blue-500">
            FEATURES
          </Link>
          <Link to="#" className="text-gray-600 hover:text-blue-500">
            CONTACT
          </Link>
        </nav>
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
        >
          Sign Up For Free
        </Link>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-gray-500 mb-2">EVENT PLANNING MADE EASY WITH</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 mb-4">
              SEAMLESS EVENT & <br />
              SERVICE BOOKING
            </h1>
            <p className="text-gray-600 mb-6 max-w-lg">
              Plan your next corporate event or family function with ease. Our platform connects you with the best
              service providers in your area, ensuring a hassle-free experience from start to finish.
            </p>
            <Link
              to="#"
              className="bg-blue-500 text-white px-6 py-3 rounded-full text-sm hover:bg-blue-600 transition-colors inline-block"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Event planning illustration"
              className="max-w-full h-auto"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-500 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">EFFORTLESS PLANNING, SEAMLESS EXECUTION</h2>
              <p className="mb-6">
                We'll help you with your event planning without the stress. From venue selection to catering and
                entertainment, our platform connects you with trusted service providers in a simple, intuitive
                interface. Our comprehensive dashboard lets you monitor progress, allowing you to stay in the loop at
                all times, and ensuring your event goes off without a hitch.
              </p>
              <Link
                to="#"
                className="bg-white text-blue-500 px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <img src="https://via.placeholder.com/400x300" alt="Event planning team" className="max-w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-gray-500 mb-2">WHAT WE OFFER</h3>
          <h2 className="text-2xl font-bold mb-12">KEY FEATURES OF EVENTEASE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Wide Selection of Professional Services</h3>
              <p className="text-gray-600">Access to vetted professionals for all your event needs</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-blue-500 text-white">
              <h3 className="font-bold mb-2">Easy Booking and Real-time Updates</h3>
              <p>Seamless scheduling with instant confirmations</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Event Planning with Trusted Consultants</h3>
              <p className="text-gray-600">Expert guidance throughout your planning journey</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Hassle-Free Cancellations</h3>
              <p className="text-gray-600">Flexible policies to accommodate changes</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-gray-500 mb-2">MEET THE TEAM</h3>
          <h2 className="text-2xl font-bold mb-12">OUR TEAM MEMBERS</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((member) => (
              <div key={member} className="text-center">
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/200?text=Member+${member}`}
                    alt={`Team Member ${member}`}
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="font-bold">Member {member}</h3>
                <p className="text-gray-500 text-sm">Position</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer will be imported separately */}
    </div>
  )
}

