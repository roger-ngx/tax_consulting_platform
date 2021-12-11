import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ButtonBase from './ButtonBase';

type Props = {
    src: string
}

const UploadedPhoto : React.FC<Props> = ({src}) => {

    return (
        <div
            style={{
                position: 'relative',
                width: 140, height: 140,
                borderRadius: 4,
                margin: 4,
                overflow: 'hidden'
            }}
        >
            <img src={src} style={{objectFit: 'cover'}} />
            <div
                style={{
                    position: 'absolute',
                    top: 0, right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                }}
            >
                <ButtonBase>
                    <div>
                        <CloseIcon sx={{color: 'white'}}/>
                    </div>
                </ButtonBase>
            </div>
        </div>
    )
}

export default UploadedPhoto;