import React from 'react';
import { styled } from '@mui/system';
import PhotoUploader from '../../elements/PhotoUploader';
import UploadedPhoto from '../../elements/UploadedPhoto';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const PhotosUploader = () => {

    return (
        <Container>
            <UploadedPhoto src='/assets/images/test.png' />
            <PhotoUploader />
        </Container>
    )
}

export default PhotosUploader;