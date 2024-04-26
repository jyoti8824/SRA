import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function SuggestedCourses() {
  const dispatch = useDispatch();
  const [getcourses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allcourses");
        // Set the fetched courses in state
        setCourses(response.data);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false in case of error
      }
    };
    fetchData();
  }, [adminID, dispatch]);

  console.log(getcourses)

  return (
    <div> 
      <h3
        style={{
          fontSize: "25px",
          marginTop: "20px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Suggested Courses
      </h3>

      <Grid container spacing={3} pt={4} p={5}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          getcourses.map((course) => (
            <Grid
              key={course._id}
              sx={{ pt: 2 }}
              spacing={2}
              item
              xs={12}
              md={3}
              lg={3}
            >
              {" "}
              {/* Grid item */}
              <StyledPaper>
                <Title>{course.coursetitle}</Title>
                <p>{course.coursedetails}</p>
                <Data end={course.price} duration={2.5}></Data>
              </StyledPaper>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default SuggestedCourses;
