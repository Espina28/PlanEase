"use client"

import { useState } from "react"
import { Bell, LogOut, User } from "lucide-react"
import { ProfileModal } from "./profile-modal"
import { useAuth } from "./AuthProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout()
     navigate("/")
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  const openProfileModal = () => {
    setProfileModalOpen(true)
    setProfileDropdownOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <nav
        className="border-b border-gray-200 shadow-sm"
        style={{
          zIndex: 1100,
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <div className="my-container text-center mx-5 px-6 py-3">
          <div className="my-div-1 flex justify-between">
            {/* Logo - now positioned on the left */}
            <a href="/" className="text-xl font-medium">
              Event<span className="text-blue-500">Ease</span>
            </a>

            {/* Right side - notifications and profile */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-500">
                <Bell size={20} />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button onClick={toggleProfileDropdown} className="focus:outline-none">
                  <img
                    src="/assets/image-profile.jpg"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  />
                </button>

                {/* Dropdown menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={openProfileModal}
                    >
                      <User size={16} className="mr-2" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />
    </>
  )
}

export default Navbar
