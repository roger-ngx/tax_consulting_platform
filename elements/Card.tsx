import React from 'react';
import { styled } from '@mui/system';
import Profile from './Card/Profile';
import Tag from './Card/Tag';
import Location from './Card/Location';
import AvailableTime from './Card/AvailableTime';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    border: 'solid 1px #C7C7C7',
    padding: 16,
    borderRadius: 4,
    userSelect: 'none',
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8
})

const Body = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16
})

const BodyContent = styled('span')({
    flex: 1
})

const Price = styled('span')({

})

const Card = () => {

    return (
        <Container style={{cursor: 'pointer'}}>
            <Profile />
            <Body>
                <Horizontal>
                    <Tag
                        text='Tax'
                        colors={['#0045D1', '#5185EE']}
                    />
                    <Tag
                        text='Fund'
                        colors={['#0075FF', '#74B4FF']}
                        containerStyle={{margin: '0 4px'}}
                    />
                    <Tag
                        text='Accountancy'
                        colors={['#990002', '#E80000']}
                    />
                </Horizontal>
                <Horizontal>
                    <Location locations={['NY', 'CA']} containerStyle={{marginRight: 12}}/>
                    <AvailableTime />
                </Horizontal>
                <BodyContent>
                    Solve difficult tax returns at once give!
                </BodyContent>
                <Price>
                    $50/hr
                </Price>
            </Body>
        </Container>
    )
}

export default Card;