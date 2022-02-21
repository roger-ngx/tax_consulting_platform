import { Grid } from '@mui/material';
import Link from 'next/link';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { map, size } from 'lodash';
import styled from 'styled-components';

import Banner from '../blocks/Banner';
import Filter from '../blocks/Filter';
import MainSideMenu from '../blocks/MainSideMenu';
import Card from '../elements/Card';

const Container =styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const Home = () => {

  const experts = useSelector((state: any) => state.firestore.ordered.experts);

  useFirestoreConnect([{
    collection: 'experts'
  }])

  return (
    <div>
      <div style={{margin: '0 -10vw'}}>
        <Banner />
      </div>
      <Container>
        <div style={{paddingRight: 12, borderRightColor: '#eee', borderRightWidth:1, borderRightStyle: 'solid'}}>
          <MainSideMenu />
        </div>
        <div style={{flex: 1, marginLeft: 24}}>
          <div style={{margin: '24px 0'}}>
            <Filter />
          </div>
          <Grid container spacing={2}>
            {
              map(experts, expert => (
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
