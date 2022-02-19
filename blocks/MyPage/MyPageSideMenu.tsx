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
import { useSelector } from 'react-redux';
import { get } from 'lodash';

export default function MyPageSideMenu({onSelectedItemChanged} : {onSelectedItemChanged: (param: string) => void}) {

  const [ selectedItem, setSelectedItem ] = React.useState('Reservation');

  const uid = useSelector((state: any) => state.firebase.auth.uid);
  const profile = useSelector((state: any) => get(state, `firestore.data.experts.${uid}`));
  const expertProfileMenu = profile ? 'Expert Profile' : 'Enroll Expert';

  React.useEffect(() => {
    onSelectedItemChanged(selectedItem);
  }, [selectedItem])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedItem==='Reservation'}
              onClick={() => setSelectedItem('Reservation')}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Reservation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedItem===expertProfileMenu}          
              onClick={() => setSelectedItem(expertProfileMenu)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={expertProfileMenu} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedItem==='Like'}          
              onClick={() => setSelectedItem('Like')}
            >
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
            <ListItemButton
              sx={{backgroundColor: '#EAEDF2'}}
              onClick={() => setSelectedItem('QnA')}
            >
              <ListItemText primary="QnA" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton
              component="a"
              onClick={() => setSelectedItem('Help')}
              sx={{backgroundColor: '#EAEDF2'}}
            >
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton
              sx={{backgroundColor: '#EAEDF2'}}
              onClick={() => setSelectedItem('Notice')}
            >
              <ListItemText primary="Notice" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{marginBottom: 0}}>
            <ListItemButton
              sx={{backgroundColor: '#EAEDF2'}}
              onClick={() => setSelectedItem('Terms and conditions')}
            >
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
