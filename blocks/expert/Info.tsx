import { styled } from '@mui/system';
import ContactInfo from './ContactInfo';
import ServiceLocation from './ServiceLocation';

const Info = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    border: 'solid 1px #eee',
    padding: '20px 0',
})

const ExpertInfo = ({containerStyle={}}) => {

    return (
        <Info style={containerStyle}>
            <ServiceLocation />
            <ContactInfo />
        </Info>
    )
}

export default ExpertInfo;