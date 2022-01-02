import React from 'react';
import { styled } from '@mui/system';
import TFButtonBase from './ButtonBase';

const ButtonContainer = styled('div')({
    backgroundImage: 'linear-gradient(#0045D1, #5185EE)',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 4
})

const GradientButton = ({text, containerStyle, ...props}) => (
    <TFButtonBase
        containerStyle={containerStyle}
        {...props}
    >
        <ButtonContainer>
            <span style={{color: 'white', textAlign: 'center'}}>{text}</span>
        </ButtonContainer>
    </TFButtonBase>
)

export default GradientButton;