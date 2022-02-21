
import { styled } from '@mui/system';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExpertProfile from '../../models/ExpertProfile';

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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

    const { phoneNumber, email} = data;
    const profile = new ExpertProfile(data.profile);

    return (
        <Horizontal>
            <Column>
                <ChatBubbleIcon sx={{textAlign: 'center', color: '#838383'}}/>
            </Column>
            <div style={{marginLeft: 12}}>
                <table>
                    {phoneNumber && <tr><td>Phone number</td><td>{phoneNumber}</td></tr>}
                    <tr><td style={{color: '#888', marginRight: 4}}>Email</td><td>{email}</td></tr>
                    <tr><td style={{color: '#888', marginRight: 4}}>Time</td><td>{profile.contactTimeString}</td></tr>
                </table>
            </div>
        </Horizontal>
    )
}

export default ContactInfo;