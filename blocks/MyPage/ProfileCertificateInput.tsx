import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range } from 'lodash';

import CertificateAddDialog from '../../dialogs/expert/CertificateAddDialog';

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
}

const ProfileCertificateInput: React.FC<Props> = () => {

    const [ inputCount, setInputCount ] = useState(0);
    const [ showInputDialog, setShowInputDialog ] = useState(false);

    return (
        <Container>
            <Horizontal>
                <span>Certificate</span>
                <IconButton style={{marginRight: -10}} onClick={() => setInputCount(inputCount + 1)}>
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <CareerBox onClick={() => setShowInputDialog(true)}>
                            <CancelIcon sx={{color: '#686868'}}/>
                            <span style={{marginLeft: 8}}>OOO자격증, OOO기관</span>
                        </CareerBox>
                    )
                )
            }
            <CertificateAddDialog
                open={showInputDialog}
                onClose={() => setShowInputDialog(false)}
                onSave={() => {}}
            />
        </Container>
    )
}

export default ProfileCertificateInput;