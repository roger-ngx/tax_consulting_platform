import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { SvgIconTypeMap } from '@mui/material';

const StyledButton = styled(Button)(props => ({
    borderRadius: 24,
    borderColor: '#C7C7C7',
    color: props.active ? '#0045D1' : '#333',
    fontWeight: props.active ? 'bold' : '400',
    textTransform: 'none',
    ...props.style
}))

type Props = {
    text: string,
    active?: boolean,
    activeIcon?: React.ReactNode,
    startIcon?: React.ReactNode,
    containerStyle?: object
}

const FilterButton: React.FC<Props> = ({text, active=false, activeIcon, startIcon, containerStyle={}, ...props}) => {

    return (
        <StyledButton
            variant='outlined'
            active={active}
            startIcon={startIcon || (active && activeIcon)}
            style={containerStyle}
            {...props}
        >
            {text}
        </StyledButton>
    )
}

export default FilterButton;
