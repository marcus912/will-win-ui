import * as React from 'react';
import PropTypes from 'prop-types';

// material-ui
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';

// project imports
import Chip from 'ui-component/extended/Chip';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import CustomerEdit from './CustomerEdit';

// assets
import { IconEdit } from '@tabler/icons';
import { useSelector } from 'store';

// progress
function LinearProgressWithLabel({ value, ...others }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          mr: 1
        }}
      >
        <LinearProgress value={value} {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number
};

// personal details table
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const Profile = () => {
  const { customerDialogRow: row } = useSelector((state) => state.basicSetup.customers);
  const [openEdit, setOpenEdit] = React.useState(false);

  const rows = [
    createData('公司名稱', ':', row.company),
    createData('聯絡人', ':', row.contact),
    createData('公司電話', ':', row.phone),
    createData('手機號碼', ':', row.cellphone),
    createData('傳真號碼', ':', '0800-080-001'),
    createData('聯絡地址', ':', row.address),
    createData('聯絡信箱', ':', '123@example.com'),
    createData('統一編號', ':', '0000000001'),
    createData('公司網站', ':', 'http://example.com'),
    createData('備註', ':', '無確認事項')
  ];

  const openDialog = () => {
    setOpenEdit(true);
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard
              title={
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="subtitle1">
                      {row.company}
                    </Typography>
                    <Typography align="left" variant="subtitle2">
                      {row.contact}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {row.status == 1 && <Chip label="Complete" size="small" chipcolor="success" />}
                    {row.status == 2 && <Chip label="Processing" size="small" chipcolor="orange" />}
                    {row.status == 3 && <Chip label="Confirm" size="small" chipcolor="primary" />}
                  </Grid>
                </Grid>
              }
            >
              <Grid container spacing={2}>
                <Grid item container justifyContent="space-between" xs={12}>
                  <Grid item>
                    <Typography variant="subtitle1">廠商資訊</Typography>
                  </Grid>
                  <Grid item>
                    <Button aria-label="Edit Details" onClick={openDialog}>
                      <IconEdit stroke={1.5} size="20px" />
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ pt: 1 }} />
                <Grid item xs={12}>
                  <TableContainer>
                    <Table
                      sx={{
                        '& td': {
                          borderBottom: 'none'
                        }
                      }}
                      size="small"
                    >
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell variant="head">{row.name}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
      <CustomerEdit open={openEdit} close={closeEdit}></CustomerEdit>
    </Grid>
  );
};

export default Profile;
