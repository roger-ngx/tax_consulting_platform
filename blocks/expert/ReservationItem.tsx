import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import Avatar from '../../elements/Avatar';
import GradientButton from '../../elements/GradientButton';
import { Reservation, RESERVATION_STATUS } from '../../models/Reservation';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { useState, useEffect } from 'react';

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
    item: Reservation,
    isExpert?: boolean,
    containerStyle?: object
}

const ReservationItem : React.FC<Props> = ({item, containerStyle={}}) => {
    if(!item) return null;

    console.log(item);

    const { date, time, status, user, expertId } = item;

    const pathname = expertId ? '/reservation' : '/reserved_expert';

    const [ photoURL, setPhotoURL ] = useState();

    const expert = expertId && useSelector((state: any) => get(state, `firestore.data.experts[${expertId}]`)); 
    
    useEffect(() => {
        if(user){
            setPhotoURL(user.photoURL);
        }else{
            expert && setPhotoURL(expert.photoURL);
        }
    }, [user, expert]);

    return (
        <Container style={containerStyle}>
            <Avatar
                size={80}
                src={photoURL}
                containerStyle={{alignSelf: 'flex-start'}}
            />
            <Body>
                <span style={{fontWeight: 'bold'}}>{date}</span>
                <span>{time}</span>
                {/* <span style={{margin: '16px 0'}}>{detail}</span> */}
                {
                    expertId && status===RESERVATION_STATUS.COMPLETE &&
                    <Link
                        href={{
                            pathname,
                            query: {
                                isFinished:true,
                                id: item.id
                            }
                        }}
                        passHref
                    >
                        <GradientButton
                            text='Leave a review'
                            containerStyle={{textAlign: 'center', maxWidth: 200}}
                        />
                    </Link>
                }

                {
                    !expertId && status===RESERVATION_STATUS.REQUEST &&
                    <Link
                        href={{
                            pathname,
                            query: {
                                id: item.id
                            }
                        }}
                        passHref
                    >
                        <GradientButton
                            text='Approve'
                            containerStyle={{textAlign: 'center', maxWidth: 200}}
                        />
                    </Link>
                }
            </Body>
            {
                // status===RESERVATION_STATUS.REQUEST ?
                <Link
                    href={{
                        pathname,
                        query: {
                            id: item.id
                        }
                    }}
                    passHref
                >
                    <RightButton>
                        {status}
                    </RightButton>
                </Link>
                // :
                // <Status color={status===RESERVATION_STATUS.CANCEL ? 'red' : '#989FAD'}>
                //     {status}
                // </Status>
            }
        </Container>
    )
}

export default ReservationItem;