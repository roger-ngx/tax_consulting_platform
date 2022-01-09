import React, { useState } from 'react';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import FilterButton from '../elements/FilterButton';
import { MenuItem, Select } from '@mui/material';
import LocationAddDialog from '../dialogs/expert/LocationAddDialog';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const Filter = () => {

    const [ sortBy, setSortBy ] = useState(1);
    const [ showLocationSelectDialog, setShowLocationSelectDialog ] = useState(false);

    return (
        <Container>
            <FilterButton
                text='Location'
                startIcon={<FmdGoodIcon />}
                containerStyle={{marginRight: 8}}
                onClick={() => setShowLocationSelectDialog(true)}
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
                containerStyle={{marginRight: 8}}
            />
            <Select
                value={sortBy}
                style={{
                    borderRadius: 100,
                    height: 36,
                    paddingRight: 16, paddingLeft: 16
                }}
                onChange={e => setSortBy(e.target.value)}
            >
                <MenuItem value={1}>Most popular</MenuItem>
                <MenuItem value={2}>Most recommended</MenuItem>
                <MenuItem value={3}>Most responsive</MenuItem>
                <MenuItem value={4}>Most reviews</MenuItem>
            </Select>
            <LocationAddDialog
                open={showLocationSelectDialog}
                onClose={() => setShowLocationSelectDialog(false)}
            />
        </Container>
    )
}

export default Filter;