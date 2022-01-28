import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { isEmpty } from 'lodash';

import ProfilePhotoUpload from '../../elements/ProfilePhotoUpload';
import ProfileCareerInput from './ProfileCareerInput';
import ProfileEducationInput from './ProfileEducationInput';
import ProfileCertificateInput from './ProfileCertificateInput';
import ProfileLocationInput from './ProfileLocationInput';
import Career from '../../models/Career';
import Education from '../../models/Education';
import Certificate from '../../models/Certificate';
import { State } from '../../utils/Constants';
import ProfileModel from '../../models/ExpertProfile';

const Container = styled('div')({

})

type Props = {
    onChange: (param: ProfileModel) => void
}

const Profile: React.FC<Props> = ({onChange}) => {

    const [ introduction, setIntroduction ] = useState('');
    const [ profilePhotoURL, setProfilePhotoURL ] = useState('');
    const [ careers, setCareers ] = useState<Career[]>([]);
    const [ educations, setEducations ] = useState<Education[]>([])
    const [ certificates, setCertificates ] = useState<Certificate[]>([]);
    const [ states, setStates ] = useState<State[]>([]);

    useEffect(() => {
        if(isEmpty(introduction) || isEmpty(profilePhotoURL) || isEmpty(careers) || isEmpty(educations) || isEmpty(certificates) || isEmpty(states)){
            return;
        }
        onChange(new ProfileModel({
            introduction, photoURL: profilePhotoURL,
            careers, educations, certificates,
            availableStates: states
        }))
    }, [introduction, profilePhotoURL, careers, educations, certificates, states]);

    return (
        <Container>
            <div style={{margin: '24px auto', display: 'flex'}}>
                <ProfilePhotoUpload
                    onFileChanged={setProfilePhotoURL}
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
                value={introduction}
                onChange={e => setIntroduction(e.target.value)}
            />

            <ProfileCareerInput
                onChange={setCareers}
            />

            <ProfileEducationInput
                onChange={setEducations}
            />

            <ProfileCertificateInput
                onChange={setCertificates}
            />

            <ProfileLocationInput
                onChange={setStates}
            />
            
            <FormControlLabel control={<Checkbox defaultChecked />} label="Working now" />
        </Container>
    )
}

export default Profile;