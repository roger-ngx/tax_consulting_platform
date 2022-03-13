import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button, TextField, CircularProgress, InputAdornment } from '@mui/material';
import { size, throttle, isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

import { createVerificationCode, verifyCode } from '../../firebase/phoneVerification';

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type CB = {
    active: boolean
}
const CustomButton = styled(Button)<CB>((props) => ({
    backgroundColor: props.active ? '#0045D1' : '#B7BECA',
    color: 'white',
    textTransform: 'none'
}))

const CustomTextField = styled(TextField)({
    marginRight: 16
})

enum LOADING {
    NONE,
    PHONENUMBER,
    VERIFICATION
}

type PhoneVerificationProps = {
    onFinish: () => void
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({onFinish}) => {
    const uid = useSelector((state: any) => state.firebase.auth.uid);

    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ verificationCode, setVerificationCode ] = useState('');
    const [ verificationId, setVerificationId ] = useState<string>('');
    const [ processing, setProcessing ] = useState(LOADING.NONE);

    const [ timeCount, setTimeCount ] = useState(120);
    const [ timeCountString, setTimeCountString ] = useState('');

    const requestForVerificationId = async () => {
        setProcessing(LOADING.PHONENUMBER);
        const verificationId = await createVerificationCode({uid, phoneNumber})
        setProcessing(LOADING.NONE);

        if(verificationId) {
            setVerificationId(verificationId);
            setTimeCount(120);
        }
    }

    const checkForVerificationCode = async() => {
        setProcessing(LOADING.VERIFICATION);
        const result = await verifyCode({verificationId, verificationCode})
        setProcessing(LOADING.NONE);
        onFinish();
    }

    useEffect(() => {
        const interval = setInterval(() => setTimeCount(count => count - 1), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(timeCount >= 0){
            const minute = '0' + ((timeCount / 60) | 0);
            const second = ('0' + timeCount % 60).slice(-2);

            setTimeCountString(`${minute}:${second}`);
        }
    }, [timeCount]);

    return (
        <div>
            <Horizontal style={{marginBottom: 8}}>
                <CustomTextField
                    placeholder='Type your phone number'
                    fullWidth
                    inputProps={{
                        style: {
                            padding: 8
                        }
                    }}
                    value={phoneNumber}
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                    type='number'
                />
                    <CustomButton
                        active={size(phoneNumber) > 10}
                        onClick={throttle(requestForVerificationId, 2000, { trailing: false })}
                    >
                        {
                            processing===LOADING.PHONENUMBER ?
                            <CircularProgress sx={{color: 'white'}} size={16} />
                            :
                            'Send'
                        }
                    </CustomButton>
            </Horizontal>
            {
                !isEmpty(verificationId) &&
                <Horizontal>
                    <CustomTextField
                        placeholder='Insert your verification code'
                        fullWidth
                        inputProps={{
                            style: {
                                padding: 8
                            },
                            maxLength: 6
                        }}
                        value={verificationCode}
                        onChange={(e: any) => setVerificationCode(e.target.value)}
                        type='tel'
                        InputProps={{
                            endAdornment: <InputAdornment style={{color: 'red'}} position="end">{timeCountString}</InputAdornment>
                        }}
                    />
                    <CustomButton
                        active={size(verificationCode) === 6}
                        onClick={throttle(checkForVerificationCode, 2000, { trailing: false })}
                    >
                        {
                            processing==LOADING.VERIFICATION ?
                            <CircularProgress sx={{color: 'white'}} size={16} />
                            :
                            'Check'
                        }
                    </CustomButton>
                </Horizontal>
            }
        </div>
    )
}

export default PhoneVerification;