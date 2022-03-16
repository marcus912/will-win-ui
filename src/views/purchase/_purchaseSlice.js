import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as _ from 'lodash';
import debug from 'debug';

const logger = debug('ww:purchase-purchaseSlice');

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

export const selectPurchaseItems = (state) => {
  logger('state changed: ', state);
  return _.get(state, 'purchase.items', []);
};

export default purchaseSlice.reducer;
