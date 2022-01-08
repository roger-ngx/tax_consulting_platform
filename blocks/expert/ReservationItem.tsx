import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import Avatar from '../../elements/Avatar';
import GradientButton from '../../elements/GradientButton';

const Container = styled('div')({
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    padding: 16
})

const Body = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 12
})

const Status = styled('span')(props => ({
    alignSelf: 'flex-start',
    backgroundColor: '#EAEDF2',
    color: props.color,
    fontWeight: 'bold',
    borderRadius: 100,
    padding: '8px 16px'
}))

const RightButton = styled(Button)(props => ({
    alignSelf: 'flex-start',
    border: 'solid 1px #0045D1',
    borderRadius: 100,
    textTransform: 'none',
    color: '#0045D1',
    padding: '8px 16px'
}))

type Props = {
    date: string,
    time: string,
    content: string,
    status?: string,
    isFinished: boolean
}

const ReservationItem : React.FC<Props> = ({date, time, content, status, isFinished}) => {

    return (
        <Container>
            <Avatar
                size={80}
                src='/assets/images/profile.png'
                containerStyle={{alignSelf: 'flex-start'}}
            />
            <Body>
                <span style={{fontWeight: 'bold'}}>{date}</span>
                <span>{time}</span>
                <span style={{margin: '16px 0'}}>{content}</span>
                {
                    status==='Completed' &&
                    <GradientButton
                        text='leave a review'
                        containerStyle={{maxWidth: 200}}
                    />
                }
            </Body>
            {
                isFinished ?
                <Status color={status==='Canceled' ? 'red' : '#989FAD'}>
                    {status}
                </Status>
                :
                <Link href='/reservation' passHref>
                    <RightButton>
                        Request
                    </RightButton>
                </Link>
            }
        </Container>
    )
}

export default ReservationItem;