
import { styled } from '@mui/system';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

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

const ContactInfo : React.FC<Props> = ({data}) => {

    return (
        <Horizontal>
            <Column>
                <ChatBubbleIcon sx={{textAlign: 'center'}}/>
                <span>Contact Info</span>
            </Column>
            <div>
                <Horizontal>
                    
                </Horizontal>
            </div>
        </Horizontal>
    )
}

export default ContactInfo;