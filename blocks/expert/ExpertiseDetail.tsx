import React from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';

const Container = styled('div')({

})

const Group = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Header = styled('span')({
    fontWeight: 'bold',
    marginBottom: 4
})

const Content = styled('span')({
    marginBottom: 32
})

const ExpertiseDetail = () => {

    return (
        <Container>
            <Group>
                <Header>About</Header>
                <Content>A freelancer with an acquired experience of more than 5 years in the field of data entry and web research, specializes in Microsoft Word and Excel and converting data from pdf to word to excel.</Content>
            </Group>
            <Group>
                <Header>Career</Header>
                <Content>
                    <Paper style={{alignSelf: 'flex-start', padding: 20}} variant='elevation'>
                        <span>Newyork company, Tax Manager, 2012~2017</span>
                    </Paper>
                </Content>
            </Group>
            <Group>
                <Header>Education</Header>
                <Content>
                    <Paper style={{alignSelf: 'flex-start', padding: 20}} variant='elevation'>
                        <span>New york University, Tax Managing, bachelors degree, 2012~2017</span>
                    </Paper>
                </Content>
            </Group>
            <Group>
                <Header>Certificate</Header>
                <Content>
                    <Paper style={{alignSelf: 'flex-start', padding: 20}} variant='elevation'>
                        <span>Tax managing license, United State, 2012</span>
                    </Paper>
                </Content>
            </Group>
        </Container>
    )
}

export default ExpertiseDetail;