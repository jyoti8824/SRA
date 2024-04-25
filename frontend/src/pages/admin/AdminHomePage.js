import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import axios from 'axios';



const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector( ( state ) => state.student );
    const { sclassesList } = useSelector( ( state ) => state.sclass );
    const { teachersList } = useSelector( ( state ) => state.teacher );
    const [ getcourses, setCourses ] = useState( [] );
    const [ loading, setLoading ] = useState( true );


    const { currentUser } = useSelector( state => state.user );

    const adminID = currentUser._id;

    useEffect( () => {
        dispatch( getAllStudents( adminID ) );
        dispatch( getAllSclasses( adminID, "Sclass" ) );
        dispatch( getAllTeachers( adminID ) );
        const fetchData = async () => {
            try {
                const response = await axios.get( 'http://localhost:5000/allcourses' );
                // Set the fetched courses in state
                setCourses( response.data );
                setLoading( false ); // Set loading state to false after data is fetched
            } catch ( error ) {
                console.error( 'Error fetching data:', error );
                setLoading( false ); // Set loading state to false in case of error
            }
        };
        fetchData();

    },

        [ adminID, dispatch ] );

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <>
            <Container maxWidth="lg" sx={ { mt: 4, mb: 4 } }>
                <h3 style={ { fontSize: '30px', marginBottom: '40px', textAlign: "center" } }> <span>{ currentUser.schoolName }</span> School </h3>

                <Grid container spacing={ 3 }>
                    <Grid item xs={ 12 } md={ 4 } lg={ 4 }>
                        <StyledPaper>
                            <img src={ Students } alt="Students" />
                            <Title>
                                Total Students
                            </Title>
                            <Data start={ 0 } end={ numberOfStudents } duration={ 2.5 } />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={ 12 } md={ 4 } lg={ 4 }>
                        <StyledPaper>
                            <img src={ Classes } alt="Classes" />
                            <Title>
                                Total Classes
                            </Title>
                            <Data start={ 0 } end={ numberOfClasses } duration={ 5 } />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={ 12 } md={ 4 } lg={ 4 }>
                        <StyledPaper>
                            <img src={ Teachers } alt="Teachers" />
                            <Title>
                                Total Teachers
                            </Title>
                            <Data start={ 0 } end={ numberOfTeachers } duration={ 2.5 } />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                        <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
                <h3 style={ { fontSize: '25px', marginTop: '20px', marginBottom: '10px', textAlign: "center" } }> All Courses </h3>

                <Grid container spacing={ 7 } pt={ 4 }>


                    { loading ? (
                        <p>Loading...</p>
                    ) : (
                        getcourses.map( course => (
                            <Grid key={ course._id } sx={ { pt: 2 } } spacing={ 2 } item xs={ 12 } md={ 3 } lg={ 3 }> {/* Grid item */ }
                                <StyledPaper>
                                    <Title >{ course.coursetitle }</Title>
                                    <p>{ course.coursedetails }</p>
                                    <Data end={ course.price } duration={ 2.5 }></Data>
                                </StyledPaper>
                            </Grid>
                        ) )
                    ) }

                </Grid>
            </Container>
        </>
    );
};


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

export default AdminHomePage;