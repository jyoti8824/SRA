import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Popup from "../../../components/Popup";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
} from "@mui/material";

const AddCourse = () => {
  const navigate = useNavigate();

  const [coursetitle, setCourseTitle] = useState("");
  const [coursedetails, setCourseDetails] = useState("");
  const [price, setPrice] = useState("");
  const [courseImageLink, setCourseimagelink] = useState("");
  const [courselink, setCourselink] = useState("");

  const [percentage, setPercentage] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoader(true);

    try {
      const response = await axios.post("http://localhost:5000/addcourse", {
        coursetitle,
        coursedetails,
        price,
        percentage,
        courseImageLink,
        courselink,
      });

      if (response.status >= 200 && response.status < 300) {
        // Redirect user to admin home page
        navigate("/");

        // Reset form fields
        setCourseTitle("");
        setCourseDetails("");
        setPrice("");
        setPercentage("");
        setCourseimagelink("");
        setCourselink("");

        // Optionally, display a success message
        setMessage("Course added successfully");
      } else {
        throw new Error("Network Error");
      }
    } catch (error) {
      // Handle error
      setMessage("An error occurred. Please try again.");
    } finally {
      // Reset loader state
      setLoader(false);
    }
  };

  return (
    <>
      <div className='register'>
        <Box
          sx={{
            my: 10,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            p: 10,
            width: "90%",
            maxWidth: "600px",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <form className='registerForm' onSubmit={submitHandler}>
            <span className='registerTitle'>Add Course</span>
            <label>Course Title</label>
            <input
              className='registerInput'
              type='text'
              placeholder='Enter course title...'
              value={coursetitle}
              onChange={(event) => setCourseTitle(event.target.value)}
              required
            />

            <label>Course Details</label>
            <input
              className='registerInput'
              type='text'
              placeholder='Enter Course details...'
              value={coursedetails}
              onChange={(event) => setCourseDetails(event.target.value)}
              required
            />

            <label>Price</label>
            <input
              className='registerInput'
              type='text'
              placeholder='Enter course Price...'
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
            <label>Percentage</label>
            <input
              className='registerInput'
              type='number'
              placeholder='Enter Percentage...'
              value={percentage}
              onChange={(event) => setPercentage(event.target.value)}
              required
            />

            <label>Course Image Link</label>
            <input
              className='registerInput'
              type='text'
              placeholder='Enter Course Image link ...'
              value={courseImageLink}
              onChange={(event) => setCourseimagelink(event.target.value)}
              required
            />

            <label>Course Link</label>
            <input
              className='registerInput'
              type='text'
              placeholder='Enter Course Link...'
              value={courselink}
              onChange={(event) => setCourselink(event.target.value)}
              required
            />

            <button className='registerButton' type='submit' disabled={loader}>
              {loader ? <CircularProgress size={24} color='inherit' /> : "Add"}
            </button>
          </form>
        </Box>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddCourse;
