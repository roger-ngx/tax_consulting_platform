import React from 'react';
import { styled } from '@mui/system';
import TabHeader from '../../elements/SelfTax/TabHeader';
import { Button } from '@mui/material';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAEDF2',
    alignItems: 'center',
    width: '100%'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

const TabView = () => {

    return (
        <Container>
            <Horizontal>
                <TabHeader
                    text='Name & Address'
                    active={true}
                    index={1}
                />
                <TabHeader
                    text='Federal Tax'
                    active={false}
                    index={2}
                />
                <TabHeader
                    text='State Tax'
                    active={false}
                    index={3}
                />
            </Horizontal>
            <div style={{padding: 8}}>
                <Button variant='contained' color='primary'>Save</Button>
            </div>
        </Container>
    )
}

export default TabView;