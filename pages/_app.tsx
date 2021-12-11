import '../styles/globals.css'
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore';
import { PersistGate } from 'redux-persist/integration/react'
import styled from 'styled-components';

import NavigationBar from '../blocks/NavigationBar';
import firebase from '../firebase/firebaseInit';
import {persistor, store} from '../stores/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%;
  height: 100vh;
`

function MyApp({ Component, pageProps }) {

  // react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <div style={{margin: '24px 0'}}>
              <NavigationBar />
            </div>
            <Component {...pageProps} />
          </Container>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default MyApp
