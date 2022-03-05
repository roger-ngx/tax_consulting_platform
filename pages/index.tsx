import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { map, isEmpty, filter, intersection, get } from 'lodash';
import styled from 'styled-components';

import Banner from '../blocks/Banner';
import Filter from '../blocks/Filter';
import MainSideMenu from '../blocks/MainSideMenu';
import Card from '../elements/Card';

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

  const experts = useSelector((state: any) => state.firestore.ordered.experts);
  const uid = useSelector((state: any) => get(state, 'firebase.auth.uid'));

  useFirestoreConnect([{
    collection: 'experts'
  }])

  useFirestoreConnect(uid ? [
    {
        collection: 'users',
        doc: uid
    }
  ] : []);

  useEffect(() => {
    if(selectedMenu===-1){
      setSelectedExperts(experts);
      return;
    }

    const data = filter(experts, (expert:any) => {
      const {category} = expert.service;
      return category.includes(selectedMenu);
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
