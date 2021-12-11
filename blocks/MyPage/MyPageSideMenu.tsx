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

export default function MyPageSideMenu() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Reservation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Enroll Expert" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Like" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton sx={{backgroundColor: '#EAEDF2'}}>
              <ListItemText primary="Qna" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton component="a" href="#simple-list" sx={{backgroundColor: '#EAEDF2'}}>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton sx={{backgroundColor: '#EAEDF2'}}>
              <ListItemText primary="Notice" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton sx={{backgroundColor: '#EAEDF2'}}>
              <ListItemText primary="Terms and conditions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{backgroundColor: '#EAEDF2'}}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
