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
import { range } from 'lodash';
import Career from '../../models/Career';

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
  onSave: (career: Career) => void
}

const CareerAddDialog: React.FC<Props> = ({open, onClose, onSave}) => {

  const [ company, setCompany ] = React.useState('');
  const [ position, setPosition ] = React.useState('');
  const [ startYear, setStartYear ] = React.useState<number>();
  const [ endYear, setEndYear ] = React.useState<number>();
  const [ isWorkingNow, setWorkingNow ] = React.useState(false);

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
            <span>Career</span>
            <Button
                variant='contained'
                color='primary'
                onClick={() => startYear && onSave(new Career({company, position, startYear, endYear, isWorkingNow}))}
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
          <TextField
            variant='outlined'
            style={{width: 400}}
            onChange={e => setCompany(e.target.value)}
          />

          <Typography style={{marginTop: 24}}>
              Position
          </Typography>
          <TextField
            variant='outlined'
            style={{width: 400}}
            onChange={e => setPosition(e.target.value)}
          />

          <Typography style={{marginTop: 24}}>
              Duration
          </Typography>
          <Duration>
            <Select
              style={{flex: 1}}
              onChange={(e: any) => setStartYear(e.target.value)}
            >
              {
                range(1990, endYear || 2023).map(year => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))
              }
            </Select>
            {
              !isWorkingNow && <>
                <span style={{margin: '0 8px'}}>~</span>
                <Select
                  style={{flex: 1}}
                  onChange={(e: any) => setEndYear(e.target.value)}            
                >
                  {
                    range(startYear || 1990, 2023).map(year => (
                      <MenuItem
                        value={year}
                      >
                        {year}
                      </MenuItem>
                    ))
                  }
                </Select>         
              </>
            }
          </Duration>
          <FormControlLabel
            control={<Checkbox checked={isWorkingNow} onChange={e => setWorkingNow(e.target.checked)}/>}
            label="Working now"
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default CareerAddDialog;
