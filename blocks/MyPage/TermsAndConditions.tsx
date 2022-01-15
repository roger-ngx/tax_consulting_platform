import { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
})

const TermsAndConditions = () => {

    const [ selectedTab, setSelectedTab ] = useState(0);

    return (
        <Container>
            <div>
                <List>
                    <ListItem
                        disablePadding
                        selected={selectedTab===0}
                    >
                        <ListItemButton onClick={() => setSelectedTab(0)}>
                            <ListItemText primary="User Terms" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        selected={selectedTab===1}
                    >
                        <ListItemButton component="a" onClick={() => setSelectedTab(1)}>
                            <ListItemText primary="Private information conditions" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
            <div
                style={{flex: 1, padding: '8px 16px'}}
            >
                {
                    selectedTab === 0 &&
                    <span>User Terms</span>
                }
                {
                    selectedTab === 1 &&
                    <span>Private information conditions</span>
                }
            </div>
        </Container>
    )
}

export default TermsAndConditions;