
import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Grid, styled, Tab, Tabs } from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { get, map } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import PriceCard from '../blocks/expert/PriceCard';
import ProfileHeader from '../blocks/expert/ProfileHeader';
import ServiceButtons from '../blocks/expert/ServiceButtons';
import ShowMoreButton from '../elements/ShowMoreButton';
import InfoCard from '../elements/InfoCard';
import ExpertiseDetail from '../blocks/expert/ExpertiseDetail';
import ServiceReview from '../blocks/expert/ServiceReview';
import { useRouter } from 'next/router';
import ExpertInfo from '../blocks/expert/Info';
import AboutService from '../blocks/expert/AboutService';
import { setOpenLoginModal } from '../stores/userInfoSlide';
import { createMessageThread } from '../firebase/messageController';
import { setCurrentThreadId } from '../stores/messageSlide';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 200
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

const ColumnLeft = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20
})

const ColumnRight = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const ExpertServiceDetail = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: any) => state.firebase.auth)

    const expert = useSelector((state: any) => get(state, `firestore.data.experts[${router.query.id}]`));
    // console.log('ExpertServiceDetail', get(expert, 'price.options'));

    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ processing, setProcessing ] = useState(false);

    const handleTabChange = (event: any, newValue: any) => {
        setSelectedTab(newValue);
    };

    const goToReservation = () => {
        if(!user.uid){
            dispatch(setOpenLoginModal(true));
            return;
        }
        router.push(`/expert_reservation?id=${expert.id}`)
    }

    const goToChat = async () => {
        if(!user.uid){
            dispatch(setOpenLoginModal(true));
            return;
        }

        setProcessing(true);
        const threadId = await createMessageThread({srcUserId: user.uid, desUserId: expert.id})
        setProcessing(false);
        if(threadId){
            dispatch(setCurrentThreadId(threadId));
            router.push('/messages');
        }else{
            alert('There are something wrong. See the browser logs');
        }
    }

    return (
        <Container>
            <Breadcrumbs separator=">" aria-label="breadcrumb" style={{marginBottom: 24}}>
                <Link
                    href="/"
                >
                    Find Expert
                </Link>
                <span>
                    Expert Profile
                </span>
            </Breadcrumbs>
            <Horizontal>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <ColumnLeft>
                            <ProfileHeader data={expert}/>
                            <ExpertInfo data={expert}/>

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{marginBottom: 24}}>
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleTabChange}
                                >
                                    <Tab label="Service" />
                                    <Tab label="Expertise" />
                                    <Tab label="Review" />
                                </Tabs>
                            </Box>
                            {
                                selectedTab === 0 &&
                                <AboutService data={expert.service}/>
                            }
                            {
                                selectedTab === 1 &&
                                <ExpertiseDetail data={expert.profile}/>
                            }
                            {
                                selectedTab === 2 &&
                                <ServiceReview data={expert}/>
                            }
                        </ColumnLeft>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <ColumnRight>
                            <Horizontal style={{marginBottom: 8}}>
                                <PaidOutlinedIcon />
                                <span style={{fontWeight: '500', marginLeft: 4}}>Price</span>
                            </Horizontal>
                            <>
                            {
                                expert && map(expert.price?.options, (option:any) => (
                                    <PriceCard
                                        key={option.value + option.unit}
                                        type={option.title}
                                        matching={20}
                                        detail={option.detail}
                                        price={`$${option.value} ${option.unit}`}
                                        containerStyle={{marginBottom: 20}}
                                    />
                                ))
                            }
                            </>
                            <div style={{textAlign: 'center', margin: '20px 0'}}>
                                <ShowMoreButton />
                            </div>
                            <InfoCard />
                            <ServiceButtons
                                containerStyle={{marginTop: 20}}
                                goToReservation={goToReservation}
                                goToChat={goToChat}
                                disabled={processing}
                            />
                        </ColumnRight>
                    </Grid>
                </Grid>
            </Horizontal>
        </Container>
    )
}

export default ExpertServiceDetail;