// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';


// ----------------------------------------------------------------------

const initialState = {
    materiallist:[],
    isLoaded: false
};

const slice = createSlice({
    name: 'material',
    initialState,
    reducers: {
        getMaterialSucess(state, action){
            state.materiallist = action.payload;
            state.isLoaded =true;
        },

        setIsLoaded(state, action){
            state.isLoaded = action.payload;
        },

        // HAS ERROR Example
        hasError(state, action) {
            state.error = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMaterials() {
    return async () => {
        try {
            const response = await axios.get('https://private-1baef-willwin.apiary-mock.com/material');
            dispatch(slice.actions.getMaterialSucess(response.data.materiallist));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function setLoaded(isLoaded) {
    return () =>{
        dispatch(slice.actions.setIsLoaded(isLoaded))
    };
}


