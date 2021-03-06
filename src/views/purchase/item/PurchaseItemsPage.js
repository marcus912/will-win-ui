import MainCard from '../../../ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseItems, selectPurchaseItems, selectPurchaseItemsLoadingState } from '../_purchaseSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import debug from 'debug';
import { Button } from '@mui/material';
import { PurchaseItemDialogForm } from './PurchaseItemDialogForm';
import { LoadingState } from '../../../utils/util';

const logger = debug('ww:purchase-items-page');

const columns = [
  // { field: 'name', headerName: 'Name', width: 180, editable: true },
  // { field: 'comment', headerName: 'Age', type: 'number', editable: true },
  { field: 'name', headerName: '品名', width: 180, editable: true },
  { field: 'comment', headerName: '備註', editable: true },
  { field: 'status', headerName: '狀態', editable: true }
  // {
  //   field: 'dateCreated',
  //   headerName: 'Date Created',
  //   type: 'date',
  //   width: 180,
  //   editable: true
  // },
  // {
  //   field: 'lastLogin',
  //   headerName: 'Last Login',
  //   type: 'dateTime',
  //   width: 220,
  //   editable: true
  // }
];

const PurchaseItemsPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <MainCard
      title="進貨品名"
      darkTitle
      secondary={
        <Button onClick={() => setOpen(true)} variant="contained">
          新增品名
        </Button>
      }
    >
      <RowEditControlGrid />
      <PurchaseItemDialogForm open={open} setOpen={setOpen} />
    </MainCard>
  );
};

function RowEditControlGrid() {
  const dispatch = useDispatch();
  const [editRowsModel, setEditRowsModel] = useState({});
  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model);
  }, []);
  const items = useSelector(selectPurchaseItems);
  const loadingState = useSelector(selectPurchaseItemsLoadingState);
  useEffect(() => {
    if (loadingState === LoadingState.NONE) {
      dispatch(fetchPurchaseItems())
        .then(unwrapResult)
        .then((data) => logger('Purchase items: ', data))
        .catch((e) => logger('Fetch purchase items failure.', e));
    }
  }, [dispatch, loadingState]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '60vh', width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          editRowsModel={editRowsModel}
          editMode="row"
          onEditRowsModelChange={handleEditRowsModelChange}
          autoPageSize
          rowHeight={40}
        />
      </div>
      <Alert severity="info" style={{ marginTop: 8 }}>
        <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
      </Alert>
    </div>
  );
}

export default PurchaseItemsPage;
