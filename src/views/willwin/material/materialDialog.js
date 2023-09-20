import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CardContent,
    Grid,
    Stack,
    TextField,
    Typography,
    IconButton
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect';
// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function FormDialog() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currencies = [
        {
            value: '1',
            label: 'Complete'
        },
        {
            value: '2',
            label: 'Pending'
        },
        {
            value: '3',
            label: 'Processing'
        }
    ];
    return (
        <div>
            <IconButton color="secondary" size="large" aria-label="edit" onClick={handleClickOpen}>
                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {open && (
                    <>
                        <DialogTitle id="form-dialog-title">材料清單修改</DialogTitle>
                        <DialogContent>
                            <Stack spacing={3}>
                                <DialogContentText>
                                    <Typography variant="body2" component="span">
                                        Let Google help apps determine location. This means sending anonymous location data to Google, even
                                        when no apps are running.
                                    </Typography>
                                </DialogContentText>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={6}>
                                            <InputLabel>Material</InputLabel>
                                            <TextField fullWidth placeholder="Enter Material" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputLabel>Supplier</InputLabel>
                                            <TextField fullWidth placeholder="Enter Supplier full name" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputLabel>Comment</InputLabel>
                                            <TextField
                                                fullWidth
                                                id="outlined-multiline-flexible"
                                                label="Comment"
                                                multiline
                                                rows={3}
                                                defaultValue=""
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlSelect currencies={currencies} captionLabel="Status" />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button variant="contained" size="small" onClick={handleClose}>
                                Subscribe
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}
