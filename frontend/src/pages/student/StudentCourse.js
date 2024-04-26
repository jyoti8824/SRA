import React from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

const StudentCourse = () => {
    const [ getcourses, setCourses ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios.get( 'http://localhost:5000/allcourses' );
                setCourses( response.data );
                setLoading( false ); // Set loading state to false after data is fetched

            } catch ( error ) {
                console.error( 'Error fetching data:', error );
            }
        };
        fetchData();
    },
    );

    return (
        <Container maxWidth="lg" sx={ { mt: 4, mb: 4 } }>
            <h3 style={ { fontSize: '25px', marginTop: '20px', marginBottom: '10px', textAlign: "center" } }> All Courses </h3>

            <Grid container spacing={ 7 } pt={ 4 }>


                { loading ? (
                    <p>Loading...</p>
                ) : (
                    getcourses.map( course => (
                        <Grid key={ course._id } item xs={ 12 } md={ 4 } lg={ 4 }> {/* Grid item */ }
                            <div>
                                <h1 >Course Name: { course.coursetitle }</h1>
                                <p>Course Detail: { course.coursedetails }</p>
                                <p>Course Price: { course.price }</p>
                                <p>Course percentage : { course.percentage }</p>
                            </div>
                        </Grid>
                    ) )
                ) }

            </Grid>


        </Container>
    );
};

export default StudentCourse;