import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

type Props = {
  containerStyle?: object,
  disabled?: boolean
}

const SearchBox : React.FC<Props> = ({disabled=false, containerStyle={}}) => {
  return (
    <Paper
      component="form"
      sx={[{ display: 'flex', alignItems: 'center', width: '100%', borderRadius: 50 }, containerStyle]}
    >
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
        disabled={disabled}
      />
    </Paper>
  )
}

export default SearchBox;
