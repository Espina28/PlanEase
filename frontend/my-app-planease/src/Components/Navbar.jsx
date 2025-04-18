import { Link, NavLink } from "react-router-dom";
import { Bell, CreditCard, FileText, LayoutDashboard } from "lucide-react";
import { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { AppBar, Box } from "@mui/material";

const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // Single state for drawer open/close
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

  // Drawer content
  const drawerContent = (
    <nav className="flex flex-col space-y-4">
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
      </NavLink>
    </nav>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="border-b border-gray-200 shadow-sm" 
       style={{
        zIndex: 1100,         // Places nav above Drawer (which defaults to 1200–1300)
        position: 'relative',    // Required for zIndex to take effect
        top: 0,               // Pins to top of the screen
        left: 0,
        width: '100%',
        backgroundColor: '#fff', // Optional: ensures nav isn't transparent
      }}>
        <div className=" my-container text-center mx-5 px-6 py-3">
          <div className="my-div-1 flex justify-between">
            {/* Hamburger button */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    display: { xs: 'block', md: 'block', lg: 'none' }, // Show on mobile & tablet
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
                      keepMounted: true, // Better open performance on mobile.
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
              <Link to="/profile">
                <img
                  src="/assets/image-profile.jpg"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  style={{ zIndex: 1500 }} // Ensure it stays above the drawer
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;