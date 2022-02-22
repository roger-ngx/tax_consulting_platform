import React from 'react';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import TFButtonBase from '../../elements/TFButtonBase';

const Container = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
}))

const ButtonContainer = styled('div')({
    backgroundImage: 'linear-gradient(#0045D1, #5185EE)',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 4
})

type Props = {
    containerStyle?:object,
    goToReservation: () => void,
    goToChat: () => void,
    disabled?: boolean
}

const ServiceButtons: React.FC<Props> = ({containerStyle, goToReservation, goToChat, disabled=false}) => {

    return (
        <Container style={containerStyle}>
            <IconButton
                onClick={goToChat}
                disabled={disabled}
            >
                <ChatBubbleOutlineIcon />
            </IconButton>
            <TFButtonBase
                containerStyle={{flex: 1, marginLeft: 16}}
                onClick={goToReservation}
                disabled={disabled}
            >
                <ButtonContainer>
                    <span style={{color: 'white', textAlign: 'center'}}>make a reservation</span>
                </ButtonContainer>
            </TFButtonBase>
        </Container>
    )
}

export default ServiceButtons;