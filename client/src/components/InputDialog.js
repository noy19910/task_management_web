import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function InputDialog ({onApply}, ref) {
  const [open, setOpen] = useState (false);
  const [projectName, setProjectName] = useState ();
  const handleClickOpen = () => {
    setOpen (true);
  };

  const handleClose = () => {
    setOpen (false);
  };
  useImperativeHandle (ref, () => ({
    open: () => {
      setOpen (true);
    },
    setName: name => {
      setProjectName (name);
    },
  }));
  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a new project name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={projectName}
            onChange={e => setProjectName (e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{onApply(projectName); handleClose()}} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default forwardRef (InputDialog);
