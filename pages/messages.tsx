import styled from 'styled-components';

import ChattingView from '../blocks/ChattingView';

const Container =styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%;
  height: 100vh;
`

const Messages = () => {

  return (
    <ChattingView chatId='thanhthuowng'/>
  )
}

export default Messages
