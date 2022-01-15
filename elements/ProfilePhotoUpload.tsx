import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import { IconButton } from '@mui/material';

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
    size: number,
    onFileChanged: (URL: string) => void
}

const ProfilePhotoUpload: React.FC<Props> = ({size=100, onFileChanged}) => {

    const [ selectedPhotoURL, setSelectedPhotoURL ] = useState<string>()

    useEffect(() => {
        selectedPhotoURL && onFileChanged(selectedPhotoURL);
    }, [selectedPhotoURL])

    const uploadPhoto = (e: any) => {
        const file = e.target.files[0];

        file && setSelectedPhotoURL(URL.createObjectURL(file));
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
                    src={selectedPhotoURL || '/assets/icons/person.png'}
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