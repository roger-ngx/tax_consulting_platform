import React from 'react';
import { join } from 'lodash';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

type Props = {
    locations: string[],
    containerStyle?: object
}

const Location: React.FC<Props> = ({locations, containerStyle}) => {

    const loc = join(locations, ', ');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 0,
                ...containerStyle
            }}
        >
            <FmdGoodIcon sx={{color: '#838383', fontSize: '14px'}} />
            <span style={{fontSize: 12, color: '#959595', lineHeight: '12px', marginLeft: 4}}>{loc}</span>
        </div>
    )
}

export default Location;