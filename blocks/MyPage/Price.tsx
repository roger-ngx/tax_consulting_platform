import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InfoIcon from '@mui/icons-material/Info';

import ProfileInput from './ProfileInput';
import PriceAddDialog from '../../dialogs/expert/PriceAddDialog';

const Container = styled('div')({

})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
})

const Notice = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#EAEDF2',
    padding: 16
})

const Text = styled('span')({
    fontSize: 12
})

const Price = () => {
    const [ showInputDialog, setShowInputDialog ] = useState(false);
    const [ inputContent, setInputContent ] = useState<React.ReactElement>();

    return (
        <Container>
            <ProfileInput
                title='Price table'
                onShowInputDialog={() => setShowInputDialog(true)}
                content={inputContent}
            />
            {
                showInputDialog &&
                <PriceAddDialog
                    open={showInputDialog}
                    onClose={() => setShowInputDialog(false)}
                    onSave={
                        ({title, detail, price, priceUnit}) => {
                            setShowInputDialog(false);
                            setInputContent(
                                <div style={{display: 'inline-block'}}>
                                    <span>{title}</span>
                                    <span>{detail}</span>
                                    <span>{price} {priceUnit}</span>
                                </div>
                            )
                        }
                    }
                />
            }
            
            <FormControlLabel control={<Checkbox defaultChecked />} label="Negotiable" />
            <Notice>
                <Horizontal>
                    <InfoIcon sx={{color: '#9B9B9B', fontSize: 16, marginRight: '4px'}}/>
                    <span>Please check</span>
                </Horizontal>
                <Text>&middot; A freelancer with an acquired experience of more than 5 years in the field of data entry and web </Text>
                <Text>&middot; A freelancer with an acquired experience of more than 5 years in the </Text>
            </Notice>
        </Container>
    )
}

export default Price;