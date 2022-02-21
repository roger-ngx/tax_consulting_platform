
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

type Props = {
    data: any
}

const ServiceLocation : React.FC<Props> = ({data}) => {

    return (
        <Horizontal>
            <Column>
                <LocationOnIcon sx={{textAlign: 'center', color: '#838383'}}/>
                <span>{data}</span>
            </Column>
        </Horizontal>
    )
}

export default ServiceLocation;