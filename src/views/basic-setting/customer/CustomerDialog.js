import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {
  Button,
  Box,
  Grid,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  useScrollTrigger,
  Typography
} from '@mui/material';

import Profile from './CustomerDialogProfile';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { CSVExport } from '../../forms/tables/TableExports';

// sticky edit card
function ElevationScroll({ children, window }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 230,
    target: window || undefined
  });

  return React.cloneElement(children, {
    style: {
      position: trigger ? 'fixed' : 'relative',
      top: trigger ? 83 : 0,
      width: trigger ? 318 : '100%'
    }
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node,
  window: PropTypes.object
};

// tabs panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const tabsOption = [
  {
    label: 'Profile',
    icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
  },
  {
    label: 'Personal Details',
    icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
  }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function createData(id, year, delivery, item, qty, unit, unitPrice, price, tax, pay, totalPay, remark) {
  return { id, year, delivery, item, qty, unit, unitPrice, price, tax, pay, totalPay, remark };
}

const rows = [
  createData(1, 113, '0910', 'Fe', 1000, 'g', 2000, 3000, 4000, 5000, 6000, '已請款', '無備註'),
  createData(2, 114, '0911', 'Fe', 1000, 'g', 2000, 3000, 4000, 5000, 6000, '未請款', '無備註'),
  createData(3, 115, '0912', 'Fe', 1000, 'g', 2000, 3000, 4000, 5000, 6000, '請款中', '無備註'),
  createData(4, 115, '0913', 'Fe', 1000, 'g', 2000, 3000, 4000, 5000, 6000, '請款中', '無備註')
];

const header = [
  { label: '年度', key: 1 },
  { label: '送貨日', key: 2 },
  { label: '品名', key: 3 },
  { label: '數量', key: 4 },
  { label: '單位', key: 5 },
  { label: '單價', key: 6 },
  { label: '金額', key: 7 },
  { label: '稅額', key: 8 },
  { label: '應付帳款', key: 9 },
  { label: '應付總額', key: 10 },
  { label: '備註', key: 11 }
];

const CustomerDialog = ({ ...others }) => {
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { open, onClose } = others;
  const handleClose = () => {
    onClose();
  };

  return (
    <ElevationScroll open={open}>
      <SubCard
        sx={{
          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
          width: '100%',
          maxWidth: 1000
        }}
        content={false}
      >
        <Grid spacing={gridSpacing} sx={{ p: 3 }}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            sx={{
              mb: 3,
              '& a': {
                minHeight: 'auto',
                minWidth: 10,
                py: 1.5,
                px: 1,
                mr: 2.25,
                color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '& a.Mui-selected': {
                color: theme.palette.primary.main
              },
              '& .MuiTabs-indicator': {
                bottom: 2
              },
              '& a > svg': {
                marginBottom: '0px !important',
                mr: 1.25
              }
            }}
          >
            {tabsOption.map((tab, index) => (
              <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>

          <TabPanel value={value} index={0}>
            <Profile></Profile>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <SubCard
                  title={
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs zeroMinWidth>
                        <Typography align="left" variant="subtitle1">
                          超鴻實業有限公司
                        </Typography>
                        <Typography align="left" variant="subtitle2">
                          王小明
                        </Typography>
                        <Typography align="left" variant="subtitle2">
                          (T) 04-7522357 (F) 04-7522360
                        </Typography>
                        <Typography align="left" variant="subtitle2">
                          彰化市平安街33號
                        </Typography>
                      </Grid>
                      <Grid item>
                        <CSVExport data={rows} filename="table-customized.csv" header={header} />
                      </Grid>
                    </Grid>
                  }
                >
                  <Grid container spacing={2}>
                    <TableContainer>
                      <Table sx={{ minWidth: 320 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>年度</StyledTableCell>
                            <StyledTableCell align="right">送貨日</StyledTableCell>
                            <StyledTableCell align="right">品名</StyledTableCell>
                            <StyledTableCell align="right">數量</StyledTableCell>
                            <StyledTableCell align="right">單位</StyledTableCell>
                            <StyledTableCell align="right">單價</StyledTableCell>
                            <StyledTableCell align="right">金額</StyledTableCell>
                            <StyledTableCell align="right">稅額</StyledTableCell>
                            <StyledTableCell align="right">應付帳款</StyledTableCell>
                            <StyledTableCell align="right">應付總額</StyledTableCell>
                            <StyledTableCell align="right">備註</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <StyledTableRow hover key={row.id}>
                              <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                {row.year}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.delivery}</StyledTableCell>
                              <StyledTableCell align="right">{row.item}</StyledTableCell>
                              <StyledTableCell align="right">{row.qty}</StyledTableCell>
                              <StyledTableCell align="right">{row.unit}</StyledTableCell>
                              <StyledTableCell align="right">{row.unitPrice}</StyledTableCell>
                              <StyledTableCell align="right">{row.price}</StyledTableCell>
                              <StyledTableCell align="right">{row.tax}</StyledTableCell>
                              <StyledTableCell align="right">{row.pay}</StyledTableCell>
                              <StyledTableCell align="right">{row.totalPay}</StyledTableCell>
                              <StyledTableCell align="right">{row.remark}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </SubCard>
              </Grid>
            </Grid>
          </TabPanel>
          <Stack spacing={3}>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Grid>
      </SubCard>
    </ElevationScroll>
  );
};

export default CustomerDialog;
