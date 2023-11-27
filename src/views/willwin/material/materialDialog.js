import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import {
    Box,
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
    IconButton
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AnimateButton from 'ui-component/extended/AnimateButton';

import axios from 'axios';
// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function FormDialog({ row, ...others }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(10);

    const statusChange = (event) => {
        console.log(event.target.value);
        setStatus(event.target.value);
        console.log(typeof age);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const currencies = [
    //     {
    //         value: '1',
    //         label: 'Complete'
    //     },
    //     {
    //         value: '2',
    //         label: 'Pending'
    //     },
    //     {
    //         value: '3',
    //         label: 'Processing'
    //     }
    // ];

    //console.log(row);
    const callPut = () => {
        try {
            axios.put(`https://private-1baef-willwin.apiary-mock.com/material/${row.id}`, row);
            // success, close dialog.
            // here
        } catch (e) {
            // failed
            console.log(e);
        }
    };
    return (
        <div>
            <IconButton color="secondary" size="large" aria-label="edit" onClick={handleClickOpen}>
                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
            </IconButton>
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
                                        material: '123',
                                        status: status,
                                        comment: '備註欄',
                                        submit: null
                                    }}
                                    // validationSchema={Yup.object().shape({
                                    //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                    //     password: Yup.string().max(255).required('Password is required')
                                    // })}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
                                        <form noValidate onSubmit={handleSubmit} {...others}>
                                            <Grid container alignItems="center" justifyContent="space-between">
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
                                                            inputProps={{}}
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
                                                            label="狀態"
                                                            onChange={statusChange}
                                                        >
                                                            <MenuItem value={10}>Ten</MenuItem>
                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                            <MenuItem value={30}>Thirty</MenuItem>
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
                                                    inputProps={{}}
                                                />
                                            </FormControl>
                                            <Box sx={{ mt: 2 }}>
                                                <AnimateButton>
                                                    <Button
                                                        color="secondary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        Sign In
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                                <DialogActions sx={{ pr: 2.5 }}>
                                    <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                        取消
                                    </Button>
                                    <Button type="submit" variant="contained" size="small" onClick={callPut}>
                                        修改
                                    </Button>
                                </DialogActions>
                            </Stack>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
}
