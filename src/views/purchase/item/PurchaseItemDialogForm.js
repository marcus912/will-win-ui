import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export const PurchaseItemDialogForm = ({ open = false, setOpen }) => (
  <div>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>新增品名</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField required id="name" label="品名" />
          </div>
          <div>
            <TextField id="comment" label="註解" multiline rows={4} />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => setOpen(false)}>Submit</Button>
      </DialogActions>
    </Dialog>
  </div>
);

PurchaseItemDialogForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};
