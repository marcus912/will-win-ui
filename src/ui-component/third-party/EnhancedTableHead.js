import PropTypes from 'prop-types';

import { Box, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  {
    id: 'id',
    numeric: true,
    label: 'ID',
    align: 'left'
  },
  {
    id: 'name',
    numeric: false,
    label: '品名',
    align: 'left'
  },
  {
    id: 'type',
    numeric: true,
    label: '備註',
    align: 'left'
  },
  {
    id: 'status',
    numeric: false,
    label: '狀態',
    align: 'center'
  }
];

const EnhancedTableHead = function ({ order, orderBy, numSelected, onRequestSort, theme }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  //console.log('numSelected', numSelected);
  return (
    <TableHead>
      <TableRow>
        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {numSelected <= 0 && (
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
              編輯
            </Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  selected: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
