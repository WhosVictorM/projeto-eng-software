import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ReorderIcon from '@mui/icons-material/Reorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { handleLogout }from '../Dashboard/MainMenu';

export const SidebarData = (navigate) => [
    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        link: "/profile"
    }, 
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/dashboard"
    },  
    {
        title: "About Us",
        icon: <InfoIcon />,
        link: "/aboutus"
    }, 
    {
        title: "Logout",
        icon: <ExitToAppIcon />,
        action: handleLogout(navigate)
    }
   

] 