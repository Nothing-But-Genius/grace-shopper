import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteProductButton({ productId, handleDelete }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDeleteConfirm = () => {
    handleDelete(productId);
  };

  const handleConfirmDelete = () => {
    onDeleteConfirm();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="error">
        Delete Product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description">
        <Box sx={style}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <div id="delete-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this product?
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                color="error">
                Confirm
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteProductButton;
