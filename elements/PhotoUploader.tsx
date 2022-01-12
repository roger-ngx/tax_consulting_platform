import React, { ChangeEvent } from 'react';
import ButtonBase from './TFButtonBase';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/system';

const Input = styled('input')({
    display: 'none',
});

type Props = {
    onChange: (param: any) => void,
    size: number
}

const PhotoUploader: React.FC<Props> = ({onChange, size}) => {

    const uploadFile = (e: any) => {

        const file: File = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                onChange(reader.result);
            }, false);

            reader.readAsDataURL(file);
        }
        e.target.value = null;
    }

    return (
        <label htmlFor="button-file">
            <Input
                accept="image/*"
                id="button-file"
                type="file"
                onChange={uploadFile}
            />
            <ButtonBase component="span">
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
                    <span style={{color: '#A1A1A1', marginTop: 4}}>{size}/3</span>
                </div>
            </ButtonBase>
        </label>
    )
}

export default PhotoUploader;