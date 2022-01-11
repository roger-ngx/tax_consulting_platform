import { IconButton } from "@mui/material";
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

type Props = DialogTitleProps & {
  children: JSX.Element,
  onClose?: () => void
}

const TFDialogTitle : React.FC<Props> = ({children, onClose, ...other}) => {
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

export default TFDialogTitle;