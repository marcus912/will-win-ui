import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';

// project imports
import Chip from 'ui-component/extended/Chip';
import EnhancedTableHead from '../../../ui-component/third-party/EnhancedTableHead';
import { useDispatch, useSelector } from 'store';
import { getMaterials, setDialogRow } from 'store/slices/basic-settings';

// assets
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// table sort
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| Material LIST ||============================== //

const MaterialList = ({ ...others }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const { isLoaded } = useSelector((state) => state.basicSetup.material);
  const { rows, setOpen } = others;

  //console.log('2.MaterialList');
  React.useEffect(() => {
    if (isLoaded == false) {
      dispatch(getMaterials());
    }
  }, [isLoaded]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      if (selected.length > 0) {
        setSelected([]);
      } else {
        const newSelectedId = rows.map((n) => n.name);
        setSelected(newSelectedId);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleClickOpen = (row) => {
    setOpen(true);
    dispatch(setDialogRow(row));
  };

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          theme={theme}
          selected={selected}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              /** Make sure no display bugs if row isn't an OrderData object */
              if (typeof row === 'number') return null;
              const isItemSelected = isSelected(row.materialname);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={index} selected={isItemSelected}>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    onClick={(event) => handleClick(event, row.name)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                      {' '}
                      #{row.id}{' '}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    onClick={(event) => handleClick(event, row.name)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                      {' '}
                      {row.name}{' '}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell align="center">
                    {row.status == 1 && <Chip label="Complete" size="small" chipcolor="success" />}
                    {row.status == 2 && <Chip label="Pending" size="small" chipcolor="orange" />}
                    {row.status == 3 && <Chip label="Processing" size="small" chipcolor="primary" />}
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <IconButton color="secondary" size="large" aria-label="edit" onClick={() => handleClickOpen(row)}>
                      <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MaterialList;
