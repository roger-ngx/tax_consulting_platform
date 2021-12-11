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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ProfilePhotoUpload from '../../elements/ProfilePhotoUpload';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Duration = styled('span')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
  open: boolean;
  onClose: () => void,
  onSave: () => void
}

const CareerAddDialog: React.FC<Props> = ({open, onClose, onSave}) => {

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
            <span>Career</span>
            <Button
                variant='contained'
                color='primary'
                onClick={onSave}
            >
                Save
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{margin: '24px auto', display: 'flex', justifyContent: 'center'}}>
            <ProfilePhotoUpload />
          </div>

          <Typography>
              Company
          </Typography>
          <TextField variant='outlined' style={{width: 400}}/>

          <Typography style={{marginTop: 24}}>
              Position
          </Typography>
          <TextField variant='outlined'  style={{width: 400}}/>

          <Typography style={{marginTop: 24}}>
              Contactable Time
          </Typography>
          <Duration>
            <Select style={{flex: 1}}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select> 
            <span style={{margin: '0 8px'}}>~</span>
            <Select style={{flex: 1}}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>         
          </Duration>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Working now" />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default CareerAddDialog;
