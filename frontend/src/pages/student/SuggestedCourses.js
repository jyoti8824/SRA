import React from "react";
import { Container, Grid, Paper, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import StudentContext from "./StudentContext";
import { Link } from 'react-router-dom';



function SuggestedCourses() {
  const dispatch = useDispatch();
  const [ getcourses, setCourses ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ filteredCourses, setFilteredCourses ] = useState( null );
  const { currentUser } = useSelector( ( state ) => state.user );
  const adminID = currentUser._id;
  const { studentScore } = useContext( StudentContext );
  console.log( getcourses );
  const trimFilteredCourses = ( courses ) => {
    return courses.slice( 0, 10 ); // Trim the array to maximum 4 elements
  };


  useEffect( () => {
    if ( studentScore !== 0 ) {
      const filteredCoursesList = getcourses.filter(
        ( course ) => course.percentage <= studentScore && studentScore - 10 <= course.percentage
      );
      setFilteredCourses( ( prevCourses ) => ( filteredCoursesList ) );
      console.log( filteredCourses );
    }

  }, [ studentScore, getcourses ] );

  useEffect( () => {

    const fetchData = async () => {
      try {
        const response = await axios.get( "http://localhost:5000/allcourses" );
        // Set the fetched courses in state
        setCourses( response.data );
        setLoading( false ); // Set loading state to false after data is fetched
      } catch ( error ) {
        console.error( "Error fetching data:", error );
        setLoading( false ); // Set loading state to false in case of error
      }
    };
    fetchData();

  }, [ adminID, dispatch ] );


  return (
    <Container>
      <h3
        style={ {
          fontSize: "25px",
          marginTop: "20px",
          marginBottom: "10px",
          textAlign: "center",
        } }
      >
        Suggested Courses
      </h3>


      <Card sx={ { maxWidth: 300, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }>
        { loading ? (
          <p>Loading...</p>
        ) : (
          filteredCourses?.map( ( course ) => (
            <div>
              <CardMedia
                key={ course._id }
                component="img"
                height="200"
                image={ course.courseImageLink }
                alt="Course Image"
                sx={ { objectFit: 'cover' } }
              />
              <CardContent>
                <Typography variant="h5" component="div" sx={ { marginBottom: 2 } }>
                  { course.coursetitle }
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={ { marginBottom: 2 } }>
                  { course.coursedetails }
                </Typography>
                <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                  <Typography variant="h6" component="div" sx={ { color: '#007BFF' } }>
                    { course.price }
                  </Typography>
                  <Button variant="contained" sx={ { backgroundColor: '#007BFF', color: '#fff' } }>
                    <Link to={ course.courselink }>Get Course</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          ) )
        ) }
      </Card>
    </Container>
  );
}

const StyledPaper = styled( Paper )`
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

const Data = styled( CountUp )`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default SuggestedCourses;
