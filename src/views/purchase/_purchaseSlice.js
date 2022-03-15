import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as _ from 'lodash';

export const fetchPurchaseItems = createAsyncThunk('purchase/fetchPurchaseItems', async (_, { getState }) => {
  // const allNotifications = selectAllNotifications(getState());
  // const [latestNotification] = allNotifications;
  // const latestTimestamp = latestNotification ? latestNotification.date : '';
  const response = await axios.get(`http://localhost:8080/purchase/items`);
  return response.data;
});

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    items: []
  },
  reducers: {},
  extraReducers: {
    [fetchPurchaseItems.fulfilled]: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const selectPurchaseItems = (state) => _.get(state, 'items', []);

export default purchaseSlice.reducer;
