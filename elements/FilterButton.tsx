import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';

type Props = ButtonProps & {
    text: string,
    active?: boolean,
    activeIcon?: React.ReactNode,
    startIcon?: React.ReactNode,
    containerStyle?: object
}

const FilterButton: React.FC<Props> = ({text, active=false, activeIcon, startIcon, containerStyle={}, ...props}) => {

    return (
        <Button
            variant='outlined'
            startIcon={startIcon || (active && activeIcon)}
            style={{
                    borderRadius: 24,
                    borderColor: '#C7C7C7',
                    color: active ? '#0045D1' : '#333',
                    fontWeight: active ? 'bold' : '400',
                    textTransform: 'none',
                    ...containerStyle
            }}
            {...props}
        >
            {text}
        </Button>
    )
}

export default FilterButton;
