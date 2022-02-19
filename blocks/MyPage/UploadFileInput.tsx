import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { findIndex, isEmpty, map, range, size } from 'lodash';

import CareerAddDialog from '../../dialogs/expert/CareerAddDialog';
import Career from '../../models/Career';
import Input from '@mui/material/Input';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const FileInputBox = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    height: 50
})

type Props = {
    onChange: (param: Career[]) => void,
    data?: Career[]
}

const UploadFileInput: React.FC<Props> = ({onChange}) => {

    const [ inputCount, setInputCount ] = useState(1);
    const [ showInputDialog, setShowInputDialog ] = useState(-1);
    const [ files, setFiles ] = useState<File[]>([]);
    

    const getFileInput = (index: number) => {
        if(size(files)< index + 1){
            return;
        }
        const file = files[index];
        console.log(index, file);
        return file.name;
    }

    const deleteFileInput = (index: number, e: MouseEvent) => {
        e.stopPropagation();

        files.splice(index, 1);
        setFiles([...files]);
    }

    const checkEmptyInput = () => {
        return inputCount > size(files) || isEmpty(files) || findIndex(files, file => size(file) > 0) >= 0;
    }

    const handleFileInputChanged = (e:any, index: number) => {
        const file = e.target.files[0];
        if(file){
            files[index] = file;
            setFiles([...files]);
        }

        e.target.value = null;
    }

    return (
        <Container>
            <Horizontal>
                <span>Attach File</span>
                <IconButton
                    style={{marginRight: -10}}
                    disabled={checkEmptyInput()}
                    onClick={() => setInputCount(inputCount + 1)}
                >
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <label htmlFor={`contained-button-file-${index}`} key={index}>
                            <Input
                                accept="image/*"
                                id={`contained-button-file-${index}`}
                                multiple
                                type="file"
                                style={{display: 'none'}}
                                onChange={(e: any) => handleFileInputChanged(e, index)}
                            />
                            <FileInputBox
                                style={{marginTop: index > 0 ? 8 : 0}}
                                onClick={() => setShowInputDialog(index)}
                            >
                                {
                                    !isEmpty(files[index]) &&
                                    <IconButton
                                        onClick={(e: any) => deleteFileInput(index, e)}
                                    >
                                        <CancelIcon sx={{color: '#686868'}}/>
                                    </IconButton>
                                }
                                <span style={{marginLeft: 8}}>{getFileInput(index)}</span>
                            </FileInputBox>
                        </label>
                    )
                )
            }
        </Container>
    )
}

export default UploadFileInput;