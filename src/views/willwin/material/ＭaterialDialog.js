import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import { dispatch } from 'store';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

import axios from 'axios';
import { setLoaded } from 'store/slices/material';
import { useSelector } from 'store';

// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function FormDialog({ ...others }) {
    console.log('dialge is created');
    const theme = useTheme();
    const {open, onClose} = others;
    // get row using useSelector
    const { dialogRow: row } = useSelector((state) => state.material);

    // const row = useSelector((state) => state.material.dialogRow); // dialogRow
    // const handleClickOpen = () => {
    //     // setOpen(true);
    // };

    const handleClose = () => {
        onClose();
    };

    const callPut = (data) => {
        try {
            axios.put(`https://private-1baef-willwin.apiary-mock.com/material/${row.id}`, data);
            // success, close dialog.
            handleClose();
            // update isLoaded
            dispatch(setLoaded(false));
        } catch (e) {
            // failed
            console.log(e);
        }
    };
    return (
        <div>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                                <Formik
                                    initialValues={{
                                        material: row.name,
                                        status: row.status,
                                        comment: row.comment,
                                        submit: null
                                    }}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                        callPut(values);
                                        
                                    }}
                                >
                                    {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
                                        <form noValidate onSubmit={handleSubmit} {...others}>
                                            <Grid>
                                            <InputLabel>編號：{row.id}</InputLabel>  
                                            </Grid>
                                            <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="material">品名</InputLabel>
                                                        <OutlinedInput
                                                            id="material"
                                                            type="text"
                                                            value={values.material}
                                                            name="material"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="status">狀態</InputLabel>
                                                        <Select
                                                            labelId="status"
                                                            id="status"
                                                            value={values.status}
                                                            name="status"
                                                            label="狀態"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Complete</MenuItem>
                                                            <MenuItem value={2}>Pending</MenuItem>
                                                            <MenuItem value={3}>Processing</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <InputLabel htmlFor="comment">備註</InputLabel>
                                                <OutlinedInput
                                                    id="comment"
                                                    type="text"
                                                    value={values.comment}
                                                    name="comment"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            <DialogActions sx={{ mt: 2 }}>
                                                < AnimateButton>
                                                    <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                                        取消
                                                    </Button>
                                                    <Button
                                                        disabled={isSubmitting}
                                                        size="small"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        修改
                                                    </Button>
                                                </ AnimateButton>
                                            </DialogActions>
                                        </form>
                                    )}
                                </Formik>
                            </Stack>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
}
