import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { get, throttle } from 'lodash';

import ProfilePhotoUpload from '../elements/ProfilePhotoUpload';
import { withdraw } from '../firebase/login';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { updateUser } from '../firebase/firebaseUser';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Duration = styled('span')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
  open: boolean;
  onClose: () => void,
}

const AccountDialog: React.FC<Props> = ({open, onClose}) => {

  const router = useRouter();
  const googleUser = useSelector((state: any) => state.firebase.auth) || {};

  const userType = useSelector((state: any) => state.user.userType);

  const user = useSelector((state: any) => get(state, `firestore.data.${userType==='user'?'users':'experts'}.${googleUser.uid}`)) || {};

  const [ name, setName ] = useState(user.displayName);
  const [ phoneNumber, setPhoneNumber ] = useState(user.phoneNumber);
  const [ photoURL, setPhotoURL ] = useState(user.photoURL);
  const [ processing, setProcessing ] = useState(false);
  const [ isDataChanged, setDataChanged ] = useState(false);
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    if(name===user.displayName && phoneNumber===user.phoneNumber && photoURL===user.photoURL){
      setDataChanged(false);
    }else{
      setDataChanged(true);
    }
  }, [name, phoneNumber, photoURL]);

  const saveAccount = async() => {
    setSaving(true);
    const ret = await updateUser(googleUser.uid, {displayName: name, phoneNumber, photoURL});
    setSaving(false);
    if(!ret){
      alert('There are something wrong. Please try again later');
    }else{
      onClose();
    }
  }

  const withdrawAccount = async() => {
    setProcessing(true);
    const ret = await withdraw(googleUser.uid);
    setProcessing(false);
    if(ret){
      router.replace('/');
    }else{
      alert('There are something wrong. Please try again later');
    }
  }

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
            <span>Account</span>
            <Button
                variant='contained'
                color='primary'
                onClick={throttle(saveAccount, 2000, {trailing: false})}
                disabled={saving || !isDataChanged}
            >
              {
                saving ?
                <CircularProgress size={16}/>
                :
                'Save'
              }
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{margin: '24px auto', display: 'flex', justifyContent: 'center'}}>
            <ProfilePhotoUpload
                photo={photoURL}
                onFileChanged={setPhotoURL}
            />
          </div>

          <Typography>
              Name
          </Typography>
          <TextField
            variant='outlined'
            style={{width: 400}}
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />

          <Typography style={{marginTop: 24}}>
              Email
          </Typography>
          <TextField
            variant='outlined'
            style={{width: 400}}
            disabled
            value={user.email}
          />

          <Typography style={{marginTop: 24}}>
              Phone number
          </Typography>
          <TextField
            variant='outlined'
            style={{width: 400}}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <div style={{marginTop: 16}}>
            <Button
              variant='text'
              onClick={throttle(withdrawAccount, 2000, {trailing: false})}
              disabled={processing}
            >
              {
                processing ?
                <CircularProgress size={16}/>
                :
                'Withdraw'
              }
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default AccountDialog;
