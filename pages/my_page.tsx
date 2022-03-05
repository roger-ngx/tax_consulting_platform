import React, { useState, useRef, useEffect, createRef } from 'react';
import { styled } from '@mui/system';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { get } from 'lodash'; 
import Button from '@mui/material/Button';

import MyPageSideMenu from '../blocks/MyPage/MyPageSideMenu';
import EnrollExpert from '../blocks/MyPage/EnrollExpert';
import TermsAndConditions from '../blocks/MyPage/TermsAndConditions';
import QnA from '../blocks/MyPage/QnA';
import Help from '../blocks/MyPage/Help';
import AskQuestionDialog from '../dialogs/AskQuestionDialog';
import ExpertReservationView from '../blocks/MyPage/ExpertReservationView';
import ReservationView from '../blocks/MyPage/ReservationView';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 80px)',
})

const Title = styled('span')({
    fontSize: 22,
    fontWeight: 'bold',
})

const Horizontal = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
})

const MyPage = () => {

    const [ selectedItem, setSelectedItem ] = useState<string>();
    const uid = useSelector((state: any) => get(state, 'firebase.auth.uid'));
    const [ helpInquiryShow, setHelpInquiryShow ] = useState(false);
    const contentRef = useRef<null | HTMLDivElement>(null); 

    useEffect(() => {
        contentRef!.current!.scrollIntoView();
    }, [selectedItem]);

    const expert = useSelector((state: any) => get(state, `firestore.data.experts.${uid}`));

    return (
        <Container>
            <div style={{height: '100%', overflowY: 'scroll', paddingBottom: 100}}>
                <MyPageSideMenu
                    onSelectedItemChanged={(item: string) => setSelectedItem(item)}
                />
            </div>
            <div ref={contentRef} style={{flex: 1, marginLeft: 24, overflowY: 'auto', height: '100%', paddingBottom: 100}}>
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
                        expert ? <ExpertReservationView /> : <ReservationView />
                    )
                }

                {
                    selectedItem && ['Enroll Expert', 'Expert Profile'].includes(selectedItem) &&
                    <EnrollExpert expert={expert} />
                }

                {
                    selectedItem === 'Terms and conditions' &&
                    <TermsAndConditions />
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