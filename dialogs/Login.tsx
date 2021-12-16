import React, { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';

import ButtonBase from '../elements/ButtonBase';
import { loginWithGoogle } from '../firebase/login';

const Content = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24
})

const LoginButton = styled(Button)({

})

const Login = ({open, onClose}) => {

    const dispatch = useDispatch();
    const [ processing, setProcessing ] = useState(false);

    const doLogin = () => {
        loginWithGoogle({dispatch}).then(data => {
            onClose();
            console.log(data);
        }).catch(ex => {
            console.log(ex);
        }).finally(() => setProcessing(false));
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <IconButton
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div style={{width: 300}}>
                    <Content>
                        <img src='/assets/icons/logo.png' style={{height: 24, marginBottom: 8}} />
                        <span>Happly Tax Life</span>
                    </Content>
                    <div style={{textAlign: 'center'}}>
                        <ButtonBase onClick={doLogin} disabled={processing}>
                            <div style={{fontSize: 0, padding: '8px 32px', backgroundColor: '#EAEDF2', borderRadius: 4, width: 190}}>
                                {
                                    processing ?
                                    <CircularProgress style={{width: 24, height: 24}}/>
                                    :
                                    <img src='/assets/images/google_login.png' style={{height: 24}}/>
                                }
                            </div>
                        </ButtonBase>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Login;