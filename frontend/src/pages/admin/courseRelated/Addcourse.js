import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';
import axios from 'axios';

const AddCourse = () => {
    const navigate = useNavigate();

    const [ coursetitle, setCourseTitle ] = useState( '' );
    const [ coursedetails, setCourseDetails ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ courseImageLink, setCourseimagelink ] = useState( '' );
    const [ courselink, setCourselink ] = useState( '' );

    const [ percentage, setPercentage ] = useState( '' );
    const [ loader, setLoader ] = useState( false );
    const [ showPopup, setShowPopup ] = useState( false );
    const [ message, setMessage ] = useState( "" );

    const submitHandler = async ( event ) => {
        event.preventDefault();
        setLoader( true );

        try {
            const response = await axios.post( "http://localhost:5000/addcourse", {
                coursetitle,
                coursedetails,
                price,
                percentage,
                courseImageLink,
                courselink
            } );

            if ( response.status === 200 ) {
                // Handle successful response, e.g., redirect
                navigate( '/Admin/addcourse' );
                setCourseTitle( '' );
                setCourseDetails( '' );
                setPrice( '' );
            } else {
                throw new Error( 'Network Error' );
            }
        } catch ( error ) {
            // Handle error
            setLoader( false );
        }
    };

    return (
        <>
            <div className="register">
                <form className="registerForm" onSubmit={ submitHandler }>
                    <span className="registerTitle">Add Course</span>
                    <label>Course Title</label>
                    <input className="registerInput" type="text" placeholder="Enter course title..."
                        value={ coursetitle }
                        onChange={ ( event ) => setCourseTitle( event.target.value ) }
                        required />

                    <label>Course Details</label>
                    <input className="registerInput" type="text" placeholder="Enter Course details..."
                        value={ coursedetails }
                        onChange={ ( event ) => setCourseDetails( event.target.value ) }
                        required />

                    <label>Price</label>
                    <input className="registerInput" type="number" placeholder="Enter course Price..."
                        value={ price }
                        onChange={ ( event ) => setPrice( event.target.value ) }
                        required />
                    <label>Percentage</label>
                    <input className="registerInput" type="number" placeholder="Enter Percentage..."
                        value={ percentage }
                        onChange={ ( event ) => setPercentage( event.target.value ) }
                        required />

                    <label>Course Image Link</label>
                    <input className="registerInput" type="text" placeholder="Enter Course Image link ..."
                        value={ courseImageLink }
                        onChange={ ( event ) => setCourseimagelink( event.target.value ) }
                        required />



                    <label>Course Link</label>
                    <input className="registerInput" type="text" placeholder="Enter Course Link..."
                        value={ courselink }
                        onChange={ ( event ) => setCourselink( event.target.value ) }
                        required />

                    <button className="registerButton" type="submit" disabled={ loader }>
                        { loader ? (
                            <CircularProgress size={ 24 } color="inherit" />
                        ) : (
                            'Add'
                        ) }
                    </button>
                </form>
            </div>
            <Popup message={ message } setShowPopup={ setShowPopup } showPopup={ showPopup } />
        </>
    );
};

export default AddCourse;
