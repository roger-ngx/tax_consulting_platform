import React from 'react';
import { styled } from '@mui/system';
import { map } from 'lodash';

import Profile from './Card/Profile';
import Tag from './Card/Tag';
import Location from './Card/Location';
import AvailableTime from './Card/AvailableTime';
import { SERVICE_CATEGORIES } from '../models/EnrollService';

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

const Card = ({data}) => {
    if(!data) return null;

    const { service, profile } = data;

    const locations = map(profile.availableStates, (state: any) => state.code);

    return (
        <Container style={{cursor: 'pointer'}}>
            <Profile />
            <Body>
                <Horizontal>
                    {
                        service.category.includes(SERVICE_CATEGORIES.TAX) &&
                        <Tag
                            text='Tax'
                            colors={['#0045D1', '#5185EE']}
                        />
                    }
                    {
                        service.category.includes(SERVICE_CATEGORIES.FUND) &&
                        <Tag
                            text='Fund'
                            colors={['#0075FF', '#74B4FF']}
                            containerStyle={{margin: '0 4px'}}
                        />
                    }
                    {
                        service.category.includes(SERVICE_CATEGORIES.ACCOUNTANCY) &&
                        <Tag
                            text='Accountancy'
                            colors={['#990002', '#E80000']}
                        />
                    }
                </Horizontal>
                <Horizontal>
                    <Location locations={locations} containerStyle={{marginRight: 12}}/>
                    <AvailableTime />
                </Horizontal>
                <BodyContent>
                    {service.detail}
                </BodyContent>
                <Price>
                    $50/hr
                </Price>
            </Body>
        </Container>
    )
}

export default Card;