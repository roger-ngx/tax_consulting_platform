import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { StringIterator } from 'lodash';

const Input = styled('input')({
    display: 'none',
});


type ICProps = {
    size: number
}
const ImageContainer = styled('div')<ICProps>(({size}) => ({
    width: size,
    height: size,
    borderRadius: size/2,
    overflow: 'hidden'
}))

type Props = {
    size?: number,
    onFileChanged: (file: string) => void
}

const ProfilePhotoUpload: React.FC<Props> = ({size=100, onFileChanged}) => {

    const [ selectedPhoto, setSelectedPhoto ] = useState<any>();

    useEffect(() => {
        selectedPhoto && onFileChanged(selectedPhoto);
    }, [selectedPhoto])

    const uploadPhoto = (e: any) => {

        const file: File = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                setSelectedPhoto(reader.result);
            }, false);

            reader.readAsDataURL(file);
        }
        e.target.value = null;
    }

    return (
        <div
            style={{
                position: 'relative',
                width: size, height: size,
                cursor: 'pointer'
            }}
        >
            <ImageContainer size={size}>
                <Image
                    src={selectedPhoto || '/assets/icons/person.png'}
                    width={size}
                    height={size}
                />
            </ImageContainer>
            <div style={{position: 'absolute', right: -4, bottom: -4, zIndex: 1000}}>
                <label htmlFor="icon-button-file">
                    <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={uploadPhoto}
                    />
                    <IconButton component="span">
                        <div style={{backgroundColor: 'white', fontSize: 0, borderRadius: '50%'}}>
                            <AddCircleIcon sx={{color:'#0045D1'}}/>
                        </div>
                    </IconButton>
                </label>
            </div>
        </div>
    )
}

export default ProfilePhotoUpload;