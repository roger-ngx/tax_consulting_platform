import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ChattingView from '../blocks/ChattingView';
import { updateOnlineStatus } from '../firebase/login';

const Container =styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%;
  height: 100vh;
`

const Messages = () => {

  const uid = useSelector(state => state.firebase.auth.uid);

  useEffect(() => {
    if(uid){
      const timer = setInterval(() => updateOnlineStatus(uid), 60000);

      return () => clearInterval(timer);
    }
  }, [uid]);

  return (
    <ChattingView />
  )
}

export default Messages
