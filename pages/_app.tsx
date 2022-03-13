import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore';
import { PersistGate } from 'redux-persist/integration/react'
import styled from 'styled-components';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import '../styles/globals.css'
import NavigationBar from '../blocks/NavigationBar';
import firebase from '../firebase/firebaseInit';
import {persistor, store} from '../stores/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%;
  min-width: 800px
`

Sentry.init({
  dsn: "https://32940fccc5cd44f6a22556527f4f26c3@o938042.ingest.sentry.io/5888186",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

type Props = {
  Component: any,
  pageProps: any
}

const MyApp : React.FC<Props> = ({ Component, pageProps }) => {

  // react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true ,// Firestore for Profile instead of Realtime DB
    oneListenerPerPath: true
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
          <div style={{display: 'flex', flexDirection: 'column', maxHeight: '100vh'}}>
            <div style={{minWidth: 800, padding: '24px 10%', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000}}>
              <NavigationBar />
            </div>
            <Container>
              <Component {...pageProps} />
            </Container>
          </div>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default MyApp
