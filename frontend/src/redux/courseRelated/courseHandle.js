import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './courseSlice';

export const getAllCourses = ( id, address ) => async ( dispatch ) => {
    dispatch( getRequest() );

    try {
        const result = await axios.get( `${process.env.REACT_APP_BASE_URL}/${address}List/${id}` );
        if ( result.data.message ) {
            dispatch( getFailed( result.data.message ) );
        } else {
            dispatch( getSuccess( result.data ) );
        }
    } catch ( error ) {
        dispatch( getError( error ) );
    }
};