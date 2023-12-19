import * as React from 'react';

// material-ui
import {
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    TablePagination,
    TextField,
    Tooltip,
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useSelector } from 'store';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import MaterialList from './MaterialList';
import FormDialog from './ＭaterialDialog';

// ==============================|| Material LIST ||============================== //

const MaterialPage = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [filter, setFilter] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const { materiallist} = useSelector((state) => state.material);
    
    React.useEffect(() => {
        setRows(materiallist);
    }, [materiallist]);
    React.useEffect(() => {
        setFilter(materiallist);
    }, [materiallist]);

    //搜尋bar功能
    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = filter.filter((row) => {
                let matches = true;

                const properties = [ 'id','name', 'comment', 'status'];
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
            setRows(materiallist);
        }
    };

    //Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    
    return (
        <MainCard  content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
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
                            placeholder="Search Order"
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
                    </Grid>
                </Grid>
            </CardContent>
            {/* table */}
            <MaterialList page={page} rowsPerPage={rowsPerPage} rows={rows} setOpen={setOpen}></MaterialList>
            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <FormDialog open={open} onClose={handleClose}></FormDialog>
        </MainCard>
    );
};

export default MaterialPage;
