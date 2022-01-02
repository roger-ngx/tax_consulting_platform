import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import PhotoUploader from '../../elements/PhotoUploader';
import UploadedPhoto from '../../elements/UploadedPhoto';
import { map, remove, size } from 'lodash';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const PhotosUploader = ({onChange}) => {

    const [ photoURIs, setPhotoURLs] = useState<string[]>([]);

    const onDeletePhoto = (src: string) => {
        remove(photoURIs, uri => uri === src);
        setPhotoURLs([...photoURIs]);
    }

    useEffect(() => {
        onChange(photoURIs);
    }, [photoURIs]);

    return (
        <Container>
            {
                map(photoURIs, uri => <UploadedPhoto src={uri} onDelete={onDeletePhoto}/>)
            }
            
            {
                size(photoURIs) < 3 &&
                <PhotoUploader
                    size={size(photoURIs)}
                    onChange={(uri: string) => {
                        photoURIs.push(uri);
                        setPhotoURLs([...photoURIs]);
                    }}
                />
            }
        </Container>
    )
}

export default PhotosUploader;