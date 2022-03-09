import React, { useState } from 'react';
import {styled, sizeHeight} from '@mui/system';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../../elements/Avatar';
import { IUser } from '../../models/User';
import { Button, Grid, CircularProgress } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { map, size, throttle } from 'lodash';
import { createMessageThread } from '../../firebase/messageController';
import { setCurrentThreadId } from '../../stores/messageSlide';
import { useRouter } from 'next/router';

const CustomerDiv = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 24
})

const Customer = ({customer, expertId} : {customer: IUser, expertId: string}) => {
    const { photoURL, displayName, uid } = customer;
    const dispatch = useDispatch();
    const router = useRouter();

    const [ processing, setProcessing ] = useState(false);

    const startChatting = async () => {
        setProcessing(true);
        const threadId = await createMessageThread({srcUserId: expertId, desUserId: uid})
        setProcessing(false);
        if(threadId){
            dispatch(setCurrentThreadId(threadId));
            router.push('/messages');
        }else{
            alert('There are something wrong. See the browser logs');
        }
    }

    return (<CustomerDiv>
        <Avatar
            size={60}
            src={photoURL}
            name={displayName}
            containerStyle={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
            nameTextStyle={{fontSize: 18, marginLeft: 8, fontWeight: 'normal'}}
        />
        <Button
            startIcon={!processing && <ChatBubbleOutlineIcon/>}
            variant='outlined'
            disabled={processing}
            onClick={throttle(startChatting, 2000, {trailing: false})}
        >
            {
                processing ? 
                <CircularProgress sx={{color:'#1976d2', fontSize: 0}} size={16} />
                :
                'Chatting'
            }
        </Button>
    </CustomerDiv>)
}

const CustomersDiv = styled('div')({
    backgroundColor: '#E5E5E5',
    marginTop: 32,
    padding: 24
})

const Customers = () => {

    const expertId = useSelector((state: any) => state.firebase.auth.uid);

    const customers = useSelector((state: any) => state.firestore.ordered.customers);

    useFirestoreConnect(expertId ? [
        {
            collection: 'experts',
            doc: expertId,
            subcollections: [{
                collection: 'reservations'
            }],
            storeAs: 'customers'
        }
    ] : [])

    return (
        <CustomersDiv>
            <div style={{marginBottom: 24}}>
                {size(customers)} customers
            </div>
            <Grid container spacing={2}>
                {
                    map(customers, customer => (
                        <Grid item md={12} lg={6}>
                            <Customer customer={customer.user} expertId={expertId}/>
                        </Grid>
                    ))
                }
            </Grid>
        </CustomersDiv>
    )
}

export default Customers;