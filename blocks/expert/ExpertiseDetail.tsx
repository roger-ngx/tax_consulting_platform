import React from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import { map } from 'lodash';

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
    marginBottom: 32,
})

const ExpertiseDetail = ({data}) => {
    if(!data) return null;
    const { introduction, careers, educations, certificates } = data;

    return (
        <Container>
            <Group>
                <Header>About</Header>
                <Content>{introduction}</Content>
            </Group>
            <Group>
                <Header>Career</Header>
                {
                    map(careers, career => (
                        <Content>
                            <Paper style={{alignSelf: 'flex-start', padding: 20}} variant='elevation'>
                                <span>{`${career.company}, ${career.position}, ${career.startYear}~${career.endYear}`}</span>
                            </Paper>
                        </Content>
                    ))
                }
            </Group>
            <Group>
                <Header>Education</Header>
                {
                    map(educations, education => (
                        <Content>
                            <Paper style={{alignSelf: 'flex-start', padding: 20}} variant='elevation'>
                                <span>{`${education.university}, ${education.major}, ${education.degree} degree, ${education.startYear}~${education.endYear}`}</span>
                            </Paper>
                        </Content>
                    ))
                }
            </Group>
            <Group>
                <Header>Certificate</Header>
                {
                    map(certificates, certificate => (
                        <Content>
                            <Paper style={{alignSelf: 'flex-start', padding: 20}} variant='elevation'>
                                <span>{`${certificate.name}, ${certificate.authority}`}</span>
                            </Paper>
                        </Content>
                    ))
                }
            </Group>
        </Container>
    )
}

export default ExpertiseDetail;