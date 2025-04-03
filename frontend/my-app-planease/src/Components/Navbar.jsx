import { Link } from "react-router-dom"
import { Bell } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-medium">
            Event<span className="text-blue-500">Ease</span>
          </Link>

          {/* Right side - notifications and profile */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-500">
              <Bell size={20} />
            </button>
            <Link to="/profile">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-gray-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

