import { Radio } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import TFButtonBase from '../../elements/TFButtonBase';
import Price from '../../models/Price';

const Container = styled('div')(props => ({
        border: 'solid 1px #C7C7C7',
        padding: 16,
        borderRadius: 4,
    })
)

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: 1
})

const Detail = styled('div')({
    marginTop: 8,
    marginBottom: 16
})

const PriceText = styled('div')({
    color: '#0045D1',
    textAlign: 'left'
})

type Props = {
    price: Price,
    containerStyle?: object,
    matching?: number,
    checked: boolean,
    onChange: (e: any) => void
}

const PriceRadioButton: React.FC<Props> =({price, matching, containerStyle={}, checked, onChange}) => {

    const {title, detail, value, unit } = price;
    const priceText =`$${value} ${unit}`.replace(' per ', '/');

    return (
        <TFButtonBase containerStyle={containerStyle}>
            <Container>
                <Horizontal>
                    <Column>
                        <Horizontal>
                            <span style={{fontSize: 16, fontWeight: '500'}}>{title}</span>
                            {
                                matching &&
                                <span style={{color: '#0075FF', marginLeft: 4}}>Matching {matching}</span>
                            }
                        </Horizontal>
                        <Detail>{detail}</Detail>
                        <PriceText>{priceText}</PriceText>
                    </Column>
                    <Radio
                        checked={checked}
                        onChange={onChange}
                    />
                </Horizontal>
            </Container>
        </TFButtonBase>
    )
}

export default PriceRadioButton;