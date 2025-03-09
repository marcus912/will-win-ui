import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { dispatch } from 'store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Stack, TextField } from '@mui/material';

//third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setMaterialIsLoaded } from 'store/slices/basic-settings';
import { openSnackbar } from 'store/slices/snackbar';

export default function AddDialog({ ...others }) {
  const theme = useTheme();
  const { addOpen, setAddOpen } = others;

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

  //console.log("6.AddDialogOpen")
  const handleAddClose = () => {
    setAddOpen(false);
  };

  const putAdd = async (data) => {
    try {
      console.log('7. AddSubmit');
      const response = await axios.post(`${process.env.REACT_APP_WILL_WIN_API}/material`, data);
      console.log(response);

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
          message: error?.response?.data?.error?.abc?.bcd,
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
                  {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid sx={{ mt: 2 }} container alignItems="center" justifyContent="space-between">
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            margin="normal"
                            id="material"
                            name="material"
                            label="品名"
                            value={values.material}
                            onChange={handleChange}
                            error={Boolean(touched.material && errors.material)}
                            helperText={touched.material && errors.material}
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
                        id="comment"
                        name="comment"
                        label="備註"
                        value={values.comment}
                        onChange={handleChange}
                        error={Boolean(touched.comment && errors.comment)}
                        helperText={touched.comment && errors.comment}
                      />
                      <DialogActions sx={{ mt: 2, p: 0 }}>
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
