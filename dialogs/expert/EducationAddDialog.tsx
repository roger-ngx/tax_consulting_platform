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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { range } from 'lodash';

import ProfilePhotoUpload from '../../elements/ProfilePhotoUpload';
import Education, { EDUCATION_DEGREES } from '../../models/Education';
import TFDialogTitle from './DialogTitle';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Duration = styled('span')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
  open: boolean,
  onClose: (e: any, reason?: string) => void,
  onSave: (param: Education) => void
}

const EducationAddDialog : React.FC<Props> = ({open, onClose, onSave}) => {

  const [ university, setUniversity ] = React.useState('');
  const [ major, setMajor ] = React.useState('');
  const [ degree, setDegree ] = React.useState<EDUCATION_DEGREES>();
  const [ startYear, setStartYear ] = React.useState();
  const [ endYear, setEndYear ] = React.useState();
  const [ isStudyNow, setStudyNow ] = React.useState(false);

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
                  onClick={onClose}
              >
                  <CloseIcon />
              </IconButton>
              <span>Education</span>
              <Button
                  variant='contained'
                  color='primary'
                  onClick={() => onSave(new Education({university, major, degree, startYear, endYear, isStudyNow}))}
              >
                  Save
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Typography>
                University
            </Typography>
            <TextField
              variant='outlined'
              style={{width: 400}}
              value={university}
              onChange={e=>setUniversity(e.target.value)}
            />

            <Typography style={{marginTop: 24}}>
                Major
            </Typography>
            <TextField
              variant='outlined'
              style={{width: 400}}
              onChange={e=>setMajor(e.target.value)}
            />

            <Typography style={{marginTop: 24}}>
                Degree
            </Typography>
            <Select
              style={{width: '100%'}}
              value={degree}
              onChange={e=>e.target.value}
            >
                <MenuItem value={EDUCATION_DEGREES.ASSOCIATE}>Associate’s degree</MenuItem>
                <MenuItem value={EDUCATION_DEGREES.BACHELOR}>Bachelor’s degree</MenuItem>
                <MenuItem value={EDUCATION_DEGREES.MASTER}>Master’s degree</MenuItem>
                <MenuItem value={EDUCATION_DEGREES.DOCTOR}>Doctor’s degree</MenuItem>
            </Select> 

            <Typography style={{marginTop: 24}}>
                Duration
            </Typography>
            <Duration>
                <Select
                  style={{flex: 1}}
                  onChange={(e: any) => setStartYear(e.target.value)}    
                >
                  {
                    range(1990, endYear || 2023).map(year => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))
                  }
                </Select>
                {
                  !isStudyNow && <>
                    <span style={{margin: '0 8px'}}>~</span>
                    <Select
                      style={{flex: 1}}
                      onChange={(e: any) => setEndYear(e.target.value)}    
                    >
                      {
                        range(startYear || 1990, 2023).map(year => (
                          <MenuItem value={year}>{year}</MenuItem>
                        ))
                      }
                    </Select>         
                  </>
                }
            </Duration>
            <FormControlLabel
              control={
                <Checkbox checked={isStudyNow} onChange={e => setStudyNow(e.target.checked)} />
              }
              label="Studying now"
            />
          </DialogContent>
        </BootstrapDialog>
    </div>
  );
}

export default EducationAddDialog;
