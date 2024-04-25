import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseList: [],
    loading: false,
    error: null,
    response: null,
};

const courseSlice = createSlice( {
    name: 'course',
    initialState,
    reducers: {
        getRequest: ( state ) => {
            state.loading = true;
        },
        getSuccess: ( state, action ) => {
            state.courseList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: ( state, action ) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: ( state, action ) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
} );

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError
} = courseSlice.actions;

export const courseReducer = courseSlice.reducer;