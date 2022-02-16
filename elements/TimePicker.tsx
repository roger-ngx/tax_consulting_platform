
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { includes, map, remove } from 'lodash';
import { Button, ButtonProps } from '@mui/material';

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
})

type TBProps = ButtonProps & {
    selected: boolean
}

const TimeButton = styled(Button)<TBProps>(props => ({
    fontWeight: 'normal',
    color: props.selected ? '#0045D1' : '#333'
}))

const TIMES = {
    'AM': ['09:00', '10:00', '11:00'],
    'PM': ['12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
}

type Props = {
    onChange: (time: string) => void,
    reserved?: string[],
}

const TimePicker: React.FC<Props> = ({onChange, reserved=[]}) => {
    const [ selectedTime, setSelectedTime ] = useState<string>()

    useEffect(() => {
        selectedTime && onChange(selectedTime);
    }, [selectedTime])

    // const onSelectTime = (time: string) => {
    //     const currentSelected = includes(selectedTimes, time);

    //     if(currentSelected){
    //         remove(selectedTimes, t => t === time);
    //     }else{
    //         selectedTimes.push(time);
    //     }

    //     setSelectedTimes([...selectedTimes])
    // }

    return (
        <Column>
            <Horizontal style={{marginBottom: 4}}>
                <AccessTimeIcon style={{marginRight: 4}}/>
                <span>Time</span>
            </Horizontal>
            <div>
                <div>
                    AM
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        map(TIMES.AM, time => (
                            <TimeButton
                                disabled={reserved.includes(time)}
                                selected={selectedTime===time}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </TimeButton>
                        ))
                    }
                </div>
                <div>
                    PM
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        map(TIMES.PM, time => (
                            <TimeButton
                                disabled={reserved.includes(time)}
                                selected={selectedTime===time}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </TimeButton>
                        ))
                    }
                </div>
            </div>
        </Column>
    )
}

export default TimePicker;