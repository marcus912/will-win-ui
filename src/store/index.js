import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import purchaseReducer from '../views/purchase/_purchaseSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //

export default configureStore({
  reducer: {
    customization: customizationReducer,
    purchase: purchaseReducer
  }
});
