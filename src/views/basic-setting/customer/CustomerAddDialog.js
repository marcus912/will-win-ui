import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { dispatch } from 'store';

// material-ui
import { useTheme } from '@mui/material/styles';
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
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

import axios from 'axios';
import { setCustomerIsLoaded } from 'store/slices/basic-settings';
import { openSnackbar } from 'store/slices/snackbar';

// ===============================|| UI DIALOG - FORMS ||=============================== //

const FormDialog = ({ ...others }) => {
    const theme = useTheme();
    const { open, onClose } = others;

    const closeAddDialog = () => {
        onClose();
    };

    const putAdd = async(data) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_WILL_WIN_API}/customer`, data);
            console.log(response);
            closeAddDialog();
            dispatch(openSnackbar({
                message:'新增成功',
                alert:{
                    color: 'success'
                },
            }));
            dispatch(setCustomerIsLoaded(false))  
        }catch(error){
            console.log(error.response.data.error)
            closeAddDialog(); 
            dispatch(openSnackbar({
                message: error?.response?.data?.error?.abc?.bcd,
                alert:{
                    color: 'primary'
                },
            }));

        }
    };

    return (
        <div>
            <Dialog fullWidth open={open} aria-labelledby="form-dialog-title">
                {open && (
                    <>
                        <DialogTitle id="form-dialog-title">顧客資料修改</DialogTitle>
                        <DialogContent>
                            <Stack spacing={3}>
                            <Formik
                                initialValues={{
                                    company: '',
                                    contact:'',
                                    phone:'',
                                    cellphone:'',
                                    address:''
                                }}
                                validationSchema= {Yup.object().shape({
                                    company:Yup.string().required('請填寫公司名稱'),
                                    contact:Yup.string().required('請填聯絡人名稱'),
                                    phone:Yup.string().required('請填寫聯絡電話'),
                                    cellphone:Yup.string().required('請填寫手機號碼'),
                                    address:Yup.string().required('請填寫地址')
                                })}
                                onSubmit={(values)=> {
                                    putAdd(values);
                                    }}
                                >
                                {({ handleBlur, handleChange, handleSubmit, isSubmitting, values, errors, touched }) => (
                                    <form noValidate onSubmit={handleSubmit} {...others}>
                                        <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={5}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="company">公司名稱</InputLabel>
                                                    <OutlinedInput
                                                        id="company"
                                                        type="text"
                                                        value={values.company}
                                                        name="company"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.company && touched.company ? (<div>{errors.company}</div>) : null}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="contact">聯絡人</InputLabel>
                                                    <OutlinedInput
                                                        id="contact"
                                                        type="text"
                                                        value={values.contact}
                                                        name="contact"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.contact && touched.contact ? (<div>{errors.contact}</div>) : null}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                                            <Grid item xs={5}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="phone">公司電話</InputLabel>
                                                    <OutlinedInput
                                                        id="phone"
                                                        type="tel"
                                                        value={values.phone}
                                                        name="phone"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.phone && touched.phone ? (<div>{errors.phone}</div>) : null}                                                    
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={5}>
                                            <FormControl fullWidth>
                                                    <InputLabel htmlFor="cellphone">聯絡電話</InputLabel>
                                                    <OutlinedInput
                                                        id="cellphone"
                                                        type="tel"
                                                        value={values.cellphone}
                                                        name="cellphone"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.cellphone && touched.cellphone ? (<div>{errors.cellphone}</div>) : null}                                        
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <InputLabel htmlFor="address">聯絡地址</InputLabel>
                                            <OutlinedInput
                                                id="address"
                                                type="text"
                                                value={values.address}
                                                name="address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {errors.address && touched.address ? (<div>{errors.address}</div>) : null}                                            
                                        </FormControl>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <InputLabel htmlFor="email">聯絡信箱</InputLabel>
                                            <OutlinedInput
                                                id="email"
                                                type="email"
                                                value='123@example.com'
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />                            
                                        </FormControl>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <InputLabel htmlFor="taxId">統一編號</InputLabel>
                                            <OutlinedInput
                                                id="taxId"
                                                type="text"
                                                value='0000000001'
                                                name="texId"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <InputLabel htmlFor="wed">公司網站</InputLabel>
                                            <OutlinedInput
                                                id="web"
                                                type="url"
                                                value='http://example.com'
                                                name="web"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <InputLabel htmlFor="comment">備註</InputLabel>
                                            <OutlinedInput
                                                id="comment"
                                                type="text"
                                                value='無確認事項'
                                                name="comment"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <DialogActions sx={{ mt: 2 }}>
                                            <AnimateButton>
                                                <Button sx={{ color: theme.palette.error.dark }} onClick={closeAddDialog} color="secondary">
                                                    取消
                                                </Button>
                                                <Button disabled={isSubmitting} size="small" type="submit" variant="contained">
                                                    修改
                                                </Button>
                                            </AnimateButton>
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
};

export default FormDialog;

