import React from 'react';
import Chip from '@mui/material/Chip';

const LocationChip = ({text, onClick, onDelete}) => {

    return (
        <Chip
            label={text}
            variant="outlined"
            onClick={onClick}
            onDelete={onDelete}
            sx={{
                '.MuiChip-label': {
                    color: '#0045D1',
                    marginRight: '24px'
                },
                '.MuiChip-deleteIcon': {
                    color: '#686868'
                }
            }}
        />
    )
}

export default LocationChip;