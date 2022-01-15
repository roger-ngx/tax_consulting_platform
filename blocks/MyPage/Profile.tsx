import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

import ProfilePhotoUpload from '../../elements/ProfilePhotoUpload';
import ProfileCareerInput from './ProfileCareerInput';
import ProfileEducationInput from './ProfileEducationInput';
import ProfileCertificateInput from './ProfileCertificateInput';
import ProfileLocationInput from './ProfileLocationInput';

const Container = styled('div')({

})

const Profile = () => {

    return (
        <Container>
            <div style={{margin: '24px auto', display: 'flex'}}>
                <ProfilePhotoUpload
                    onFileChanged={url => {}}
                />
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

            <ProfileCareerInput />

            <ProfileEducationInput />

            <ProfileCertificateInput />

            <ProfileLocationInput />
            
            <FormControlLabel control={<Checkbox defaultChecked />} label="Working now" />
        </Container>
    )
}

export default Profile;