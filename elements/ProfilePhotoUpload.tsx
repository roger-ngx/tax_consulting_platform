import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';

const ProfilePhotoUpload = ({size=100}) => {

    return (
        <div
            style={{
                position: 'relative',
                width: size, height: size,
                cursor: 'pointer'
            }}
        >
            <Image
                src='/assets/icons/person.png'
                width={size}
                height={size}
            />
            <div style={{position: 'absolute', right: 3, bottom: 3, zIndex: 1000}}>
                <AddCircleIcon sx={{color:'#0045D1'}}/>
            </div>
        </div>
    )
}

export default ProfilePhotoUpload;