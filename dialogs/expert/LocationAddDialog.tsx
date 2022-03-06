import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { map, findIndex, size } from 'lodash';

import SearchBox from '../../elements/SearchBox';
import { State, US_STATES, COUNTRIES } from '../../utils/Constants';
import StateCheckbox from '../../elements/StateCheckbox';
import LocationChip from '../../elements/LocationChip';
import { Box } from '@mui/system';
import { Tabs, Tab } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Horizontal = styled('div')({
  height: '60vh',
  display: 'flex',
  flexDirection: 'row',
  marginTop: 12
})

type Props = {
  open: boolean;
  states?: State[];
  onClose : () => void;
  onSave: (param: State[]) => void,
  limit?: number
}

const LocationAddDialog : React.FC<Props> = ({open, states=[], onClose, onSave, limit=2}) => {

  const [ selectedStates, setSelectedStates ] = useState<State[]>(states);
  const [ countryTab, setCountryTab ] = useState(0);

  const checkState = (state: State) => {
    const index = findIndex(selectedStates, selectedState => state.name === selectedState.name);
    if(index >= 0){
      selectedStates.splice(index, 1);
    }else{
      size(selectedStates) < limit && selectedStates.push(state);
    }
    setSelectedStates([...selectedStates]);
  }

  const handleTabChange = (event: any, value: number) => {
    setCountryTab(value);
  }

  return (
    <div>
        <BootstrapDialog
          onClose={onClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
        >
          <DialogTitle style={{padding: 8}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <IconButton
                  aria-label="close"
                  sx={{
                      color: '#333'
                  }}
                  onClick={onClose}
              >
                  <CloseIcon />
              </IconButton>
              <span>Location</span>
              <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    onSave(selectedStates);
                    onClose();
                  }}
              >
                  Save
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers style={{display: 'flex', flexDirection: 'column'}}>
            <SearchBox />
            <Horizontal>
              <div style={{flex: 1}}>
                <Tabs value={countryTab} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab label="USA" />
                  <Tab label="Others" />
                </Tabs>
                <div style={{height: '100%', display: 'inline-block', overflow: 'scroll', paddingRight: 12}}>
                  {
                    countryTab === 0 ?
                    map(US_STATES, (state) => (
                      <StateCheckbox
                        key={state.code}
                        code={state.code}
                        name={state.name}
                        onClick={() => checkState(state)}
                        checked={findIndex(selectedStates, selectedState => state.name === selectedState.name)>=0}
                      />
                    ))
                    :
                    map(COUNTRIES, (cntr) => (
                      <StateCheckbox
                        key={cntr.code}
                        code={cntr.code}
                        name={cntr.name}
                        onClick={() => checkState(cntr)}
                        checked={findIndex(selectedStates, selectedState => cntr.name === selectedState.name)>=0}
                      />
                    ))
                  }
                </div>
              </div>
              <div style={{flex: 1, height: '100%',minWidth: 220, backgroundColor: '#F0F2F5', padding: 16, display: 'inline-block', overflow: 'scroll'}}>
                {
                  map(selectedStates, state => (
                    <div style={{marginBottom: 4}} key={state.code}>
                      <LocationChip
                        text={state.name}
                        onDelete={() => checkState(state)}
                      />
                    </div>
                  ))
                }
              </div>
            </Horizontal>
          </DialogContent>
        </BootstrapDialog>
    </div>
  );
}

export default LocationAddDialog;
