import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import UploadFileInput from '../blocks/MyPage/UploadFileInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type BDT = {
  children: JSX.Element,
  onClose: () => void
}

const BootstrapDialogTitle: React.FC<BDT> = ({children, onClose, ...other}) => {

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

const Duration = styled('span')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
  open: boolean;
  onClose: () => void,
  onSave: (inquiry: Inquiry) => void,
}

const AskQuestionDialog: React.FC<Props> = ({open, onClose, onSave}) => {

  const [ title, setTiitle ] = React.useState('');
	const [ inquiry, setInquiry ] = React.useState('');
	const [ attachedFiles, setAttachedFiles ] = React.useState<string[]>([]);

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        disableEscapeKeyDown
        onBackdropClick={() => false}
      >
        <DialogTitle style={{padding: 8}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <IconButton
                aria-label="close"
                sx={{
                    color: '#333'
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <span>Register an inquiry</span>
            <Button
                variant='contained'
                color='primary'
                onClick={() => title && inquiry && onSave({title, inquiry, attachedFiles})}
            >
                Save
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
              Title
          </Typography>
          <TextField
            variant='outlined'
            style={{width: 400}}
            onChange={(e: any) => setTiitle(e.target.value)}
            value={title}
          />

          <Typography style={{marginTop: 24}}>
              Inquiry
          </Typography>
          <TextField
            variant='outlined'
            style={{width: 400}}
            rows={5}
            multiline
            onChange={(e: any) => setInquiry(e.target.value)}
            value={inquiry}
          />

          <UploadFileInput
						onChange={() => {}}
					/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default AskQuestionDialog;
