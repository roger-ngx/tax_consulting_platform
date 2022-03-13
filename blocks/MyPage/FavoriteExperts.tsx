import React, { useEffect, useState } from 'react';
import { get, map, size, includes, filter } from 'lodash';
import { useSelector } from 'react-redux';
import { Grid, styled } from '@mui/material';
import Link from 'next/link';

import Card from '../../elements/Card';

const Container = styled('div')({
    backgroundColor: '#F6F8FB',
    padding: 20
})

const FavoriteExpert = () => {
    const [ favoriteExperts, setFavoriteExperts ] = useState<any[]>([]);
    
    const user = useSelector((state: any) => get(state, 'firestore.ordered.users.0'));

    const experts = useSelector((state: any) => get(state, 'firestore.ordered.experts', []));

    useEffect(() => {
        if(!user) return;

        const {favoriteExperts} = user;
        
        if(size(favoriteExperts) > 0){
            setFavoriteExperts(filter(experts, (expert: any) => includes(favoriteExperts, expert.id)));
        } 
    }, [user, experts]);

    return (
        <Container>
            <Grid container spacing={2}>
            {
                map(favoriteExperts, expert => (
                <Link href={`/expert_detail?id=${expert.id}`}>
                    <Grid item xs={12} sm={6}>
                        <Card data={expert} />
                    </Grid>
                </Link>
                ))
            }
            </Grid>
        </Container>
    )
}

export default FavoriteExpert;