import * as React from 'react';

// material-ui
import {
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {  useSelector } from 'store';

// assets
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import ItemList from './ItemList';
import ItemDialog from './ItemDialog'

// ==============================|| ITEM LIST ||============================== //

const ItemPage = () => {
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [filter, setFilter] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const { itemList } = useSelector((state) => state.basicSetup.item);

    React.useEffect(() => {
        setRows(itemList);
        setFilter(itemList);
    }, [itemList]);

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = filter.filter((row) => {
                let matches = true;

                const properties = ['id', 'name', 'comment'];
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
            setRows(itemList);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MainCard content={false}>
            {/*  HEADER TOOLBAR */}
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
                            placeholder="Search Item"
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
            <ItemList rows={rows} setOpen={setOpen}></ItemList>
            <ItemDialog open={open} onClose={handleClose}></ItemDialog>
        </MainCard>
    );
};

export default ItemPage;
