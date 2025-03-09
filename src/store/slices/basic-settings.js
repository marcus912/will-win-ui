// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
  material: {
    materialList: [],
    isLoaded: false,
    materialDialogRow: {}
  },
  item: {
    itemList: [],
    isLoaded: false,
    itemDialogRow: {}
  },
  customers: {
    customerList: [],
    isLoaded: false,
    customerDialogRow: {}
  }
};

const slice = createSlice({
  name: 'basicSetup',
  initialState,
  reducers: {
    //Material Reducers
    getMaterialSuccess(state, action) {
      state.material.materialList = action.payload;
      state.material.isLoaded = true;
    },

    setMaterialIsLoaded(state, action) {
      state.material.isLoaded = action.payload;
    },

    setDialog(state, action) {
      state.material.materialDialogRow = action.payload;
    },

    //Item Reducers
    getItemSuccess(state, action) {
      state.item.itemList = action.payload;
      state.item.isLoaded = true;
    },

    setItemIsLoaded(state, action) {
      state.item.isLoaded = action.payload;
    },

    setItemDialog(state, action) {
      state.item.itemDialogRow = action.payload;
    },

    //Customer Reducers
    getCustomerSuccess(state, action) {
      state.customers.customerList = action.payload;
    },

    setCustomerIsLoaded(state, action) {
      state.customers.isLoaded = action.payload;
    },

    setCustomerDialog(state, action) {
      state.customers.customerDialogRow = action.payload;
    },

    // HAS ERROR Example
    hasError(state, action) {
      state.material.error = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

//Material Function
export function getMaterials() {
  return async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_WILL_WIN_API}/material`);
      console.log(process.env.REACT_APP_WILL_WIN_API);
      dispatch(slice.actions.getMaterialSuccess(response.data.materiallist));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setMaterialIsLoaded(isLoaded) {
  return () => {
    dispatch(slice.actions.setMaterialIsLoaded(isLoaded));
  };
}

export function setDialogRow(row) {
  return () => {
    dispatch(slice.actions.setDialog(row));
  };
}

//Item Function
export function getItems() {
  return async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_WILL_WIN_API}/item`);
      dispatch(slice.actions.getItemSuccess(response.data.itemList));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setItemIsLoaded(isLoaded) {
  return () => {
    dispatch(slice.actions.setItemIsLoaded(isLoaded));
  };
}

export function setItemDialogRow(row) {
  return () => {
    dispatch(slice.actions.setItemDialog(row));
  };
}

//Customer Function
export function getCustomers() {
  return async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_WILL_WIN_API}/customer`);
      dispatch(slice.actions.getCustomerSuccess(response.data.customerList));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setCustomerIsLoaded(isLoaded) {
  return () => {
    dispatch(slice.actions.setCustomerIsLoaded(isLoaded));
  };
}

export function setCustomerRow(row) {
  return () => {
    dispatch(slice.actions.setCustomerDialog(row));
  };
}
