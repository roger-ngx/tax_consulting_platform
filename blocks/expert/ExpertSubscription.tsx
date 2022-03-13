    import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import PhoneVerification from './PhoneVerification';
import Payment from './Payment';
import { useSelector } from 'react-redux';

const Container = styled('div')({
    backgroundColor: '#F6F8FB',
    padding: 20
})

enum STEPS {
    PHONE_VERIFICATION,
    PAYMENT
}

type ExpertSubscriptionProps = {
    onFinish: () => void,
}

const ExpertSubscription : React.FC<ExpertSubscriptionProps> = ({onFinish}) => {
    const [ step, setStep ] = useState(STEPS.PHONE_VERIFICATION);

    const expert = useSelector((state: any) => state.firestore.ordered.enrollExpert[0]);

    useEffect(() => {
        if(expert && expert.phoneNumberVerified){
            setStep(STEPS.PAYMENT);
        }
    }, [expert])

    return (
        <Container>
            <div style={{display: step === STEPS.PHONE_VERIFICATION ? '' : 'none'}}>
                <PhoneVerification onFinish={() => setStep(STEPS.PAYMENT)} />
            </div>
            <div style={{display: step === STEPS.PAYMENT ? '' : 'none'}}>
                <Payment onFinish={onFinish}/>
            </div>
        </Container>
    )
}

export default ExpertSubscription;