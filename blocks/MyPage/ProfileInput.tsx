import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range, size, isEmpty, findIndex } from 'lodash';

import CareerAddDialog from '../../dialogs/expert/CareerAddDialog';
import { TextField } from '@mui/material';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const CareerBox = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    height: 50
})

type Props = {
    title: string;
    onChange: (values: string[]) => void;
}

const ProfileInput: React.FC<Props> = ({title, onChange}) => {

    const [ inputCount, setInputCount ] = useState(1);
    const [ values, setValues ] = useState<string[]>([]);

    useEffect(() => {
        onChange(values);
    }, [values]);

    const isEmptyInput = () => {
        return inputCount > size(values) || findIndex(values, isEmpty) >= 0;
    }

    return (
        <Container>
            <Horizontal>
                <span style={{fontWeight: 'bold'}}>{ title }</span>
                <IconButton
                    style={{marginRight: -10}}
                    onClick={() => !isEmptyInput && setInputCount(inputCount + 1)}
                >
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <TextField
                            style={{marginTop: index > 0 ? 8 : 0}}
                            value={values[index]}
                            onChange={e => {
                                values[index] = e.target.value;
                                setValues([...values]);
                            }}
                        />
                    )
                )
            }
        </Container>
    )
}

export default ProfileInput;