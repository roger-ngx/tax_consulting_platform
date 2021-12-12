import React, { useState } from 'react';
import { styled } from '@mui/system';

import TabView from '../blocks/SelfTax/TabView';
import { map } from 'lodash';
import Tag from '../elements/SelfTax/Tag';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    margin: '24px 0',
    overflow: 'scroll',
    '-ms-overflow-style': 'none',  /* IE and Edge */
    scrollbarWidth: 'none'  /* Firefox */
})

const STEPS = [
    'Your Filling status',
    'More about your satus',
    'Your Name',
    'Your Social Security Number',
    'Your Birthday',
    'Your Occupation',
    'Your Address',
    'Your Phone Number'
]

const SelfTax = () => {

    const [ selectedTab, setSelectedTab ] = useState();

    return (
        <Container>
            <TabView />
            <Horizontal>
                {
                    map(STEPS, step => (<Tag text={step} active={false} containerStyle={{marginRight: 8}}/>))
                }
            </Horizontal>
        </Container>
    )
}

export default SelfTax;