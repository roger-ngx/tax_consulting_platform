import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, TextField } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/lab';
import dayjs from 'dayjs';

import GradientButton from '../../elements/GradientButton';
import Career from '../../models/Career';
import TFButtonBase from '../../elements/TFButtonBase';
import InfoCard from '../../elements/InfoCard';
import TimePicker from '../../elements/TimePicker';

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

type HeaderProps = {
    title: string;
    subTitle?: string;
    onClick: () => void;
    icon: any,
    close: boolean
}

const Header: React.FC<HeaderProps> = ({onClick, title, subTitle, icon, close}) => {
    
    return (
        <TFButtonBase containerStyle={{width: '100%'}} onClick={onClick}>
            <HeaderContainer>
                <Horizontal>
                    {icon}
                    <span style={{fontWeight: '500', fontSize: 18}}>{title}</span>
                </Horizontal>
                <Horizontal>
                    <span style={{fontWeight: '500', fontSize: 18, color: '#0045D1'}}>{subTitle}</span>
                    { close ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </Horizontal>
            </HeaderContainer>
        </TFButtonBase>
    )
}

type Props = {
  open: boolean;
  onClose: () => void,
  onSave: () => void,
  dateTime: dayjs.Dayjs
}

const ReservationTimeChangingDialog: React.FC<Props> = ({open, dateTime, onClose, onSave}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string>();
    const [ selectedHeader, setSelectedHeader ] = useState(0);

    useEffect(() => {
        if(dateTime){
            setSelectedDate(dateTime.toDate());
            setSelectedTime(dateTime.format('HH:mm A'));
        }
    }, [dateTime]);

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
                    <Header
                        close={selectedHeader !== 1}
                        title='Calendar'
                        icon={<EventAvailableIcon />}
                        subTitle={dayjs(selectedDate).format('DD-MM(ddd)')}
                        onClick={() => setSelectedHeader(selectedHeader===1 ? 0 : 1)}
                    />
                    {
                        selectedHeader === 1 &&
                        <div style={{flex: 1}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    value={selectedDate}
                                    onChange={(value: any) => setSelectedDate(value)}
                                    openTo="day"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    }
                    <Divider/>
                    <Header
                        title='Time'
                        subTitle={selectedTime}
                        icon={<AccessTimeIcon />}
                        onClick={() => setSelectedHeader(selectedHeader===2 ? 0 : 2)}
                        close={selectedHeader !== 2}
                    />
                    {
                        selectedHeader === 2 &&
                        <TimePicker
                            onChange={setSelectedTime}
                            // reserved={reserved}
                            showIcon={false}
                        />
                    }
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