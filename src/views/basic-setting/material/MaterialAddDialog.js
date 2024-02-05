import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { dispatch } from 'store';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Select,
    MenuItem
} from '@mui/material';

//third party
import { Formik } from 'formik';
import * as Yup from 'yup';
//import useScriptRef from 'hooks/useScriptRef';

import axios from 'axios';
import { setMaterialIsLoaded } from 'store/slices/basic-settings';
import { openSnackbar } from 'store/slices/snackbar';

// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function AddDialog({ ...others }) {
    const theme = useTheme();
    //const scriptedRef = useScriptRef();
    const { addOpen, setAddOpen } = others;

    //console.log("6.AddDialogOpen")
    const handleAddClose = () => {
        setAddOpen(false);
    };

    const putAdd = async(data) => {
        try {
            //console.log("7. AddSubmit")
            const response = await axios.post(`${process.env.REACT_APP_WILL_WIN_API}/material`, data);
            console.log(response)

            handleAddClose();
            dispatch(
                openSnackbar({
                    message: '新增成功',
                    alert: {
                        color: 'success'
                    }
                })
            );
            dispatch(setMaterialIsLoaded(false));  
        } catch (error) {
            console.log(error.response.data.error);
            handleAddClose();
            dispatch(
                openSnackbar({
                    message:error?.response?.data?.error?.abc?.bcd,
                    alert: {
                        color: 'primary'
                    }
                })
            );
        }
    };
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
                                    validationSchema={Yup.object().shape({
                                        material: Yup.string().required('請輸入材料名稱'),
                                        status: Yup.string().required('請選擇狀態'),
                                        comment: Yup.string().required('請輸入備註內容')
                                    })}
                                    onSubmit={(values) => {
                                        putAdd(values);
                                    }}
                                >
                                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                        <form noValidate onSubmit={handleSubmit}>
                                            <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth error={Boolean(touched.material && errors.material)}>
                                                        <InputLabel htmlFor="material">品名</InputLabel>
                                                        <OutlinedInput
                                                            id="material"
                                                            type="text"
                                                            value={values.material}
                                                            name="material"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.material && touched.material && (
                                                            <FormHelperText>{errors.material}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth error={Boolean(touched.status && errors.status)}>
                                                        <InputLabel htmlFor="status">狀態</InputLabel>
                                                        <Select
                                                            labelId="status"
                                                            id="status"
                                                            value={values.status}
                                                            name="status"
                                                            label="狀態"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={1}>Complete</MenuItem>
                                                            <MenuItem value={2}>Pending</MenuItem>
                                                            <MenuItem value={3}>Processing</MenuItem>
                                                        </Select>
                                                        {errors.status && touched.status && (
                                                            <FormHelperText>{errors.status}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <FormControl fullWidth error={Boolean(touched.comment && errors.comment)} sx={{ mt: 2 }}>
                                                <InputLabel htmlFor="comment">備註</InputLabel>
                                                <OutlinedInput
                                                    id="comment"
                                                    type="text"
                                                    name="comment"
                                                    value={values.comment}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                {errors.comment && touched.comment && <FormHelperText>{errors.comment}</FormHelperText>}
                                            </FormControl>
                                            <DialogActions sx={{mt: 2, p:0}}>
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
