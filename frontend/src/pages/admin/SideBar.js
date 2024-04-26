import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={ Link } to='/'>
          <ListItemIcon>
            <HomeIcon
              sx={ {
                color:
                  location.pathname === "/" ||
                    location.pathname === "/Admin/dashboard"
                    ? "#cfa406"
                    : "inherit",
              } }
            />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/Admin/classes'>
          <ListItemIcon>
            <ClassOutlinedIcon
              sx={ {
                color:
                  location.pathname === "/classes" ||
                    location.pathname === "/Admin/classes"
                    ? "#cfa406"
                    : "inherit",
              } }

            />
          </ListItemIcon>
          <ListItemText primary='Classes' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/Admin/subjects'>
          <ListItemIcon>
            <AssignmentIcon
              sx={ {
                color:
                  location.pathname === "/subjects" ||
                    location.pathname === "/Admin/subjects"
                    ? "#cfa406"
                    : "inherit",
              } }

            />
          </ListItemIcon>
          <ListItemText primary='Subjects' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/Admin/teachers'>
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon
              sx={ {
                color:
                  location.pathname === "/teachers" ||
                    location.pathname === "/Admin/teachers"
                    ? "#cfa406"
                    : "inherit",
              } }

            />
          </ListItemIcon>
          <ListItemText primary='Teachers' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/Admin/students'>
          <ListItemIcon>
            <PersonOutlineIcon
              sx={ {
                color:
                  location.pathname === "/students" ||
                    location.pathname === "/Admin/students"
                    ? "#cfa406"
                    : "inherit",
              } }
            />
          </ListItemIcon>
          <ListItemText primary='Students' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/Admin/notices'>
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              sx={ {
                color:
                  location.pathname === "/notices" ||
                    location.pathname === "/Admin/notices"
                    ? "#cfa406"
                    : "inherit",
              } }
            />
          </ListItemIcon>
          <ListItemText primary='Notices' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/Admin/addcourse'>
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              sx={ {
                color:
                  location.pathname === "/course" ||
                    location.pathname === "/Admin/addcourse"
                    ? "#cfa406"
                    : "inherit",
              } }
            />
          </ListItemIcon>
          <ListItemText primary='Add Course' />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={ { my: 1 } } />
      <React.Fragment>
        <ListSubheader component='div' inset>
          User
        </ListSubheader>
        <ListItemButton component={ Link } to='/Admin/profile'>
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              sx={ {
                color:
                  location.pathname === "/profile" ||
                    location.pathname === "/Admin/profile"
                    ? "#cfa406"
                    : "inherit",
              } }
            />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItemButton>
        <ListItemButton component={ Link } to='/logout'>
          <ListItemIcon>
            <ExitToAppIcon
              sx={ {
                color:
                  location.pathname === "/logout" ||
                    location.pathname === "/Admin/logout"
                    ? "#cfa406"
                    : "inherit",
              } }
            />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
// export default SideBar;
