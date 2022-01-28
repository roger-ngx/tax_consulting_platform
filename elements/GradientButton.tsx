import React from 'react';
import { styled } from '@mui/system';
import TFButtonBase from './TFButtonBase';
import { ButtonProps } from '@mui/material';

type BCProps = {
    disabled: boolean
}
const ButtonContainer = styled('div')<BCProps>(props => ({
    backgroundImage: props.disabled ? '' : 'linear-gradient(#0045D1, #5185EE)',
    backgroundColor: props.disabled ? '#B7BECA' : '',
    padding: 16,
    borderRadius: 4
}))

type Props = ButtonProps & {
    text: string,
    containerStyle?: object
}

const GradientButton: React.FC<Props> = ({text, containerStyle={}, ...props}) => (
    <TFButtonBase
        containerStyle={containerStyle}
        {...props}
    >
        <ButtonContainer disabled={!!props.disabled}>
            <span style={{color: 'white', textAlign: 'center'}}>{text}</span>
        </ButtonContainer>
    </TFButtonBase>
)

export default GradientButton;