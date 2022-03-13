import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { map, isEmpty, filter, intersection, get } from 'lodash';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Banner from '../blocks/Banner';
import Filter from '../blocks/Filter';
import MainSideMenu from '../blocks/MainSideMenu';
import Card from '../elements/Card';
import { SERVICE_CATEGORIES } from '../models/EnrollService';
import { updateOnlineStatus } from '../firebase/login';

const Container =styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 72px);
  position: sticky;
  top: 120px;
`

const Home = () => {
  const [ selectedMenu, setSelectedMenu ] = useState<number>();
  const [ selectedExperts, setSelectedExperts ] = useState<any[]>([]);

  const [ selectedStates, setSelectedStates ] = useState<string[]>([]);
  const [ recentlyActive, setRecentlyActive ] = useState(false);
  const [ online, setOnline ] = useState(false);

  const experts = useSelector((state: any) => state.firestore.ordered.experts);
  const uid = useSelector((state: any) => get(state, 'firebase.auth.uid'));

  const userType = useSelector((state: any) => state.user.userType);

  useFirestoreConnect([{
    collection: 'experts',
    where: ['active', '==', true]
  }])

  useFirestoreConnect(uid ? [
    {
        collection: 'users',
        doc: uid
    }
  ] : []);

  useEffect(() => {
    if(uid){
      const timer = setInterval(() => updateOnlineStatus(uid, userType), 60000);

      return () => clearInterval(timer);
    }
  }, [uid, userType]);

  useEffect(() => {
    if(selectedMenu===-1){
      setSelectedExperts(experts);
      return;
    }

    const data = filter(experts, (expert:any) => {
      const {category} = expert.service;

      const { availableStates } = expert.profile;
      const contries = map(availableStates, country => country.code);

      switch(selectedMenu){
        case SERVICE_CATEGORIES.TAX:
        return category.includes(selectedMenu);

        case SERVICE_CATEGORIES.BOOKKEEPING:
        return category.includes(SERVICE_CATEGORIES.FUND) || category.includes(SERVICE_CATEGORIES.ACCOUNTANCY);

        case SERVICE_CATEGORIES.JAPAN:
          return contries.includes('JPN');

        case SERVICE_CATEGORIES.KOREA:
          return contries.includes('KR');

        case SERVICE_CATEGORIES.CHINA:
          return contries.includes('CHN');

        case SERVICE_CATEGORIES.SPAIN:
          return contries.includes('SPN');
      }
    })

    setSelectedExperts(data);
  }, [selectedMenu, experts]);

  useEffect(() => {
    if(isEmpty(selectedStates)){
      setSelectedExperts(experts);
      return;
    }

    const data = filter(experts, (expert:any) => {
      const {availableStates} = expert.profile;
      const stateCodes = map(availableStates, state => state.code);
      return intersection(selectedStates, stateCodes).length > 0;
    })

    setSelectedExperts(data);
  }, [selectedStates, experts]);

  useEffect(() => {
    if(online){
      const data = filter(selectedExperts, (expert:any) => {
        const {lastAccessAt} = expert;

        return lastAccessAt && ((dayjs().unix() - lastAccessAt.seconds) < 300); //last access in 5 minutes 
      });

      setSelectedExperts(data);
    }else{
      setSelectedExperts(experts);
    }
  }, [online]);

  useEffect(() => {
    if(recentlyActive){
      const data = filter(selectedExperts, (expert:any) => {
        const {lastAccessAt} = expert;

        return lastAccessAt && ((dayjs().unix() - lastAccessAt.seconds) < 3600); //last access in an hour
      });

      setSelectedExperts(data);
    }else{
      setSelectedExperts(experts);
    }
  }, [recentlyActive]);

  return (
    <div>
      <div style={{margin: '0 -10vw'}}>
        <Banner />
      </div>
      <Container>
        <div style={{paddingRight: 12, borderRightColor: '#eee', borderRightWidth:1, borderRightStyle: 'solid'}}>
          <MainSideMenu
            onMenuChanged={setSelectedMenu}
          />
        </div>
        <div style={{flex: 1, marginLeft: 24}}>
          <div style={{margin: '24px 0'}}>
            <Filter
              onSearchingStatesChanged={setSelectedStates}
              onSelectRecentlyActiveState={setRecentlyActive}
              onSelectOnlineState={setOnline}
            />
          </div>
          <Grid container spacing={2}>
            {
              map(selectedExperts, expert => (
                <Link href={`/expert_detail?id=${expert.id}`}>
                  <Grid item xs={12} sm={6}>
                      <Card data={expert} />
                  </Grid>
                </Link>
              ))
            }
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Home
