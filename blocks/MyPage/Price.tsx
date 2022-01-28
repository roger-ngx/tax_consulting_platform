import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InfoIcon from '@mui/icons-material/Info';
import { isEmpty } from 'lodash';

import ProfileInput from './ProfileInput';
import PriceAddDialog from '../../dialogs/expert/PriceAddDialog';
import Price from '../../models/Price';
import ProfilePriceInput from './ProfilePriceInput';
import InfoCard from '../../elements/InfoCard';

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
    padding: 16,
    marginTop: 32
})

const Text = styled('span')({
    fontSize: 12
})

type Props = {
    onChange: (prices: Price[]) => void
}

const PriceView: React.FC<Props> = ({onChange}) => {
    const [ prices, setPrices ] = useState<Price[]>([]);

    useEffect(() => {
        if(isEmpty(prices)){
            return;
        }
        onChange(prices);
    }, [prices]);

    return (
        <Container>
            <ProfilePriceInput
                onChange={setPrices}
            />
            
            <FormControlLabel control={<Checkbox defaultChecked />} label="Negotiable" />
            <InfoCard />
        </Container>
    )
}

export default PriceView;