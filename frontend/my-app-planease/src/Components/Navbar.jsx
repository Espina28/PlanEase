import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, CreditCard, FileText, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useAuth } from "./AuthProvider";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Navigate to home or login page after logout
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Drawer content
  const drawerContent = (
    <nav className="flex flex-col space-y-4 p-4">
      <NavLink
        to="/subcontractor/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition 
          ${isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`
        }
      >
        <LayoutDashboard size={20} />
        Dashboard
      </NavLink>

      <NavLink
        to="/subcontractor/transactions"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition 
          ${isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`
        }
      >
        <CreditCard size={20} />
        Transaction
      </NavLink>

      <NavLink
        to="/showcase"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition 
          ${isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`
        }
      >
        <FileText size={20} />
        Showcase
      </NavLink>\



    </nav>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="border-b border-gray-200 shadow-sm" 
       style={{
        zIndex: 1100,
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
      }}>
        <div className="my-container text-center mx-5 px-6 py-3">
          <div className="my-div-1 flex justify-between">
            {/* Hamburger button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: 'block', md: 'block', lg: 'none' },
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Drawer for mobile */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              sx={{
                display: { xs: 'block', sm: 'block', lg: 'none', padding: 'p-5' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              slotProps={{
                root: {
                  keepMounted: true,
                },
              }}
            >
              {drawerContent}
            </Drawer>

            {/* Logo */}
            <Link to="/" className="text-xl font-medium">
              Event<span className="text-blue-500">Ease</span>
            </Link>

            {/* Right side - notifications and profile */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-500">
                <Bell size={20} />
              </button>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="focus:outline-none"
                >
                  <img
                    src="/assets/image-profile.jpg"
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  />
                </button>
                
                {/* Dropdown menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile Settings
                    </Link>
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
    </>
  );
};

export default Navbar;
