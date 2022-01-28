import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { map, range, isEmpty, findIndex, size } from 'lodash';

import EducationAddDialog from '../../dialogs/expert/EducationAddDialog';
import Education from '../../models/Education';

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

const InputBox = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    height: 50
})

type Props = {
    onChange: (param: Education[]) => void
}

const ProfileEducationInput: React.FC<Props> = ({onChange}) => {

    const [ inputCount, setInputCount ] = useState(1);
    const [ showInputDialog, setShowInputDialog ] = useState(-1);
    const [ educations, setEducations ] = useState<Education[]>([]);

    useEffect(() => {
        onChange(educations);
    }, [educations]);

    const getEducation = (index: number) => {
        if(isEmpty(educations)){
            return;
        }
        const education = educations[index];
        return education.university + ', ' + education.major + ', ' + education.duration;
    }

    const deleteEducation = (index: number, e: Event) => {
        e.stopPropagation();
        
        educations.splice(index, 1);
        setEducations([...educations]);
    }

    const isEmptyInput = () => {
        return inputCount > size(educations) || isEmpty(educations) || findIndex(educations, isEmpty) >= 0;
    }

    return (
        <Container>
            <Horizontal>
                <span>Education</span>
                <IconButton
                    style={{marginRight: -10}}
                    disabled={isEmptyInput()}
                    onClick={() => setInputCount(inputCount + 1)}
                >
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <InputBox style={{marginTop: index > 0 ? 8 : 0}}  onClick={() => setShowInputDialog(index)}>
                            {
                                !isEmpty(educations[index]) &&
                                <IconButton onClick={(e: any) => deleteEducation(index, e)}>
                                    <CancelIcon sx={{color: '#686868'}}/>
                                </IconButton>
                            }
                            <span style={{marginLeft: 8}}>{getEducation(index)}</span>
                        </InputBox>
                    )
                )
            }
            <EducationAddDialog
                open={showInputDialog>=0}
                onClose={(e: any, reason?: string) => {
                    if(reason==='backdropClick'){
                        return;
                    }
                    setShowInputDialog(-1);
                }}
                onSave={(education: Education) => {
                    educations[showInputDialog] = education;
                    setEducations([...educations]);

                    setShowInputDialog(-1);
                }}
            />
        </Container>
    )
}

export default ProfileEducationInput;