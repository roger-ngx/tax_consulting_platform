import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { SERVICE_CATEGORIES } from '../models/EnrollService';

type Props = {
    onMenuChanged: (menu: number) => void
}

const MainSideMenu : React.FC<Props> = ({onMenuChanged}) => {

    const [ selectedMenu, setSelectedMenu ] = useState(-1);

    useEffect(() => {
        onMenuChanged(selectedMenu);
    }, [selectedMenu]);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav>
                <List>
                    <ListItem disablePadding sx={{marginBottom: 0}}>
                        <ListItemButton
                            selected={selectedMenu===-1}
                            onClick={() => setSelectedMenu(-1)}
                        >
                            <ListItemText primary="All" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{marginBottom: 0}}>
                        <ListItemButton
                            selected={selectedMenu===SERVICE_CATEGORIES.TAX}
                            onClick={() => setSelectedMenu(SERVICE_CATEGORIES.TAX)}
                        >
                            <ListItemText primary="Tax" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{marginBottom: 0}}>
                        <ListItemButton
                            selected={selectedMenu===SERVICE_CATEGORIES.FUND}
                            onClick={() => setSelectedMenu(SERVICE_CATEGORIES.FUND)}
                        >
                            <ListItemText primary="Fund" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedMenu===SERVICE_CATEGORIES.ACCOUNTANCY}
                            onClick={() => setSelectedMenu(SERVICE_CATEGORIES.ACCOUNTANCY)}
                        >
                            <ListItemText primary="Acountancy" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}

export default MainSideMenu;
