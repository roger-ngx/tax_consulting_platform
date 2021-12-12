import { Grid } from '@mui/material';
import styled from 'styled-components';
import Banner from '../blocks/Banner';
import MainSideMenu from '../blocks/MainSideMenu';
import Card from '../elements/Card';

const Container =styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10%;
  height: 100vh;
`

const Home = () => {

  return (
    <div>
      <div style={{margin: '0 -10vw'}}>
        <Banner />
      </div>
      <Container>
        <div>
          <MainSideMenu />
        </div>
        <div style={{flex: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Home
