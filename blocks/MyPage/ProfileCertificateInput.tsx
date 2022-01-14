import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range, isEmpty, findIndex, size } from 'lodash';

import CertificateAddDialog from '../../dialogs/expert/CertificateAddDialog';
import Certificate from '../../models/Certificate';

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

const InputBox = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    height: 50
})

type Props = {
}

const ProfileCertificateInput: React.FC<Props> = () => {

    const [ inputCount, setInputCount ] = useState(1);
    const [ showInputDialog, setShowInputDialog ] = useState(-1);
    const [ certificates, setCertificates ] = useState<Certificate[]>([]);

    const getCertificate = (index: number) => {
        if(isEmpty(certificates)){
            return;
        }
        const certificate = certificates[index];
        console.log(certificate);
        return certificate.name + ', ' + certificate.authority;
    }

    const deleteCertificate = (index: number, e: Event) => {
        e.stopPropagation();
        
        certificates.splice(index, 1);
        setCertificates([...certificates]);
    }

    const checkEmptyInput = () => {
        return inputCount > size(certificates) || isEmpty(certificates) || findIndex(certificates, isEmpty) >= 0;
    }

    return (
        <Container>
            <Horizontal>
                <span>Certificate</span>
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
                        <InputBox style={{marginTop: index > 0 ? 8 : 0}} onClick={() => setShowInputDialog(index)}>
                            {
                                !isEmpty(certificates[index]) &&
                                <IconButton onClick={(e: any) => deleteCertificate(index, e)}>
                                    <CancelIcon sx={{color: '#686868'}}/>
                                </IconButton>
                            }
                            <span style={{marginLeft: 8}}>{getCertificate(index)}</span>
                        </InputBox>
                    )
                )
            }
            <CertificateAddDialog
                open={showInputDialog>=0}
                onClose={(e: any, reason?: string) => {
                    if(reason==='backdropClick'){
                        return;
                    }
                    setShowInputDialog(-1)
                }}
                onSave={(certificate: Certificate) => {
                    certificates[showInputDialog] = certificate;
                    setCertificates([...certificates]);

                    setShowInputDialog(-1);
                }}
            />
        </Container>
    )
}

export default ProfileCertificateInput;