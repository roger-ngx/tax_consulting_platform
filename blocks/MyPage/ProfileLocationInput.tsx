import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { map, findIndex } from 'lodash';

import LocationAddDialog from "../../dialogs/expert/LocationAddDialog";
import SearchBox from "../../elements/SearchBox"
import { State } from '../../utils/Constants';
import LocationChip from '../../elements/LocationChip';

const Anchor = styled('a')({
    cursor: 'pointer'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8
})

type Props = {
    onChange: (states: State[]) => void,
    data?: State[]
}

const ProfileLocationInput: React.FC<Props> = ({data, onChange}) => {

    const [ openDialog, setOpenDialog ] = useState(false);
    const [ selectedStates, setSelectedStates ] = useState<State[]>([]);

    useEffect(() => {
        setSelectedStates(data || []);
    }, [data]);

    useEffect(() => {
        onChange(selectedStates);
    }, [selectedStates]);

    const deleteState =   (state: State) => {
        const index = findIndex(selectedStates, selectedState => state.name === selectedState.name);
        if(index >= 0){
          selectedStates.splice(index, 1);
          setSelectedStates([...selectedStates]);
        }
      }

    return (
        <div>
            <p style={{marginBottom: 4}}>
                Service Location
            </p>
            <Anchor onClick={() => setOpenDialog(true)}>
                <SearchBox disabled={true} containerStyle={{borderRadius: '4px'}} />
            </Anchor>
            {
                openDialog &&
                <LocationAddDialog
                    states={selectedStates}
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    onSave={setSelectedStates}
                />
            }
            <Horizontal>
                {
                    map(selectedStates, state => (
                        <div style={{marginRight: 8}} key={state.code}>
                            <LocationChip text={state.name} onDelete={() => deleteState(state)}/>
                        </div>
                    ))
                }
            </Horizontal>
        </div>
    )
}

export default ProfileLocationInput;