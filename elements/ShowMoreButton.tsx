import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TFButtonBase from './TFButtonBase';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

const Text = styled('span')({

})

const ShowMoreButton = () => {

    return (
        <TFButtonBase>
            <Container>
                <Text>show more</Text>
                <ExpandMoreIcon />
            </Container>
        </TFButtonBase>
    )
}

export default ShowMoreButton;