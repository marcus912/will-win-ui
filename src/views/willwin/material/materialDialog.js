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
import axios from 'axios';
// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function FormDialog({row}) {
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

    //console.log(row);
    const callPut = () => {
        axios.put(`https://polls.apiblueprint.org/purchase/${row.id}`, row);
    }
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
                                        這邊新增備註
                                    </Typography>
                                </DialogContentText>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12}>
                                            <InputLabel>ID: {row?.id}</InputLabel>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputLabel>材料名稱</InputLabel>
                                            <TextField fullWidth placeholder="Enter Material" defaultValue={row?.name} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputLabel>備註</InputLabel>
                                            <TextField
                                                fullWidth
                                                id="outlined-multiline-flexible"
                                                label="Comment"
                                                multiline
                                                rows={3}
                                                defaultValue={row?.comment}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputLabel>狀態</InputLabel>
                                            <FormControlSelect currencies={currencies} selected={row?.status} captionLabel="Status" />  

                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                取消
                            </Button>
                            <Button variant="contained" size="small" onClick={callPut}>
                                修改
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}
