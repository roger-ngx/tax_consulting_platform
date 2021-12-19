import React from 'react';
import Chip from '@mui/material/Chip';

type Props = {
    text: string;
    onClick?: () => void;
    onDelete?: () => void
}

const LocationChip: React.FC<Props> = ({text, onClick, onDelete}) => {

    return (
        <Chip
            label={text}
            variant="outlined"
            onClick={onClick}
            onDelete={onDelete}
            sx={{
                '.MuiChip-label': {
                    color: '#0045D1',
                    marginRight: '12px'
                },
                '.MuiChip-deleteIcon': {
                    color: '#686868'
                }
            }}
        />
    )
}

export default LocationChip;