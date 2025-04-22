import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ModelEditProps {
  openEdit: boolean;
  handleCloseEdit: () => void;
}

const ModelEdit = (props: ModelEditProps) => {
  const { openEdit, handleCloseEdit } = props;
  return (
    <Dialog
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Model Update"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Disagree</Button>
        <Button onClick={handleCloseEdit} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelEdit;
