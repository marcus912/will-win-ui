// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';


// ----------------------------------------------------------------------

const initialState = {
    material:{
    materialList:[],
    isLoaded: false,
    dialogRow:{}
    }
};

const slice = createSlice({ 
    name: 'basicSetup',
    initialState,
    reducers: {
        getMaterialSuccess(state, action){
            state.material.materialList = action.payload;
            state.material.isLoaded =true;
        },

        setIsLoaded(state, action){
            state.material.isLoaded = action.payload;
        },

        setDialog(state, action){
            state.material.dialogRow = action.payload;
        },

        // HAS ERROR Example
        hasError(state, action) {
            state.material.error = action.payload;
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
            dispatch(slice.actions.getMaterialSuccess(response.data.materiallist));
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

export function setDialogRow(row){
    return ()=>{
        dispatch(slice.actions.setDialog(row))
    }
}

