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

type Props = {
    onChange: (param: string[]) => void,
    data?: string[]
}

const PhotosUploader: React.FC<Props> = ({data, onChange}) => {

    const [ photoURIs, setPhotoURLs] = useState<string[]>(data || []);

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