import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function MainSideMenu() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav>
            <List>
                <ListItem disablePadding sx={{marginBottom: 0}}>
                    <ListItemButton>
                    <ListItemText primary="All" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom: 0}}>
                    <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary="Tax" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{marginBottom: 0}}>
                    <ListItemButton>
                    <ListItemText primary="Fund" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemText primary="Acountancy" />
                    </ListItemButton>
                </ListItem>
            </List>
        </nav>
    </Box>
  );
}
