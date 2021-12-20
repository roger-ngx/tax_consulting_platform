import * as React from 'react';
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

import { map } from 'lodash';
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
    fontWeight: props.active ? 'bold' : 'normal',
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
                  onClick={onSave}
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
              <TextField variant='outlined' style={{width: '100%'}}/>
            </Group>    

            <Group>
              <Title>
                  Detail (optional)
              </Title>
              <TextField variant='outlined'  style={{width: '100%'}}/>
            </Group>

            <Group>
              <Title>
                  Unit
              </Title>
              <Unit>
                {
                    map(PRICE_UNITS, (unit, index) => (<div style={{marginRight: index==3?0:8}}>
                      <TFButtonBase>
                        <UnitButton active={index==1}>
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
              <TextField variant='outlined'  style={{width: '100%'}}/>
            </Group>
          </DialogContent>
        </BootstrapDialog>
    </div>
  );
}
