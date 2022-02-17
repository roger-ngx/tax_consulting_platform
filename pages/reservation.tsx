import React, { useState } from 'react';
import { styled } from '@mui/system';
import Avatar from '../elements/Avatar';
import { Step, Stepper, StepLabel, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

import ExpertInfo from '../blocks/expert/Info';
import CancelReservationDialog from '../dialogs/user/CancelReservationDialog';
import ReservationTimeChangingDialog from '../dialogs/user/ReservationTimeChangingDialog';
import ExpertReviewDialog from '../dialogs/user/ExpertReviewDialog';
import { Reservation } from '../models/Reservation';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
})

const ButtonContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24
})

const Header = styled('div')({
    backgroundImage: 'linear-gradient(#0045D1, #5185EE)',
    height: 200,
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 50
})

const Body = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
})

const StepperContainer = styled('div')({
    width: '60%',
    marginTop: 60,
    textAlign: 'center',
    marginBottom: 32
})

const Date = styled('span')({
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginTop: 32
})

const Time = styled('span')({
    color: 'white',
    fontSize: 16
})

const CalendarButton = styled(Button)({
    textTransform: 'none',
    color: 'black',
    borderColor: '#C7C7C7',
    borderRadius: 100,
    width: 250,
    paddingTop: 16, 
    paddingBottom: 16,
    marginRight: 24
})

const ChattingButton = styled(Button)({
    textTransform: 'none',
    color: 'white',
    borderRadius: 100,
    width: 250,
    paddingTop: 16, 
    paddingBottom: 16,
    backgroundImage: 'linear-gradient(#0045D1, #5185EE)'
})

const CancelButton = styled(Button)({
    textTransform: 'none',
    color: 'red',
    borderRadius: 100,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#EAEDF2'
})

const TextTitle = styled('div')({
    marginBottom: 4
})

const TextBox = styled('div')({
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    padding: 16,
    width: '100%'
})

const TextContainer = styled('div')({
    width: '100%',
    marginBottom: 24
})

const steps = [
    'Request',
    'Approved',
    'Progress',
    'Complete'
]

const ReservationView = ({}) => {

    const [ openCancelDialog, setOpenCancelDialog ] = useState(false);
    const [ openDatetimeChangingDialog, setOpenDatetimeChangingDialog ] = useState(false);
    const [ openReviewDialog, setOpenReviewDialog ] = useState(false);

    const router = useRouter();
    const { isFinished, id } = router.query;

    const item = useSelector(state => get(state, `firestore.data.reservations[${id}]`));

    if(!item){
        return null;
    }

    const reservation = new Reservation(item);

    return (
        <Container>
            <Header>
                <Date>{reservation.date}</Date>
                <Time>{reservation.time}</Time>
                <div style={{position: 'absolute', bottom: -50, textAlign: 'center', width: '100%'}}>
                    <Avatar
                        size={100}
                        src='/assets/images/profile.png'
                    />
                </div>
            </Header>
            <Body>
                <StepperContainer>
                    <Stepper activeStep={reservation.step} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </StepperContainer>
                <ExpertInfo
                    data={{}}
                    containerStyle={{marginBottom: 32, backgroundColor: '#F6F8FB'}}
                />
                <ButtonContainer>
                    <CalendarButton
                        variant='outlined'
                        startIcon={!isFinished && <EventAvailableIcon />}
                        onClick={() => isFinished ? setOpenReviewDialog(true) : setOpenDatetimeChangingDialog(true)}
                    >
                        {isFinished ? 'Leave a review' : 'Change a date'}
                    </CalendarButton>
                    <ChattingButton
                        startIcon={<InsertCommentIcon />}
                    >
                        Chatting
                    </ChattingButton>
                </ButtonContainer>

                {
                    reservation.question && <>
                        <TextContainer>
                            <TextTitle>My inquiry</TextTitle>
                            <TextBox>
                                {reservation.question}
                            </TextBox>
                        </TextContainer>

                        <TextContainer>
                            <TextTitle>Answer</TextTitle>
                            <TextBox>
                                {reservation.answer}
                            </TextBox>
                        </TextContainer>
                    </>
                }
                <CancelButton
                    onClick={() => setOpenCancelDialog(true)}
                >
                    Cancel
                </CancelButton>
            </Body>
            <CancelReservationDialog
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                onSave={() => {}}
            />
            <ReservationTimeChangingDialog
                dateTime={reservation.dateTime}
                open={openDatetimeChangingDialog}
                onClose={() => setOpenDatetimeChangingDialog(false)}
                onSave={() => {}}
            />
            <ExpertReviewDialog
                open={openReviewDialog}
                onClose={() => setOpenReviewDialog(false)}
                onSave={() => {}}
            />
        </Container>
    )
}

export default ReservationView;