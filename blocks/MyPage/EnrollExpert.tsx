import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Step, StepLabel, Stepper } from '@mui/material';

import Profile from './Profile';
import Service from './Service';
import PriceView from './Price';
import GradientButton from '../../elements/GradientButton';
import ProfileModel from '../../models/ExpertProfile';
import ExpertProfile from '../../models/ExpertProfile';
import ExpertService from '../../models/ExpertService';
import Price from '../../models/Price';

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

    const [ activeStep, setActiveStep ] = useState(1);
    const [ profile, setProfile ] = useState<ExpertProfile>();
    const [ service, setService ] = useState<ExpertService>();
    const [ price, setPrice ] = useState<Price[]>();

    const checkNextDisabled = () => {
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

    return (
        <Container>
            <div style={{width: '100%', backgroundColor: '#F6F8FB', padding: 24}}>
                <StepperContainer>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </StepperContainer>
                {
                    activeStep === 1 &&
                    <Profile
                        onChange={setProfile}
                    />
                }
                {
                    activeStep === 2 &&
                    <Service
                        onChange={setService}
                    />
                }
                {
                    activeStep === 3 &&
                    <PriceView
                        onChange={setPrice}
                    />
                }
                <div
                    style={{textAlign: 'right', marginTop: 24}}
                >
                    <GradientButton
                        text={activeStep < 2 ? 'Save and Next' : 'Enroll Expert'}
                        disabled={checkNextDisabled()}
                        onClick={() => setActiveStep(activeStep + 1)}
                    />
                </div>
            </div>
        </Container>
    )
}

export default EnrollExpert;