import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import debug from 'debug';
import { LoadingState, unwrapErrorResponse } from '../../utils/util';

const logger = debug('ww:purchase-purchaseSlice');

export const fetchPurchaseItems = createAsyncThunk('purchase/fetchPurchaseItems', async () => {
  // const allNotifications = selectAllNotifications(getState());
  // const [latestNotification] = allNotifications;
  // const latestTimestamp = latestNotification ? latestNotification.date : '';
  const response = await axios.get(`http://localhost:8080/purchase/items`).then();
  return response;
});

export const postPurchaseItem = createAsyncThunk('purchase/postPurchaseItem', async (data) => {
  logger('Post purchaseItem data: ', data);
  return axios
    .post(`http://localhost:8080/purchase/items`, data)
    .then((response) => response.data)
    .catch((error) => {
      logger('error ', error.response);
      throw unwrapErrorResponse(error.response);
    });
});

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    items: [],
    itemsLoadingState: LoadingState.NONE
  },
  reducers: {},
  extraReducers: {
    [fetchPurchaseItems.fulfilled]: (state, action) => {
      state.items = action.payload.data;
      state.itemsLoadingState = LoadingState.LOADED;
    },
    [postPurchaseItem.fulfilled]: (state) => {
      state.itemsLoadingState = LoadingState.NONE;
    }
  }
});

export const selectPurchaseItems = (state) => _.get(state, 'purchase.items', []);

export const selectPurchaseItemsLoadingState = (state) => _.get(state, 'purchase.itemsLoadingState');

export default purchaseSlice.reducer;
