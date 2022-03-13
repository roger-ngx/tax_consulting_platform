import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Step, StepLabel, Stepper, Tabs, Tab } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';

import Profile from './Profile';
import Service from './Service';
import PriceView from './Price';
import GradientButton from '../../elements/GradientButton';
import ProfileModel from '../../models/ExpertProfile';
import ExpertProfile from '../../models/ExpertProfile';
import ExpertService from '../../models/ExpertService';
import Price, { ExpertPriceType } from '../../models/Price';
import { addExpert } from '../../firebase/expert';
import { setUserType } from '../../stores/userInfoSlide';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Title = styled('span')({
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
})

const StepperContainer = styled('div')({
    textAlign: 'center',
    marginBottom: 32
})

const STEPS = [ 'Profile', 'Service', 'Price' ]

const EnrollExpert = () => {

    const dispatch = useDispatch();

    const uid = useSelector((state: any) => state.firebase.auth.uid);

    const [ activeStep, setActiveStep ] = useState(1);
    const [ profile, setProfile ] = useState<ExpertProfile>();
    const [ service, setService ] = useState<ExpertService>();
    const [ price, setPrice ] = useState<ExpertPriceType>();

    const [ processing, setProcessing ] = useState(false);
    
    const expert = useSelector((state: any) => state.firestore.ordered.enrollExpert[0]);

    useEffect(() => {
        if(expert){
            console.log('profile', expert.profile);
            setProfile(new ExpertProfile(expert.profile));
            setService(new ExpertService(expert.service));

            const {options, isNegotiable} = expert.price;
            const prices = map(options, priceOption => new Price(priceOption))
            setPrice({options: prices, isNegotiable})
        }
    }, [expert]);

    const checkNextDisabled = () => {
        console.log('profile', profile);
        if(activeStep === 1 && profile){
            return false;
        }
        
        if(activeStep === 2 && service){
            return false;
        }

        if(activeStep === 3 && price){
            return false;
        }

        return true;
    }

    const enrollExpert = async () => {
        if(activeStep < 3){
            setActiveStep(activeStep + 1);
        } else {
            if(profile && service && price){
                setProcessing(true);
                // console.log(profile, service, price);
                const ret = await addExpert({id: uid, profile, service, price})
                setActiveStep(1);
                setProcessing(false);
                dispatch(setUserType('expert'));
            }
        }
    }

    const updateExpertProfile = () => {

    }

    const handleTabChange = (event: any, newValue: number) => {
        setActiveStep(newValue);
    };

    return (
        <Container>
            {
                expert &&
                <Tabs value={activeStep} onChange={handleTabChange}>
                    <Tab label="Profile" value={1}/>
                    <Tab label="Service" value={2}/>
                    <Tab label="Price" value={3}/>
                </Tabs>
            }
            <div style={{width: '100%', backgroundColor: '#F6F8FB', padding: 24}}>
                {
                    !expert &&
                    <StepperContainer>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {STEPS.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </StepperContainer>
                }
                {
                    activeStep === 1 &&
                    <Profile
                        onChange={setProfile}
                        data={expert && expert.profile}
                    />
                }
                {
                    activeStep === 2 &&
                    <Service
                        onChange={setService}
                        data={expert && expert.service}
                    />
                }
                {
                    activeStep === 3 &&
                    <PriceView
                        onChange={
                            (options, isNegotiable) => {
                                setPrice({options, isNegotiable});
                            }
                        }
                        data={expert && expert.price}
                    />
                }
                <div
                    style={{textAlign: 'right', marginTop: 24}}
                >
                    {
                        expert ?
                        <GradientButton
                            text='Save'
                            disabled={checkNextDisabled()}
                            onClick={updateExpertProfile}
                        />
                        :
                        <GradientButton
                            text={activeStep <= 2 ? 'Save and Next' : 'Enroll Expert'}
                            disabled={checkNextDisabled() || processing}
                            onClick={enrollExpert}
                            processing={processing}
                        />
                    }
                </div>
            </div>
        </Container>
    )
}

export default EnrollExpert;