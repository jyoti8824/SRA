import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

const AddCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, response, error } = useSelector( state => state.user );
    const { currentUser } = useSelector( state => state.user );

    const [ coursetitle, setCourseTitle ] = useState( '' );
    const [ coursedetails, setCourseDetails ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const adminID = currentUser._id;

    const [ loader, setLoader ] = useState( false );
    const [ showPopup, setShowPopup ] = useState( false );
    const [ message, setMessage ] = useState( "" );

    const fields = { coursetitle, coursedetails, price, adminID };
    const address = "Course";

    const submitHandler = ( event ) => {
        event.preventDefault();
        setLoader( true );
        dispatch( addStuff( fields, address ) );
    };

    useEffect( () => {
        if ( status === 'added' ) {
            navigate( '/Admin/addcourse' );
            dispatch( underControl() );
        } else if ( status === 'error' ) {
            setMessage( "Network Error" );
            setShowPopup( true );
            setLoader( false );
        }
    }, [ status, navigate, error, response, dispatch ] );

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
                    <input className="registerInput" type="number" placeholder="Enter Price..."
                        value={ price }
                        onChange={ ( event ) => setPrice( event.target.value ) }
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