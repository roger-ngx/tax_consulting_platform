import { useState } from 'react';
import { styled } from '@mui/system';

import LocationAddDialog from "../../dialogs/expert/LocationAddDialog";
import SearchBox from "../../elements/SearchBox"

const Anchor = styled('a')({
    cursor: 'pointer'
})

const ProfileLocationInput = () => {

    const [ openDialog, setOpenDialog ] = useState(false);

    return (
        <div>
            <span style={{marginBottom: '4px'}}>
                Service Location
            </span>
            <Anchor onClick={() => setOpenDialog(true)}>
                <SearchBox disabled={true} containerStyle={{borderRadius: '4px'}} />
            </Anchor>
            {
                openDialog &&
                <LocationAddDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                />
            }
        </div>
    )
}

export default ProfileLocationInput;