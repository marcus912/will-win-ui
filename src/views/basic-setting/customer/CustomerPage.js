import * as React from 'react';

// material-ui
import { CardContent, Fab, Grid, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getCustomers } from 'store/slices/basic-settings';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';

// component
import CustomerList from './CustomerList';
import CustomerDialog from './CustomerDialog';
import AddDialog from './CustomerAddDialog';

// ==============================|| CUSTOMER LIST ||============================== //

const CustomerPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const { isLoaded } = useSelector((state) => state.basicSetup.customers);
  const { customerList } = useSelector((state) => state.basicSetup.customers);

  React.useEffect(() => {
    if (isLoaded == false) {
      dispatch(getCustomers());
    }
  }, [isLoaded, dispatch]);

  React.useEffect(() => {
    setRows(customerList);
    setFilter(customerList);
  }, [customerList]);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || '');

    if (newString) {
      const newRows = filter.filter((row) => {
        let matches = true;

        const properties = ['id', 'company', 'contact', 'phone', 'cellphone', 'address'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setRows(newRows);
    } else {
      setRows(customerList);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <MainCard title="Customer List" content={false}>
      <Grid container spacing={gridSpacing}>
        <Grid className="block" item xs zeroMinWidth sx={{ display: open ? { xs: 'none', md: 'block' } : 'block' }}>
          <Grid>
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleSearch}
                    placeholder="Search Customer"
                    value={search}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                  <Tooltip title="Copy">
                    <IconButton size="large">
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print">
                    <IconButton size="large">
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filter">
                    <IconButton size="large">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Product">
                    <Fab
                      color="primary"
                      size="small"
                      sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                      onClick={handleAddOpen}
                    >
                      <AddIcon fontSize="small" />
                    </Fab>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>

            {/* table */}
            <CustomerList rows={rows} setOpen={setOpen}></CustomerList>
          </Grid>
        </Grid>
        <AddDialog open={addOpen} onClose={handleAddClose}></AddDialog>
        {open && (
          <Grid item sx={{ width: 1000, margin: { xs: '0 auto', md: 'initial' } }}>
            <CustomerDialog open={open} onClose={handleClose} />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default CustomerPage;
