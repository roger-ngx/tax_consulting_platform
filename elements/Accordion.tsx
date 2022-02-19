import React, { useState, useEffect, ReactChild, ReactElement } from 'react';
import { styled } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

const Container = styled('div')({

})

const Header = styled(Button)({
    display: 'flex',
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'left',
    textTransform: 'none',
    borderRadius: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
})

const Content = styled('div')({
    backgroundColor: '#F6F8FB'
})

type Props = {
    header: ReactElement,
    content: ReactElement
}

const Accordion: React.FC<Props> = ({header, content}) => {

    const [ showContent, setShowContent ] = useState(false);

    return (
        <Container>
            <Header
                onClick={() => setShowContent(!showContent)}
            >
                {header}
                <div>
                    <IconButton>
                        {
                            showContent ?
                            <KeyboardArrowUpIcon />
                            :
                            <KeyboardArrowDownIcon />
                        }
                    </IconButton>
                </div>
            </Header>
            {
                showContent &&
                <Content>
                    {content}
                </Content>
            }
        </Container>
    )
}

export default Accordion;