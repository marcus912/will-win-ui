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
import { setMaterialIsLoaded } from 'store/slices/basic-settings';
import { useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

// ===============================|| UI DIALOG - FORMS ||=============================== //

const FormDialog = ({ ...others }) => {
    //console.log('dialog is created');
    const theme = useTheme();
    const {open, onClose} = others;
    // get row using useSelector
    const { materialDialogRow: row } = useSelector((state) => state.basicSetup.material);
    
    console.log("3.MaterialDialogOpen")

    const handleClose = () => {
        onClose();
        console.log("4.MaterialDialogClose")
    };

    const callPut = (data) => {
        try {
            axios.put(`https://private-1baef-willwin.apiary-mock.com/material/${row.id}`, data);
            console.log("5. MaterialSubmit")
            // success, close dialog.
            handleClose();
            // update isLoaded
            dispatch( setMaterialIsLoaded(false));
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
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
                                    <Typography variant="body2" component="span">
                                        這邊新增備註
                                    </Typography>
                                <Formik
                                    initialValues={{
                                        material: row.name,
                                        status: row.status,
                                        comment: row.comment,
                                    }}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                        callPut(values);
                                        dispatch(openSnackbar({
                                            open:true,
                                            message:"修改成功",
                                            variant:'alert',
                                            alert:{
                                                color:'success'
                                            },
                                            close: false
                                        }))
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

export default FormDialog;