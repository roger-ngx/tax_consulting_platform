import React from 'react';
import { styled } from '@mui/system';
import { map } from 'lodash';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

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

const AboutService = ({data}) => {
    if(!data) return null;
      
    const {photos, videos} = data;

    return (
        <Container>
            <Column>
                <Title>About</Title>
                <div>
                    {data.detail}
                </div>
            </Column>
            <ImageGallery
                items={
                    map(photos, photo => ({original: photo}))
                }
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
            />
            
        </Container>
    )
}

export default AboutService;