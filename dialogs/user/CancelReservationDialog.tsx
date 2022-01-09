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

import Career from '../../models/Career';
import { TextField } from '@mui/material';

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

type Props = {
  open: boolean;
  onClose: () => void,
  onSave: (career: Career) => void
}

const CancelReservationDialog: React.FC<Props> = ({open, onClose, onSave}) => {
    const [ selectedReason, setSelectedReason ] = useState();
    const [ etcReason, setEtcReason ] = useState();

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
                flexDirection: 'column'
            }}
        >
            <TimeContainer>
                <span style={{fontWeight: 'bold', marginRight: 4}}>2021.8.11(Tus)</span>
                <span>am 9:00</span>
            </TimeContainer>
            <Title>
                Do you want to cancel reservation with Jhon?
            </Title>
            <FormControl component="fieldset">
                <FormLabel
                    component="legend"
                    style={{color: 'black', marginBottom: 24}}
                >
                    Select reason for cancellation
                </FormLabel>
                <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={selectedReason}
                    onChange={e => setSelectedReason(e.target.value)}
                >
                    <FormControlLabel value="1" control={<Radio />} label="Personal situation" />
                    <FormControlLabel value="2" control={<Radio />} label="Matched with other expert" />
                    <FormControlLabel value="3" control={<Radio />} label="Can’t contact with the expert" />
                    <FormControlLabel value="4" control={<Radio />} label="No spectial reason" />
                    <FormControlLabel value="5" control={<Radio />} label="Etc" />
                </RadioGroup>
                {
                    selectedReason === '5' &&
                    <TextField
                        rows={4}
                        multiline
                        value={etcReason}
                        onChange={e => setEtcReason(e.target.value)}
                    />
                }
            </FormControl>
            <CancelButton
                variant='outlined'
            >
                Cancel a reservation
            </CancelButton>
        </DialogContent>
        </BootstrapDialog>
    );
}

export default CancelReservationDialog;
