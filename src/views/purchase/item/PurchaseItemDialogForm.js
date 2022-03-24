import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import debug from 'debug';
import { validate, Validator } from '../../../utils/validation';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { postPurchaseItem } from '../_purchaseSlice';
import { extractFormData } from '../../../utils/util';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

const logger = debug('ww:purchase-item-dialog-form');

export const PurchaseItemDialogForm = ({ open = false, setOpen }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const [columns, setColumns] = useState({
    name: { label: '品名', value: '', validators: [Validator.NotEmpty] },
    comment: { label: '註解', validators: [Validator.NotEmpty] },
    status: { label: '狀態', value: true }
  });
  const handleChange = (prop) => (event) => {
    setColumns({ ...columns, [prop]: { value: event.target.value, validators: columns[prop].validators } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setErrors({});
    logger('Submit data: ', columns);
    const currentErrors = validate(columns);
    setErrors(currentErrors);
    if (_.isEmpty(currentErrors)) {
      dispatch(postPurchaseItem(extractFormData(columns)))
        .then(unwrapResult)
        .then(() => {
          enqueueSnackbar('新增成功', {
            variant: 'success'
          });
          setOpen(false);
        })
        .catch((error) => {
          logger('Post purchase item failure: ', error);
          enqueueSnackbar('新增失敗', {
            variant: 'error'
          });
        });
    }
  };
  return (
    <div>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>新增品名</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              '& .MuiTextField-root': { my: 1 }
            }}
          >
            <div>
              <TextField
                fullWidth
                required
                id="name"
                label={columns?.label}
                error={!!errors?.name}
                helperText={errors?.name}
                onChange={handleChange('name')}
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="comment"
                label={columns?.label}
                error={!!errors?.comment}
                helperText={errors?.comment}
                multiline
                rows={4}
                onChange={handleChange('comment')}
              />
            </div>
          </Box>
          <code>columns: {JSON.stringify(columns)}</code>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PurchaseItemDialogForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};
