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
import { Rating, TextField } from '@mui/material';
import { StarRateSharp } from '@mui/icons-material';
import TextArea from '../../elements/TextArea';

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

const CompleteButton = styled(Button)({
    marginTop: 32,
    textTransform: 'none'
})

type Props = {
  open: boolean;
  onClose: () => void,
  onSave: (career: Career) => void
}

const ExpertReviewDialog: React.FC<Props> = ({open, onClose, onSave}) => {
    const [ rate, setRate ] = useState();
    const [ review, setReview ] = useState();

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
                width: 500
            }}
        >
            <TimeContainer>
                <span style={{fontWeight: 'bold', marginRight: 4}}>2021.8.11(Tus)</span>
                <span>am 9:00</span>
            </TimeContainer>
            <Title>
                How about the service with Jhon?
            </Title>
            
            <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                    setRate(newValue);
                }}
                style={{marginBottom: 24}}
                precision={0.5}
                size='large'
                sx={{color: '#0045D1'}}
            /> 

            <TextArea
                title='Leave a review(optional)'
                placeholder='Please leave a detail review to help others.'
                value={review}
                onChange={setReview}
            />
            <CompleteButton
                variant='outlined'
                disabled={!rate}
            >
                Complete
            </CompleteButton>
        </DialogContent>
        </BootstrapDialog>
    );
}

export default ExpertReviewDialog;
