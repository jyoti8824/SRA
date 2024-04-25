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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { useSelector } from "react-redux";

const TeacherSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const sclassName = currentUser.teachSclass;

  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to='/'>
          <ListItemIcon>
            <HomeIcon
              sx={{
                color:
                  location.pathname === "/" ||
                  location.pathname === "/Teacher/dashbaord"
                    ? "#cfa406"
                    : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItemButton>
        <ListItemButton component={Link} to='/Teacher/class'>
          <ListItemIcon>
            <ClassOutlinedIcon
              sx={{
                color:
                  location.pathname === "/class" ||
                  location.pathname === "/Teacher/class"
                    ? "#cfa406"
                    : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary={`Class ${sclassName.sclassName}`} />
        </ListItemButton>
        <ListItemButton component={Link} to='/Teacher/complain'>
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              sx={{
                color:
                  location.pathname === "/complain" ||
                  location.pathname === "/Teacher/complain"
                    ? "#cfa406"
                    : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary='Complain' />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component='div' inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to='/Teacher/profile'>
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              sx={{
                color:
                  location.pathname === "/profile" ||
                  location.pathname === "/Teacher/profile"
                    ? "#cfa406"
                    : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItemButton>
        <ListItemButton component={Link} to='/logout'>
          <ListItemIcon>
            <ExitToAppIcon
              sx={{
                color:
                  location.pathname === "/logout" ||
                  location.pathname === "/Teacher/logout"
                    ? "#cfa406"
                    : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default TeacherSideBar;
