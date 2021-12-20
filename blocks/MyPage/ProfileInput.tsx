import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range } from 'lodash';

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
    padding: 8
})

type Props = {
    title: string;
    onShowInputDialog: () => void
}

const ProfileInput: React.FC<Props> = ({title, onShowInputDialog}) => {

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
                            <CancelIcon sx={{color: '#686868'}}/>
                            <span style={{marginLeft: 8}}>OOO대학교, 경제학과, 2012 ~ 2017</span>
                        </CareerBox>
                    )
                )
            }
        </Container>
    )
}

export default ProfileInput;