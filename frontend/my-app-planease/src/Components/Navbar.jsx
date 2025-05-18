"use client"

import { useState, useEffect } from "react"
import { Bell, LogOut, User } from "lucide-react"
import { ProfileModal } from "./profile-modal"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_BASE_URL = "http://localhost:8080"

// Create a custom event for profile updates
export const PROFILE_UPDATED_EVENT = "profileUpdated"

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: null,
  })
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      const { data } = await axios.get(`${API_BASE_URL}/user/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setUser({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
        profilePicture: data.profilePicture || null,
      })
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      setLoading(false)
    }
  }

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData()
  }, [])

  // Listen for profile update events
  useEffect(() => {
    // Create event listener for profile updates
    const handleProfileUpdate = (event) => {
      // If the event includes updated profile data, use it directly
      if (event.detail && event.detail.profilePicture) {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: event.detail.profilePicture,
        }))
      } else {
        // Otherwise refetch the user data
        fetchUserData()
      }
    }

    // Add event listener
    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate)

    // Clean up
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate)
    }
  }, [])

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

  // Get user's first initial for avatar fallback
  const getInitial = () => {
    return user.firstname ? user.firstname.charAt(0).toUpperCase() : "U"
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
              Event<span className="text-amber-500">Ease</span>
            </a>

            {/* Right side - notifications and profile */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-500">
                <Bell size={20} />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button onClick={toggleProfileDropdown} className="focus:outline-none">
                  {loading ? (
                    <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  ) : user.profilePicture ? (
                    <img
                      src={user.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {getInitial()}
                    </div>
                  )}
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
