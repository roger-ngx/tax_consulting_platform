import { Radio } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import TFButtonBase from '../../elements/ButtonBase';

const Container = styled('div')(props => ({
        border: 'solid 1px #C7C7C7',
        padding: 16,
        borderRadius: 4,
        ...props.style
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
})

const Detail = styled('div')({
    marginTop: 8,
    marginBottom: 16
})

const Price = styled('div')({
    color: '#0045D1',
    textAlign: 'left'
})

type Props = {
    type: string;
    matching: number;
    detail: string;
    price: string;
    containerStyle?: object
}

const PriceRadioButton: React.FC<Props> =({type, matching, detail, price, containerStyle={}}) => {

    return (
        <TFButtonBase containerStyle={containerStyle}>
            <Container>
                <Horizontal>
                    <Column>
                        <Horizontal>
                            <span style={{fontSize: 16, fontWeight: '500'}}>{type}</span>
                            <span style={{color: '#0075FF', marginLeft: 4}}>Matching {matching}</span>
                        </Horizontal>
                        <Detail>{detail}</Detail>
                        <Price>{price}</Price>
                    </Column>
                    <Radio />
                </Horizontal>
            </Container>
        </TFButtonBase>
    )
}

export default PriceRadioButton;