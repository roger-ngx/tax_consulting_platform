import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import ProfileInput from './ProfileInput';
import PhotosUploader from './PhotosUploader';
import TextArea from '../../elements/TextArea';
import ButtonBase from '../../elements/ButtonBase';
import PriceAddDialog from '../../dialogs/expert/PriceAddDialog';

const Container = styled('div')({

})

const Title = styled('div')({
    marginBottom: 4,
    fontWeight: 'bold'
})

const Part = styled('div')({
    marginBottom: 32
})

const Service = () => {

    return (
        <Container>
            <Part>
                <Title>
                    Category
                </Title>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <ButtonBase containerStyle={{flex: 1}}>
                        <div style={{flex: 1, padding: 8, backgroundColor: '#0045D1', }}>
                            <span style={{fontWeight: 'bold', color: 'white'}}>Tax</span>
                        </div>
                    </ButtonBase>
                    <ButtonBase containerStyle={{flex: 1, margin: '0 8px'}}>
                        <div style={{flex: 1, padding: 8, backgroundColor: '#B7BECA'}}>
                            <span style={{fontWeight: 'bold', color: 'white'}}>Fund</span>
                        </div>
                    </ButtonBase>
                    <ButtonBase containerStyle={{flex: 1}}>
                        <div style={{flex: 1, padding: 8, backgroundColor: '#B7BECA'}}>
                            <span style={{fontWeight: 'bold', color: 'white'}}>Accountance</span>
                        </div>
                    </ButtonBase>
                </div>
            </Part>
            
            <Part>
                <TextArea
                    title='Explanation'
                    placeholder='Text service explanation'
                />
            </Part>

            <Part>
                <Title>
                    Photos
                </Title>
                <PhotosUploader />
            </Part>

            <ProfileInput
                title='Video link (Ad)'
                onShowInputDialog={() => setShowInputDialog(true)}
            />
        </Container>
    )
}

export default Service;