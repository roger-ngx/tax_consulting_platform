import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { isEmpty, map } from 'lodash';

import ProfilePhotoUpload from '../../elements/ProfilePhotoUpload';
import ProfileCareerInput from './ProfileCareerInput';
import ProfileEducationInput from './ProfileEducationInput';
import ProfileCertificateInput from './ProfileCertificateInput';
import ProfileLocationInput from './ProfileLocationInput';
import Career from '../../models/Career';
import Education from '../../models/Education';
import Certificate from '../../models/Certificate';
import { State } from '../../utils/Constants';
import ExpertProfile, { IProfile } from '../../models/ExpertProfile';

const Container = styled('div')({

})

type Props = {
    onChange: (param: ExpertProfile) => void,
    data?: IProfile
}

const Profile: React.FC<Props> = ({data, onChange}) => {

    const [ introduction, setIntroduction ] = useState('');
    const [ profilePhoto, setProfilePhoto ] = useState<string>();
    const [ careers, setCareers ] = useState<Career[]>([]);
    const [ educations, setEducations ] = useState<Education[]>([])
    const [ certificates, setCertificates ] = useState<Certificate[]>([]);
    const [ states, setStates ] = useState<State[]>([]);

    useEffect(() => {
        if(data){
            console.log('data', data);
            setIntroduction(data.introduction);
            setProfilePhoto(data.photo);
            // setCareers(map(data.careers, career => new Career(career)));
            // setEducations(map(data.educations, education => new Education(education)));
            // setCertificates(map(data.certificates, certificate => new Certificate(certificate)));
            // setStates(data.availableStates);
        }
    }, [data]);

    useEffect(() => {
        if(isEmpty(introduction) || !profilePhoto || isEmpty(careers) || isEmpty(educations) || isEmpty(certificates) || isEmpty(states)){
            //https://stackoverflow.com/questions/60689528/issue-with-lodashs-isempty-when-dealing-with-files
            return;
        }
        onChange(new ExpertProfile({
            introduction, photo: profilePhoto,
            careers, educations, certificates,
            availableStates: states
        }))
    }, [introduction, profilePhoto, careers, educations, certificates, states]);

    return (
        <Container>
            <div style={{margin: '24px auto', display: 'flex'}}>
                <ProfilePhotoUpload
                    onFileChanged={setProfilePhoto}
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
                onChange={(e: any) => setIntroduction(e.target.value)}
            />

            <ProfileCareerInput
                data={data && data.careers}
                onChange={setCareers}
            />

            <ProfileEducationInput
                data={data && data.educations}
                onChange={setEducations}
            />

            <ProfileCertificateInput
                onChange={setCertificates}
                data={data && data.certificates}
            />

            <ProfileLocationInput
                onChange={setStates}
                data={data && data.availableStates}
            />
            
            {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Working now" /> */}
        </Container>
    )
}

export default Profile;