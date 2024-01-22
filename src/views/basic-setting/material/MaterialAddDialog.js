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
} from '@mui/material';

import axios from 'axios';
import { setMaterialIsLoaded } from 'store/slices/basic-settings';
import { openSnackbar } from 'store/slices/snackbar';

// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function AddDialog({ ...others }) {
    const theme = useTheme();
    const { addOpen, setAddOpen } = others;

    console.log("6.AddDialogOpen")
    const handleAddClose = () => {
        setAddOpen(false);
    };

    const putAdd =(data)=>{
        try {
            axios.post(`https://private-1baef-willwin.apiary-mock.com/material`, data);
            console.log("7. AddSubmit")
            handleAddClose();
            dispatch( setMaterialIsLoaded(false));
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Dialog fullWidth open={addOpen} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                {addOpen && (
                    <>
                        <DialogTitle id="form-dialog-title">新增材料清單</DialogTitle>
                        <DialogContent>
                            <Stack spacing={3}>
                                <Formik
                                    initialValues={{
                                        material: '',
                                        status: '',
                                        comment: ''
                                    }}
                                    onSubmit={ async (values) =>{
                                        console.log(values);
                                        putAdd(values);
                                        dispatch(openSnackbar({
                                            open:true,
                                            message:"新增成功",
                                            variant:'alert',
                                            alert:{
                                                color:'success'
                                            },
                                            close: false
                                        }))
                                    }}
                                >
                                    {({ handleBlur, handleChange, handleSubmit, isSubmitting, values}) => (
                                        <form noValidate onSubmit={handleSubmit}>
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
                                                            name='status'
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
                                                    name="comment"
                                                    value={values.comment}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            <DialogActions sx={{ pr: 2.5 }}>
                                                <Button sx={{ color: theme.palette.error.dark }} onClick={handleAddClose} color="secondary">
                                                    取消
                                                </Button>
                                                <Button disabled={isSubmitting} size="small" type="submit" variant="contained">
                                                    確認
                                                </Button>
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
