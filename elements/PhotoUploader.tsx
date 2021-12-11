import React from 'react';
import ButtonBase from './ButtonBase';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const PhotoUploader = () => {

    return (
        <ButtonBase>
            <div
                style={{
                    flex: 1,
                    minWidth: 140,
                    minHeight: 140,
                    borderRadius: 4,
                    margin: 4,
                    border: 'solid 1px #C7C7C7',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <CameraAltIcon sx={{color: '#A1A1A1'}}/>
                <span style={{color: '#A1A1A1', marginTop: 4}}>0/3</span>
            </div>
        </ButtonBase>
    )
}

export default PhotoUploader;