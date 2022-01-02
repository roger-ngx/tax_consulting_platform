import React from 'react';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';

const Container = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...props.containerStyle
}))

type Props = {
    rate: number;
    count: number;
    containerStyle?: object;
}

const ReviewCount: React.FC<Props> = ({rate, count, containerStyle={}}) => {

    return (
        <Container style={containerStyle}>
            <StarIcon sx={{color: '#0045D1', fontSize: 16}} />
            <span style={{marginLeft: 4}}>{rate.toFixed(1)} ({count} reviews)</span>
        </Container>
    )
}

export default ReviewCount;