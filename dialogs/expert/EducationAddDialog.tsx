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

export default function EducationAddDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Open dialog
        </Button>
        <BootstrapDialog
            onClose={handleClose}
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
              >
                  <CloseIcon />
              </IconButton>
              <span>Education</span>
              <Button
                  variant='contained'
                  color='primary'
              >
                  Save
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Typography>
                University
            </Typography>
            <TextField variant='outlined' style={{width: 400}}/>

            <Typography style={{marginTop: 24}}>
                Major
            </Typography>
            <TextField variant='outlined'  style={{width: 400}}/>

            <Typography style={{marginTop: 24}}>
                Degree
            </Typography>
            <Select style={{width: '100%'}}>
                <MenuItem value={10}>Associate’s degree</MenuItem>
                <MenuItem value={20}>Bachelor’s degree</MenuItem>
                <MenuItem value={30}>Master’s degree</MenuItem>
                <MenuItem value={30}>Doctor’s degree</MenuItem>
            </Select> 

            <Typography style={{marginTop: 24}}>
                Duration
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
            <FormControlLabel control={<Checkbox defaultChecked />} label="Studying now" />
          </DialogContent>
        </BootstrapDialog>
    </div>
  );
}
