import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import debug from 'debug';

const logger = debug('ww:purchase-item-dialog-form');

export const PurchaseItemDialogForm = ({ open = false, setOpen }) => {
  const [values, setValues] = useState({
    name: '',
    comment: '',
    status: ''
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField fullWidth required id="name" label="品名" onChange={handleChange('name')} />
            </div>
            <div>
              <TextField fullWidth id="comment" label="註解" multiline rows={4} onChange={handleChange('comment')} />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              logger('Submit data: ', values);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PurchaseItemDialogForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};
