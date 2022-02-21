import { styled } from '@mui/system';
import { map } from 'lodash';

import ContactInfo from './ContactInfo';
import ServiceLocation from './ServiceLocation';

const Info = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: 'solid 1px #eee',
    padding: '20px 0',
})

type Props = {
    data: any,
    containerStyle?: object
}

const ExpertInfo : React.FC<Props>  = ({data, containerStyle={}}) => {
    if(!data) return null;

    const { profile } = data;
    const serviceLocation = map(profile.availableStates, state => state.code).join(', ');

    return (
        <Info style={containerStyle}>
            <ServiceLocation data={serviceLocation}/>
            <ContactInfo  data={data}/>
        </Info>
    )
}

export default ExpertInfo;