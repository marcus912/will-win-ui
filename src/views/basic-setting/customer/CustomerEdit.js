import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { dispatch } from 'store';
import { useSelector } from 'store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  //FormControl,
  Grid,
  InputLabel,
  //OutlinedInput,
  Stack,
  //Select,
  TextField
  //MenuItem,
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setCustomerIsLoaded } from 'store/slices/basic-settings';
import { openSnackbar } from 'store/slices/snackbar';

// ===============================|| UI DIALOG - FORMS ||=============================== //

const CustomerEdit = ({ ...others }) => {
  const theme = useTheme();
  const { open, close } = others;
  const { customerDialogRow: row } = useSelector((state) => state.basicSetup.customers);

  const closeEditDialog = () => {
    close();
  };

  const callPut = (data) => {
    try {
      axios.put(`${process.env.REACT_APP_WILL_WIN_API}/customer/${row.id}`, data);
      close();
      dispatch(setCustomerIsLoaded(false));
    } catch (error) {
      console.log(error);
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
                    company: row.company,
                    contact: row.contact,
                    status: row.status,
                    phone: row.phone,
                    cellphone: row.cellphone,
                    address: row.address
                  }}
                  validationSchema={Yup.object().shape({
                    company: Yup.string().required('請輸入材料名稱'),
                    contact: Yup.string().required('請選擇狀態'),
                    status: Yup.string().required('請輸入備註內容'),
                    phone: Yup.number().required('請輸入電話號碼'),
                    cellphone: Yup.number().required('請輸入手機號碼'),
                    address: Yup.string().required('請輸入地址')
                  })}
                  onSubmit={async (values) => {
                    console.log(values);
                    callPut(values);
                    dispatch(
                      openSnackbar({
                        open: true,
                        message: '修改成功',
                        alert: {
                          color: 'success'
                        },
                        close: false
                      })
                    );
                  }}
                >
                  {({ handleChange, handleSubmit, isSubmitting, values, errors, touched }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                      <Grid>
                        <InputLabel>公司編號：{row.company}</InputLabel>
                      </Grid>
                      <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                        <Grid item xs={5}>
                          {/* <FormControl fullWidth>
                                                    <InputLabel htmlFor="contact">聯絡人</InputLabel>
                                                    <OutlinedInput
                                                        id="contact"
                                                        type="text"
                                                        value={values.contact}
                                                        name="contact"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl> */}
                          <TextField
                            fullWidth
                            margin="normal"
                            required
                            id="contact"
                            name="contact"
                            label="聯絡人"
                            defaultValue={values.contact}
                            onChange={handleChange}
                            error={Boolean(touched.contact && errors.contact)}
                            helperText={touched.contact && errors.contact}
                          />
                        </Grid>
                        {/* <Grid item xs={5}>
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
                                            </Grid> */}
                      </Grid>
                      {/* <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
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
                                        </FormControl> */}
                      <DialogActions sx={{ mt: 2 }}>
                        <AnimateButton>
                          <Button sx={{ color: theme.palette.error.dark }} onClick={closeEditDialog} color="secondary">
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

export default CustomerEdit;
