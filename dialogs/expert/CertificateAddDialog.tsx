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
import Certificate from '../../models/Certificate';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
  children: JSX.Element,
  onClose: () => void
}

type CAD = {
  open: boolean,
  onClose: (e: any, reason?: string) => void,
  onSave: (param: Certificate) => void,
  data?: Certificate
}

const CertificateAddDialog : React.FC<CAD> = ({open, data, onClose, onSave}) => {

  const [ certName, setCertName ] = React.useState<string|undefined>();
  const [ certAuthority, setCertAuthority ] = React.useState<string|undefined>();

  React.useEffect(() => {
    if(data){
      setCertName(data.name);
      setCertAuthority(data.authority);
    }
  }, [data]);

  return (
    <div>
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
          <DialogTitle style={{padding: 8}}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <IconButton
                  aria-label="close"
                  sx={{
                      color: '#333'
                  }}
                  onClick={onClose}
              >
                  <CloseIcon />
              </IconButton>
              <span>Certificate</span>
              <Button
                  variant='contained'
                  color='primary'
                  disabled={!certName || !certAuthority}
                  onClick={() => onSave(new Certificate({name: certName, authority: certAuthority}))}
              >
                  Save
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <div style={{margin: '24px auto', display: 'flex', justifyContent: 'center'}}>
              <ProfilePhotoUpload
                onFileChanged={url => {}}
              />
            </div>

            <Typography>
                Certificate
            </Typography>
            <TextField
              variant='outlined'
              style={{width: 400}}
              placeholder='Your certificate name'
              value={certName}
              onChange={(e: any) => setCertName(e.target.value)}
            />

            <Typography style={{marginTop: 24}}>
                Authority
            </Typography>
            <TextField
              variant='outlined'
              style={{width: 400}}
              onChange={(e: any) => setCertAuthority(e.target.value)}
              value={certAuthority}
            />

          </DialogContent>
        </BootstrapDialog>
    </div>
  );
}

export default CertificateAddDialog;
