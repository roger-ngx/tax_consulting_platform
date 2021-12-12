import React from 'react';
import { styled } from '@mui/material/styles';
import ProfileInput from './ProfileInput';
import PhotosUploader from './PhotosUploader';
import TextArea from '../../elements/TextArea';
import ButtonBase from '../../elements/ButtonBase';

const Container = styled('div')({

})

const Service = () => {

    return (
        <Container>
            <span style={{marginBottom: '4px'}}>
                Category
            </span>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <ButtonBase containerStyle={{flex: 1}}>
                    <div style={{flex: 1, padding: 8, backgroundColor: '#0045D1', }}>
                        <span style={{fontWeight: 'bold', color: 'white'}}>Tax</span>
                    </div>
                </ButtonBase>
                <ButtonBase containerStyle={{flex: 1, margin: '0 8px'}}>
                    <div style={{flex: 1, padding: 8, backgroundColor: '#0045D1'}}>
                        <span style={{fontWeight: 'bold', color: 'white'}}>Fund</span>
                    </div>
                </ButtonBase>
                <ButtonBase containerStyle={{flex: 1}}>
                    <div style={{flex: 1, padding: 8, backgroundColor: '#0045D1'}}>
                        <span style={{fontWeight: 'bold', color: 'white'}}>Accountance</span>
                    </div>
                </ButtonBase>
            </div>

            <TextArea
                title='Explanation'
                placeholder='Text service explanation'
            />

            <PhotosUploader />

            <ProfileInput title='Video link (Ad)' />
        </Container>
    )
}

export default Service;