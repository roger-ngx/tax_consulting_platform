import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { get } from 'lodash'; 

import MyPageSideMenu from '../blocks/MyPage/MyPageSideMenu';
import Reservation from '../blocks/MyPage/Reservation';
import EnrollExpert from '../blocks/MyPage/EnrollExpert';
import TermsAndConditions from '../blocks/MyPage/TermsAndConditions';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

const Title = styled('span')({
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
})

const MyPage = () => {

    const [ selectedItem, setSelectedItem ] = useState<string>();
    const uid = useSelector((state: any) => state.firebase.auth.uid);

    const handleTabChange = (event: Event, newValue: any) => {
        setSelectedItem(newValue);
    };

    useFirestoreConnect([
        {
            collection: 'experts',
            doc: uid
        }
    ]);

    const expert = useSelector((state: any) => get(state, `firestore.data.experts.${uid}`));

    return (
        <Container>
            <div>
                <MyPageSideMenu
                    onSelectedItemChanged={(item: string) => setSelectedItem(item)}
                />
            </div>
            <div style={{flex: 1, marginLeft: 24}}>
                <Title>{selectedItem}</Title>
                {
                    selectedItem === 'Reservation' &&
                    <Reservation isExpert={!!expert}/>
                }

                {
                    selectedItem && ['Enroll Expert', 'Expert Profile'].includes(selectedItem) &&
                    <EnrollExpert expert={expert}/>
                }

                {
                    selectedItem === 'Terms and conditions' &&
                    <TermsAndConditions />
                }
            </div>
        </Container>
    )
}

export default MyPage;