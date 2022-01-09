import React from 'react';
import { styled } from '@mui/system';

const Container = styled('div')({

})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Title = styled('div')({
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4
})

const AboutService = () => {

    return (
        <Container>
            <Column>
                <Title>About</Title>
                <div>
                A freelancer with an acquired experience of more than 5 years in the field of data entry and web research, specializes in Microsoft Word and Excel and converting data from pdf to word to excel.
                </div>
            </Column>
        </Container>
    )
}

export default AboutService;