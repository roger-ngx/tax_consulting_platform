import React from 'react';
import { styled } from '@mui/system';
import { Radio, ButtonBase } from '@mui/material';

const Container = styled(ButtonBase)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 4
})

const PriceText = styled('div')({
    fontSize: 16,
    fontWeight: 'bold'
})

const Title = styled('div')({
    fontSize: 16,
    marginBottom: 4
})

type Props = {
    title: string;
    price: number;
    onValueChange: (value: number) => void;
    [x:string]: any;
}

const RadioButton: React.FC<Props> = ({title, price, onValueChange, ...props}) => (
   <Container onClick={() => onValueChange(price)}>
       <Radio
            style={{marginTop: -3}}
            {...props}
        />
       <div style={{marginLeft: 4, textAlign: 'left'}}>
            <Title>{title}</Title>
            <PriceText>
                {`$${price}`}
            </PriceText>
       </div>
   </Container>
)

export default RadioButton;