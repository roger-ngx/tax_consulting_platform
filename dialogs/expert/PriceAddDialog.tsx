import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { map, throttle } from 'lodash';
import TFButtonBase from '../../elements/ButtonBase';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Unit = styled('span')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
})

const UnitButton = styled('div')( props => ({
    backgroundColor: props.active ? '#D8E5FF' : '#EAEDF2',
    padding: '12px 24px',
    fontSize: 16,
    color: props.active ? '#0045D1' : '#797979',
}))

const Title = styled('div')({
    fontWeight: 'bold',
    marginBottom: 4
})

const Group = styled('div')({
    marginBottom: 24
})

const PRICE_UNITS = ['per hour', 'per day', 'per case', 'etc'];

export default function PriceAddDialog({open, onClose, onSave}) {

  const [ title, setTitle ] = useState();
  const [ detail, setDetail ] = useState();
  const [ priceUnit, setPriceUnit ] = useState();
  const [ price, setPrice ] = useState();

  return (
    <div>
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
          <DialogTitle style={{padding: 8}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <IconButton
                  aria-label="close"
                  sx={{
                      color: '#333'
                  }}
              >
                  <CloseIcon />
              </IconButton>
              <span>Price</span>
              <Button
                  variant='contained'
                  color='primary'
                  onClick={() => onSave({title, detail, price, priceUnit})}
              >
                  Save
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Group>
              <Title>
                  Title
              </Title>
              <TextField
                variant='outlined'
                style={{width: '100%'}}
                value={title}
                onChange={throttle(e => setTitle(e.target.value), 500, {trailing: false})}
              />
            </Group>    

            <Group>
              <Title>
                  Detail (optional)
              </Title>
              <TextField
                variant='outlined'
                style={{width: '100%'}}
                onChange={throttle(e => setDetail(e.target.value), 500, {trailing: false})}
                value={detail}
              />
            </Group>

            <Group>
              <Title>
                  Unit
              </Title>
              <Unit>
                {
                    map(PRICE_UNITS, (unit: string, index: number) => (<div style={{marginRight: index==3?0:8}}>
                      <TFButtonBase
                        onClick={() => unit===priceUnit ? setPriceUnit() : setPriceUnit(unit)}
                      >
                        <UnitButton active={unit==priceUnit}>
                          <span>{unit}</span>
                        </UnitButton>
                      </TFButtonBase>
                    </div>
                  ))
                }
              </Unit>
            </Group>

            <Group>
              <Title>
                  Price
              </Title>
              <TextField
                variant='outlined'
                style={{width: '100%'}}
                value={price}
                onChange={throttle(e => setPrice(e.target.value), 500, {trailing: false})}
              />
            </Group>
          </DialogContent>
        </BootstrapDialog>
    </div>
  );
}
