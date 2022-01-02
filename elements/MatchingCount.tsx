import React from 'react';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
    count: number;
}

const MatchingCount: React.FC<Props> = ({count}) => {

    return (
        <Container>
            <PeopleIcon sx={{color: '#0045D1', fontSize: 20}} />
            <span style={{marginLeft: 4}}>Matching {count}</span>
        </Container>
    )
}

export default MatchingCount;