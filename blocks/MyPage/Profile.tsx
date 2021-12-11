import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ProfilePhotoUpload from '../../elements/ProfilePhotoUpload';
import ProfileInput from './ProfileInput';
import SearchBox from '../../elements/SearchBox';

const Container = styled('div')({

})

const Profile = () => {

    return (
        <Container>
            <div style={{margin: '24px auto', display: 'flex'}}>
                <ProfilePhotoUpload />
            </div>

            <span style={{marginBottom: '4px'}}>
                Introduce
            </span>
            <TextField
                variant='outlined'
                style={{width: '100%'}}
                multiline
                rows={5}
            />

            <ProfileInput title='Career' />

            <ProfileInput title='Education' />

            <ProfileInput title='Certificate' />

            <span style={{marginBottom: '4px'}}>
                Service Location
            </span>
            <SearchBox containerStyle={{borderRadius: '4px'}} />
            
            <FormControlLabel control={<Checkbox defaultChecked />} label="Working now" />
        </Container>
    )
}

export default Profile;