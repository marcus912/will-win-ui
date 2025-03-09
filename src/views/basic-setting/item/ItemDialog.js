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
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

//third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setItemIsLoaded } from 'store/slices/basic-settings';

// ===============================|| UI DIALOG - FORMS ||=============================== //

const FormDialog = ({ ...others }) => {
  const theme = useTheme();
  const { open, onClose } = others;
  const { itemDialogRow: row } = useSelector((state) => state.basicSetup.item);

  const status = [
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

  const handleClose = () => {
    onClose();
  };

  const callPut = (data) => {
    try {
      axios.put(`${process.env.REACT_APP_WILL_WIN_API}/item/${row.id}`, data);
      handleClose();
      dispatch(setItemIsLoaded(false));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {open && (
          <>
            <DialogTitle id="form-dialog-title">品項清單修改</DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <DialogContentText>
                  <Typography variant="body2" component="span">
                    這邊新增備註
                  </Typography>
                </DialogContentText>
                <Formik
                  initialValues={{
                    item: row.name,
                    status: row.status,
                    comment: row.comment,
                    submit: null
                  }}
                  validationSchema={Yup.object().shape({
                    item: Yup.string().required('請輸入材料名稱'),
                    status: Yup.string().required('請選擇狀態'),
                    comment: Yup.string().required('請輸入備註內容')
                  })}
                  onSubmit={async (values) => {
                    console.log(values);
                    callPut(values);
                  }}
                >
                  {({ handleChange, handleSubmit, isSubmitting, values, errors, touched }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                      <Grid>
                        <InputLabel>編號：{row.id}</InputLabel>
                      </Grid>
                      <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            margin="normal"
                            required
                            id="item"
                            name="item"
                            label="品名"
                            defaultValue={values.item}
                            onChange={handleChange}
                            error={Boolean(touched.item && errors.item)}
                            helperText={touched.item && errors.item}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            margin="normal"
                            id="status"
                            name="status"
                            select
                            label="狀態"
                            value={values.status}
                            onChange={handleChange}
                            error={Boolean(touched.status && errors.status)}
                            helperText={touched.status && errors.status}
                          >
                            {status.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="comment"
                        name="comment"
                        label="備註"
                        defaultValue={values.comment}
                        onChange={handleChange}
                        error={Boolean(touched.comment && errors.comment)}
                        helperText={touched.comment && errors.comment}
                      />
                      <DialogActions sx={{ mt: 2 }}>
                        <AnimateButton>
                          <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
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
