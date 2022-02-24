import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { join, size, map } from 'lodash';

import FilterButton from '../elements/FilterButton';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import LocationAddDialog from '../dialogs/expert/LocationAddDialog';
import { State } from '../utils/Constants';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
    onSearchingStatesChanged: (states: string[]) => void
}

const Filter: React.FC<Props> = ({onSearchingStatesChanged}) => {

    const [ sortBy, setSortBy ] = useState('1');
    const [ showLocationSelectDialog, setShowLocationSelectDialog ] = useState(false);
    const [ searchingStates, setSearchingStates ] = useState<State []>([]);

    useEffect(() => {
        const states = map(searchingStates, (state: State) => state.code);
        onSearchingStatesChanged(states);
    }, [searchingStates]);

    return (
        <Container>
            <FilterButton
                text={size(searchingStates) ? join(map(searchingStates, state => state.code), ', ') : 'Location'}
                startIcon={<FmdGoodOutlinedIcon />}
                containerStyle={{marginRight: 8}}
                onClick={() => setShowLocationSelectDialog(true)}
                active={size(searchingStates) > 0}
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
                onChange={(e:SelectChangeEvent) => setSortBy(e.target.value)}
            >
                <MenuItem value='1'>Most popular</MenuItem>
                <MenuItem value='2'>Most recommended</MenuItem>
                <MenuItem value='3'>Most responsive</MenuItem>
                <MenuItem value='4'>Most reviews</MenuItem>
            </Select>
            <LocationAddDialog
                open={showLocationSelectDialog}
                onClose={() => setShowLocationSelectDialog(false)}
                onSave={(states: State[]) => setSearchingStates(states)}
            />
        </Container>
    )
}

export default Filter;