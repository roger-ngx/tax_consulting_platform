import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Step, Stepper, StepLabel, Button, Input, CircularProgress } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useSelector, useDispatch } from 'react-redux';
import { get, isEmpty, throttle } from 'lodash';
import { useRouter } from 'next/router';

import Avatar from '../elements/Avatar';
import CancelReservationDialog from '../dialogs/user/CancelReservationDialog';
import ReservationTimeChangingDialog from '../dialogs/user/ReservationTimeChangingDialog';
import ExpertReviewDialog from '../dialogs/user/ExpertReviewDialog';
import PriceCard from '../blocks/expert/PriceCard';
import { Reservation, RESERVATION_STATUS } from '../models/Reservation';
import { updateReservationStatus, updateReservationAnswer } from '../firebase/reservation';
import { createMessageThread } from '../firebase/messageController';
import { setCurrentThreadId } from '../stores/messageSlide';
import { useFirestoreConnect } from 'react-redux-firebase';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
})

const Horizontal = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

const ButtonContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24
})

const Header = styled('div')({
    backgroundImage: 'linear-gradient(#3E4A63, #687795)',
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

type AnswerInputProps = {
    processing: boolean;
    onSubmit: (answer: string) => void;
    onCancel: () => void
}

const AnswerInput = (props: AnswerInputProps) => {
    const {processing, onSubmit, onCancel} = props;

    const [ answer, setAnswer ] = useState('');

    const cancelAnswer = () => {
        setAnswer('');
        onCancel();
    }

    const submitAnswer = () => onSubmit(answer);

    return (
        <div style={{marginTop: 24}}>
            <Input
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                autoFocus
                style={{
                    width: '100%',
                    marginBottom: 16,
                    padding: 16
                }}
                sx={{
                    border: 'solid 1px #C7C7C7',
                }}
                disableUnderline={true}
                rows={3}
                multiline
            />
            <Horizontal style={{alignSelf: 'flex-end'}}>
                <Button
                    variant='outlined'
                    color='error'
                    onClick={cancelAnswer}
                    disabled={processing}
                    style={{marginRight: 16}}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitAnswer}
                    disabled={isEmpty(answer) || processing}
                >
                    {
                        processing ?
                        <CircularProgress sx={{color: 'white'}} size={16}/>
                        :
                        'Submit'
                    }
                </Button>
            </Horizontal>
        </div>
    )
}

const ReservedExpert = ({}) => {

    const [ openCancelDialog, setOpenCancelDialog ] = useState(false);
    const [ openDatetimeChangingDialog, setOpenDatetimeChangingDialog ] = useState(false);
    const [ openReviewDialog, setOpenReviewDialog ] = useState(false);
    const [ answerInputShow, setAnswerInputShow ] = useState(false);
    const [ processing, setProcessing ] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const { isFinished, id } = router.query;

    const item = useSelector(state => get(state, `firestore.data.reservation-${id}`));

    //this user is an expert
    const expertId = useSelector((state: any) => state.firebase.auth.uid);

    useFirestoreConnect([{
        collection: 'experts',
        doc: expertId,
        subcollections: [{
            collection: 'reservations',
            doc: id as string
        }],
        storeAs: `reservation-${id}`
    }]);

    if(!item){
        return null;
    }

    const reservation = new Reservation({id, ...item});

    const { title, detail, value, unit } = reservation.price;

    const updateStatus = async (status: string, cancelReason?: string) => {
        setProcessing(true);
        try{
            const ret = await updateReservationStatus({
                status,
                expertId,
                uid: get(reservation, 'user.uid'),
                reservationId: reservation.id,
                reservationTime: reservation.dateTime.toDate(),
                cancelReason
            });
        }catch(ex){
            console.log('updateStatus', ex);
        }
        setProcessing(false);
    }

    const submitAnswer = async (answer: string) => {
        setProcessing(true);

        console.log('reservation', reservation);

        try{
            const ret = await updateReservationAnswer({
                answer,
                expertId,
                uid: get(reservation, 'user.uid'),
                reservationId: reservation.id
            });
            setAnswerInputShow(false);
        }catch(ex){
            console.log('submitAnswer', ex);
            alert('Server error. Plz try again.')
        }
        setProcessing(false);
    }

    const startChatting = async () => {
        setProcessing(true);
        const threadId = await createMessageThread({srcUserId: expertId, desUserId: item.user.uid})
        setProcessing(false);
        if(threadId){
            dispatch(setCurrentThreadId(threadId));
            router.push('/messages');
        }else{
            alert('There are something wrong. See the browser logs');
        }
    }

    return (
        <Container>
            <Header>
                <Date>{reservation.date}</Date>
                <Time>{reservation.time}</Time>
                <div style={{position: 'absolute', bottom: -50, textAlign: 'center', width: '100%'}}>
                    <Avatar
                        size={100}
                        src={get(reservation, 'user.photoURL')}
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
                        onClick={throttle(startChatting, 2000, { trailing: false })}
                        disabled={processing}
                    >
                        {
                            processing ? 
                            <CircularProgress size={16} sx={{color: 'white'}} />
                            :
                            'Chatting'
                        }
                    </ChattingButton>
                </ButtonContainer>

                <TextContainer>
                    <TextTitle>Price</TextTitle>
                    <PriceCard
                        type={title!}
                        matching={20}
                        detail={detail!}
                        price={`$${value} ${unit}`}
                        containerStyle={{marginBottom: 20}}
                    />
                </TextContainer>

                {
                    reservation.question && <>
                        <TextContainer>
                            <TextTitle>Inquiry</TextTitle>
                            <TextBox>
                                {reservation.question}
                            </TextBox>
                            {
                                !reservation.answer && !answerInputShow &&
                                <div style={{textAlign: 'right', marginTop: 8}}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={() => setAnswerInputShow(true)}
                                    >
                                        Answer
                                    </Button>
                                </div>
                            }
                            {
                                answerInputShow &&
                                <AnswerInput
                                    processing={processing}
                                    onSubmit={submitAnswer}
                                    onCancel={() => setAnswerInputShow(false)}
                                />
                            }
                        </TextContainer>

                        {
                            reservation.answer &&
                            <TextContainer>
                                <TextTitle>Answer</TextTitle>
                                <TextBox>
                                    {reservation.answer}
                                </TextBox>
                            </TextContainer>
                        }
                    </>
                }
                {
                    reservation.status===RESERVATION_STATUS.REQUEST &&
                    <Horizontal>
                        <ChattingButton
                            style={{flex: 1, marginRight: 12}}
                            onClick={() => updateStatus(RESERVATION_STATUS.APPROVE)}
                        >
                            Approve
                        </ChattingButton>
                        <CancelButton
                            style={{flex: 1}}
                            onClick={() => setOpenCancelDialog(true)}
                        >
                            Cancel
                        </CancelButton>
                    </Horizontal>
                }
            </Body>
            <CancelReservationDialog
                reservation={reservation}
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                onSave={(reason) => updateStatus(RESERVATION_STATUS.CANCEL, reason)}
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

export default ReservedExpert;