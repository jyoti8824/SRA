import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={ Link } to="/">
                    <ListItemIcon>
                        <HomeIcon sx={ {
                            color:
                                location.pathname === "/" ||
                                    location.pathname === "/Student/dashboard"
                                    ? "#cfa406"
                                    : "inherit",
                        } } />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={ Link } to="/Student/subjects">
                    <ListItemIcon>
                        <AssignmentIcon sx={ {
                            color:
                                location.pathname === "/subjects" ||
                                    location.pathname === "/Student/subjects"
                                    ? "#cfa406"
                                    : "inherit",
                        } } />
                    </ListItemIcon>
                    <ListItemText primary="Grade Card" />
                </ListItemButton>
                <ListItemButton component={ Link } to="/Student/attendance">
                    <ListItemIcon>
                        <ClassOutlinedIcon sx={ {
                            color:
                                location.pathname === "/attendance" ||
                                    location.pathname === "/Student/attendance"
                                    ? "#cfa406"
                                    : "inherit",
                        } } />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={ Link } to="/Student/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon sx={ {
                            color:
                                location.pathname === "/complain" ||
                                    location.pathname === "/Student/complain"
                                    ? "#cfa406"
                                    : "inherit",
                        } } />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={ { my: 1 } } />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={ Link } to="/Student/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon sx={ {
                            color:
                                location.pathname === "/profile" ||
                                    location.pathname === "/Student/profile"
                                    ? "#cfa406"
                                    : "inherit",
                        } } />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={ Link } to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon sx={ {
                            color:
                                location.pathname === "/logout" ||
                                    location.pathname === "/Student/logout"
                                    ? "#cfa406"
                                    : "inherit",
                        } } />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    );
};

export default StudentSideBar;