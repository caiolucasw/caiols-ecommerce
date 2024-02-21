import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";

interface ModalRemoveProps {
  title: string;
  message: string;
  onRemove: any;
  onClose: any;
  item: any;
}

const ModalRemove = ({
  title,
  message,
  onRemove,
  onClose,
}: ModalRemoveProps) => {
  return (
    <Dialog
      open
      onClose={() => onClose()}
      sx={{
        "& .MuiPaper-root": {
          minWidth: { xs: "auto", sm: 300, md: 500 },
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{ position: "relative", color: "#000", fontWeight: 700 }}
      >
        {title}
        <IconButton
          sx={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
          onClick={() => onClose()}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" fontSize="1.1rem">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={() => onRemove()}>
          Remover
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalRemove;
