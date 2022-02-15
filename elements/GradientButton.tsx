import React from 'react';
import { styled } from '@mui/system';
import TFButtonBase from './TFButtonBase';
import { ButtonProps, CircularProgress } from '@mui/material';

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
    containerStyle?: object,
    processing?: boolean
}

const GradientButton: React.FC<Props> = ({text, processing, containerStyle={}, ...props}) => (
    <TFButtonBase
        containerStyle={containerStyle}
        {...props}
        disabled={processing}
    >
        <ButtonContainer disabled={!!props.disabled}>
            {
                processing ?
                <CircularProgress sx={{color:'white', fontSize: 0}} size={16}/>
                :
                <span style={{color: 'white', textAlign: 'center'}}>{text}</span>
            }
        </ButtonContainer>
    </TFButtonBase>
)

export default GradientButton;