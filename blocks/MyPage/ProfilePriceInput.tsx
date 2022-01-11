import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range, isEmpty, findIndex, size } from 'lodash';

import Price from '../../models/Price';
import PriceAddDialog from '../../dialogs/expert/PriceAddDialog';

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
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    minHeight: 50,
    padding: 8
})

type Props = {
}

const ProfilePriceInput: React.FC<Props> = () => {

    const [ inputCount, setInputCount ] = useState(1);
    const [ showInputDialog, setShowInputDialog ] = useState(-1);
    const [ prices, setPrices ] = useState<Price[]>([]);

    const deletePrice = (index: number, e: Event) => {
        e.stopPropagation();
        
        prices.splice(index, 1);
        setPrices([...prices]);
    }

    const isEmptyInput = () => {
        return inputCount > size(prices) || isEmpty(prices) || findIndex(prices, isEmpty) >= 0;
    }

    return (
        <Container>
            <Horizontal>
                <span style={{fontWeight: 'bold'}}>Price table</span>
                <IconButton style={{marginRight: -10}} onClick={() => !isEmptyInput() && setInputCount(inputCount + 1)}>
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <InputBox style={{marginTop: index > 0 ? 8 : 0}} onClick={() => setShowInputDialog(index)}>
                            {
                                prices[index] &&
                                (
                                    <>
                                        <IconButton
                                            style={{alignSelf: 'flex-start'}}
                                            onClick={(e: any) => deletePrice(index, e)}
                                        >
                                            <CancelIcon sx={{color: '#686868'}}/>
                                        </IconButton>
                                        <div style={{display: 'inline-block'}}>
                                            <div>{prices[index].title}</div>
                                            <div>{prices[index].detail}</div>
                                            <div style={{fontWeight: 'bold'}}>{prices[index].valueInDollar} {prices[index].unit}</div>
                                        </div>
                                    </>
                                )
                            }
                        </InputBox>
                    )
                )
            }

            <PriceAddDialog
                open={showInputDialog>=0}
                onClose={() => setShowInputDialog(-1)}
                onSave={
                    (price: Price) => {
                        prices[showInputDialog] = price;
                        setPrices([...prices]);
    
                        setShowInputDialog(-1);
                    }
                }
            />
        </Container>
    )
}

export default ProfilePriceInput;