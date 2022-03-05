import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { throttle, get } from 'lodash';

import Profile from './Card/Profile';
import Tag from './Card/Tag';
import Location from './Card/Location';
import AvailableTime from './Card/AvailableTime';
import { SERVICE_CATEGORIES } from '../models/EnrollService';
import ExpertProfile from '../models/ExpertProfile';
import { useSelector } from 'react-redux';
import { likeExpert, dislikeExpert } from '../firebase/firebaseUser';

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
})

const Body = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16,
    flex: 1
})

const BodyContent = styled('span')({
    flex: 1,
    marginBottom: 16
})

const Price = styled('div')({
    fontWeight: 'bolder'
})

type Props = {
    data: any
}

const Card: React.FC<Props> = ({data}) => {
    if(!data) return null;

    const { service, price, photoURL, displayName } = data;
    const userType = useSelector((state: any) => state.user.userType);
    const user = useSelector((state: any) => get(state, 'firestore.ordered.users[0]'));

    const [ isFavoriteExpert, setFavoriteExpert ] = useState(false);

    const profile = new ExpertProfile(data.profile);

    const {value, unit} = price.options[0];

    useEffect(() => {
        if(user && user.favoriteExperts){
            setFavoriteExpert(user.favoriteExperts.includes(data.id))
        }
    }, [user, data])

    const addExpertToFavoriteList = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        let favExperts = user.favoriteExperts;
        if(favExperts && favExperts.includes(data.id)){
            dislikeExpert(user.id, data.id);
        }else{
            likeExpert(user.id, data.id);
        }
    }

    return (
        <Container style={{width: '100%', cursor: 'pointer'}}>
            <div style={{width: '25%', height: 'auto'}}>
                <Profile
                    src={photoURL}
                    name={displayName}
                />
            </div>
            <Body>
                <Horizontal style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
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
                    {
                        userType==='user' &&
                        <IconButton
                            onClick={throttle(addExpertToFavoriteList, 2000, {trailing: false})}
                        >
                            {
                                isFavoriteExpert ?
                                <FavoriteIcon style={{color: '#FF4B4B'}}/>
                                :
                                <FavoriteBorderIcon style={{color: '#C7C7C7'}}/>
                            }
                        </IconButton>
                    }
                </Horizontal>
                <Horizontal style={{marginBottom: 8}}>
                    <Location location={profile.locationsString} containerStyle={{marginRight: 12}}/>
                    <AvailableTime contactTime={profile.contactTimeString}/>
                </Horizontal>
                <BodyContent>
                    {service.detail}
                </BodyContent>
                <Price>
                    {`$${value} ${unit}`.replace(' per ', '/')}
                </Price>
            </Body>
        </Container>
    )
}

export default Card;