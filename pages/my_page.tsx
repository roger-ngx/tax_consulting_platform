import React, { useState, useRef, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { get } from 'lodash'; 
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import MyPageSideMenu from '../blocks/MyPage/MyPageSideMenu';
import EnrollExpert from '../blocks/MyPage/EnrollExpert';
import TermsAndConditions from '../blocks/MyPage/TermsAndConditions';
import QnA from '../blocks/MyPage/QnA';
import Help from '../blocks/MyPage/Help';
import AskQuestionDialog from '../dialogs/AskQuestionDialog';
import ExpertReservationView from '../blocks/MyPage/ExpertReservationView';
import ReservationView from '../blocks/MyPage/ReservationView';
import Customers from '../blocks/MyPage/Customers';
import PhoneVerification from '../blocks/expert/PhoneVerification';
import ExpertSubscription from '../blocks/expert/ExpertSubscription';
import FavoriteExpert from '../blocks/MyPage/FavoriteExperts';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 80px);
`

const Title = styled.span`
    font-size: 22px;
    font-weight: bold;
`

const Horizontal = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const SideMenu = styled.div`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;
    padding-right: 12px;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
`

const MyPage = () => {

    const [ selectedItem, setSelectedItem ] = useState<string>();
    const uid = useSelector((state: any) => get(state, 'firebase.auth.uid'));
    const [ helpInquiryShow, setHelpInquiryShow ] = useState(false);
    const contentRef = useRef<null | HTMLDivElement>(null); 

    const [ isPaymentFinish,  setPaymentFinish ] = useState(false);
    
    const expert = useSelector((state: any) => get(state,'firestore.ordered.enrollExpert.0'));

    useFirestoreConnect(uid ? [{
        collection: 'experts',
        doc: uid,
        storeAs: 'enrollExpert'
    }] : []);
    
    useEffect(() => {
        contentRef!.current!.scrollIntoView();
    }, [selectedItem]);

    useEffect(() => {
        if(!expert) return;

        const { subscribedUntil } = expert;
        if(subscribedUntil){
            dayjs().isBefore(expert.subscribedUntil.seconds * 1000) && setPaymentFinish(true);
        }
    }, [expert]);

    return (
        <Container>
            <SideMenu>
                <MyPageSideMenu
                    onSelectedItemChanged={(item: string) => setSelectedItem(item)}
                />
            </SideMenu>
            <div ref={contentRef} style={{flex: 1, marginLeft: 12, overflowY: 'auto', height: '100%', paddingBottom: 100}}>
                <Horizontal>
                    <Title>{selectedItem}</Title>
                    {
                        selectedItem === 'Help' &&
                        <Button variant='contained' onClick={() => setHelpInquiryShow(true)}>Write</Button>
                    }
                </Horizontal>
                {
                    selectedItem === 'Reservation' &&
                    (
                        expert?.active ? <ExpertReservationView /> : <ReservationView />
                    )
                }

                {
                    selectedItem && ['Enroll Expert', 'Expert Profile'].includes(selectedItem) &&
                    (
                        isPaymentFinish ?
                        <EnrollExpert />
                        :
                        <ExpertSubscription onFinish={() => setPaymentFinish(true)} />
                    )
                }

                {
                    selectedItem === 'Terms and conditions' &&
                    <TermsAndConditions />
                }

                {
                    selectedItem === 'Customers' &&
                    <Customers />
                }

                {
                    selectedItem === 'Like' &&
                    <FavoriteExpert />
                }       

                {
                    selectedItem === 'QnA' &&
                    <QnA />
                }

                {
                    selectedItem === 'Help' &&
                    <Help />
                }
                <AskQuestionDialog
                    open={helpInquiryShow}
                    onClose={(e: any, reason?: string) => {
                        if(reason==='backdropClick'){
                            return;
                        }
                        setHelpInquiryShow(false)
                    }}
                />
            </div>
        </Container>
    )
}

export default MyPage;