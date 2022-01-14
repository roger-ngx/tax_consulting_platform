import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DialogActions, Divider, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import GradientButton from '../../elements/GradientButton';
import Career from '../../models/Career';
import TFButtonBase from '../../elements/TFButtonBase';
import InfoCard from '../../elements/InfoCard';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  }
}));

const TimeContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#0045D1'
})

const Title = styled('div')({
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 24
})

const CancelButton = styled(Button)({
    color: 'red',
    marginTop: 32,
    textTransform: 'none'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const HeaderContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
})

const Header = () => {
    
    return (
        <TFButtonBase containerStyle={{width: '100%'}}>
            <HeaderContainer>
                <Horizontal>
                    <EventAvailableIcon />
                    <span style={{fontWeight: '500', fontSize: 18}}>Calendar</span>
                </Horizontal>
                <Horizontal>
                    <span style={{fontWeight: '500', fontSize: 18, color: '#0045D1'}}>8.11(Tus)</span>
                    <KeyboardArrowDownIcon />
                </Horizontal>
            </HeaderContainer>
        </TFButtonBase>
    )
}

type Props = {
  open: boolean;
  onClose: () => void,
  onSave: () => void
}

const ReservationTimeChangingDialog: React.FC<Props> = ({open, onClose, onSave}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
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
                </div>
            </DialogTitle>
            <DialogContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        overflow: 'scroll',
                        scrollbarWidth: 'none' 
                    }}
                >
                    <Header />
                    <div style={{flex: 1}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                value={selectedDate}
                                onChange={(value: any) => setSelectedDate(value)}
                                openTo="day"
                                renderInput={(params) => <TextField {...params} />}
                                style={{flex: 1}}
                            />
                        </LocalizationProvider>
                    </div>
                    <Divider/>
                    <Header />

                    <InfoCard containerStyle={{marginTop: 32, marginBottom: 16, width: '100%'}}/>
                </div>

                <GradientButton
                    text='Change a date'
                />
            </DialogContent>
            <style jsx>{`
            *{
                -ms-overflow-style: none;
            }
            ::-webkit-scrollbar {
                display: none;
            }
            `}</style>
        </BootstrapDialog>
    );
}

export default ReservationTimeChangingDialog;