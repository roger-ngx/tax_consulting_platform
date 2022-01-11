import React from 'react';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
})

const Notice = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EAEDF2',
    padding: 16,
}))

const Text = styled('span')({
    fontSize: 12
})

type Props ={
    containerStyle?: object
}

const InfoCard = ({containerStyle={}}) => {

    return (
        <Notice style={containerStyle}>
            <Horizontal>
                <InfoIcon sx={{color: '#9B9B9B', fontSize: 16, marginRight: '4px'}}/>
                <span>Please check</span>
            </Horizontal>
            <Text>&middot; A freelancer with an acquired experience of more than 5 years in the field of data entry and web </Text>
            <Text>&middot; A freelancer with an acquired experience of more than 5 years in the </Text>
        </Notice>
    )
}

export default InfoCard;