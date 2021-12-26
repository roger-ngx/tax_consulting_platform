import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range, get } from 'lodash';

import CareerAddDialog from '../../dialogs/expert/CareerAddDialog';

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

const CareerBox = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    height: 50
})

type Props = {
    title: string;
    onShowInputDialog: () => void;
    content?: React.ReactElement
}

const ProfileInput: React.FC<Props> = ({title, onShowInputDialog, content}) => {

    const [ inputCount, setInputCount ] = useState(0);
    const [ showInputDialog, setShowInputDialog ] = useState(false);

    return (
        <Container>
            <Horizontal>
                <span style={{fontWeight: 'bold'}}>{ title }</span>
                <IconButton style={{marginRight: -10}} onClick={() => setInputCount(inputCount + 1)}>
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <CareerBox onClick={onShowInputDialog}>
                            {
                                get(content, `${index}`) &&
                                (
                                    <>
                                        <CancelIcon sx={{color: '#686868'}}/>
                                        <span style={{marginLeft: 8}}>
                                            { get(content, `${index}`) }
                                        </span>
                                    </>
                                )
                            }
                        </CareerBox>
                    )
                )
            }
        </Container>
    )
}

export default ProfileInput;