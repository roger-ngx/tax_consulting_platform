
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const ServiceLocation = ({data}) => {

    return (
        <Horizontal>
            <Column>
                <LocationOnIcon sx={{textAlign: 'center'}}/>
                <span>Service Location</span>
            </Column>
        </Horizontal>
    )
}

export default ServiceLocation;