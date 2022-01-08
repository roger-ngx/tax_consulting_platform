import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Tabs, Tab } from '@mui/material';

import MyPageSideMenu from '../blocks/MyPage/MyPageSideMenu';
import Profile from '../blocks/MyPage/Profile';
import Service from '../blocks/MyPage/Service';
import Price from '../blocks/MyPage/Price';
import Reservation from '../blocks/MyPage/Reservation';
import EnrollExpert from '../blocks/MyPage/EnrollExport';

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

    const [ selectedItem, setSelectedItem ] = useState();

    const handleTabChange = (event, newValue) => {
        setSelectedItem(newValue);
    };

    return (
        <Container>
            <div>
                <MyPageSideMenu
                    onSelectedItemChanged={setSelectedItem}
                />
            </div>
            <div style={{flex: 1, marginLeft: 24}}>
                <Title>{selectedItem}</Title>
                {
                    selectedItem==='Reservation' &&
                    <Reservation />
                }

                {
                    selectedItem === 'Enroll Expert' &&
                    <EnrollExpert />
                }
            </div>
        </Container>
    )
}

export default MyPage;