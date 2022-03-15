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

const notificationsSlice = createSlice({
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

export default notificationsSlice.reducer;

export const selectPurchaseItems = (state) => _.get(state, 'items', []);
