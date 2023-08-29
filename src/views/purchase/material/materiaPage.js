import MainCard from '../../../ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
// import { useCallback, useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'materialtName', headerName: '材料品名', width: 130, editable: true },
  { field: 'status', headerName: '狀態', width: 130, editable: true },
  { field: 'comment', headerName: '備註', width: 260, editable: true }
];

const rows = [
  { id: 1, materialtName: '鐵', status: 'Jon', comment: '原料調漲' },
  { id: 2, materialtName: '鈷', status: 'Cersei', comment: null },
  { id: 3, materialtName: '鎳', status: 'Jaime', comment: null },
  { id: 4, materialtName: '銅', status: 'Arya', comment: '下週停產' },
  { id: 5, materialtName: '鋅', status: 'Daenerys', comment: null }
];

function MaterialPage() {
  return (
    <MainCard title="材料清單">
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </MainCard>
  );
}
export default MaterialPage;
