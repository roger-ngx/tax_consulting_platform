import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Accordion from '../../elements/Accordion';

const Container = styled('div')({

})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 20
})

const HelpHeader = () => (
    <Column>
        <span>Customer</span>
        <span>How does the consultation?</span>
    </Column>
)

const HelpContent = () => (
    <Column>
        <Horizontal>
            <div style={{width: 24}}>Q.</div>
            <div>How do I make a reservation?</div>
        </Horizontal>
        <Horizontal>
            <div style={{width: 24}}>A.</div>
            <div>reservation reservation reservation reservation</div>
        </Horizontal>
    </Column>
) 

const Help = () => {

    const [ selectedTab, setSelectedTab ] = useState(0)

    const handleChangeTab = (e: any, value: number) => setSelectedTab(value);

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="basic tabs example">
                    <Tab label="All" />
                    <Tab label="Customer" />
                    <Tab label="Accountant" />
                </Tabs>
            </Box>
            <Accordion
                header={<HelpHeader />}
                content={<HelpContent />}
            />
        </Container>
    )
}

export default Help;