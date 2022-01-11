import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ButtonBase from './TFButtonBase';

type Props = {
    src: string,
    onDelete: (src: string) => void
}

const UploadedPhoto : React.FC<Props> = ({src, onDelete}) => {

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
            <img src={src} style={{objectFit: 'cover', width: '100%', height: '100%'}} />
            <div
                style={{
                    position: 'absolute',
                    top: 0, right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                }}
            >
                <ButtonBase
                    onClick={() => onDelete(src)}
                >
                    <div>
                        <CloseIcon sx={{color: 'white'}}/>
                    </div>
                </ButtonBase>
            </div>
        </div>
    )
}

export default UploadedPhoto;