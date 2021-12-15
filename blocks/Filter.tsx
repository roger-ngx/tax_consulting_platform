import React from 'react';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import FilterButton from '../elements/FilterButton';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const Filter = () => {

    return (
        <Container>
            <FilterButton
                text='Location'
                startIcon={<FmdGoodIcon />}
                containerStyle={{marginRight: 8}}
            />
            <FilterButton
                text='Immediately'
                activeIcon={<CheckIcon />}
                active={true}
                containerStyle={{marginRight: 8}}
            />
            <FilterButton
                text='Online'
                activeIcon={<CheckIcon />}
            />
        </Container>
    )
}

export default Filter;