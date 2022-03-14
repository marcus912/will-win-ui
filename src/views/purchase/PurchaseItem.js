import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import { useCallback, useState } from 'react';
import { mockRows } from './Random';

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true
  }
];

const PurchaseItem = () => (
  <MainCard title='進貨品名'>
    <RowEditControlGrid />
  </MainCard>
);

function RowEditControlGrid() {
  const [editRowsModel, setEditRowsModel] = useState({});

  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '60vh', width: '100%' }}>
        <DataGrid
          rows={mockRows}
          columns={columns}
          editRowsModel={editRowsModel}
          editMode='row'
          onEditRowsModelChange={handleEditRowsModelChange}
          autoPageSize
          rowHeight={40}
        />
      </div>
      <Alert severity='info' style={{ marginTop: 8 }}>
        <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
      </Alert>
    </div>
  );
}

export default PurchaseItem;
