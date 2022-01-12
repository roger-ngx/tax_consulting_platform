
import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Grid, styled, Tab, Tabs } from '@mui/material';
import PriceCard from '../blocks/expert/PriceCard';
import ProfileHeader from '../blocks/expert/ProfileHeader';
import ServiceButtons from '../blocks/expert/ServiceButtons';
import ShowMoreButton from '../elements/ShowMoreButton';
import InfoCard from '../elements/InfoCard';
import ContactInfo from '../blocks/expert/ContactInfo';
import ServiceLocation from '../blocks/expert/ServiceLocation';
import ExpertiseDetail from '../blocks/expert/ExpertiseDetail';
import Link from 'next/link';
import ServiceReview from '../blocks/expert/ServiceReview';
import { useRouter } from 'next/router';
import ExpertInfo from '../blocks/expert/Info';
import AboutService from '../blocks/expert/AboutService';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
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

    const router = useRouter();

    const [ selectedTab, setSelectedTab ] = useState(0);

    const handleTabChange = (event: Event, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Container>
            <Breadcrumbs separator=">" aria-label="breadcrumb" style={{marginBottom: 24}}>
                <Link
                    // underline="hover"
                    // color="inherit"
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
                            <ProfileHeader />
                            <ExpertInfo />

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{marginBottom: 24}}>
                                <Tabs
                                    value={selectedTab}
                                    // onChange={handleTabChange}
                                >
                                    <Tab label="Service" />
                                    <Tab label="Expertise" />
                                    <Tab label="Review" />
                                </Tabs>
                            </Box>
                            {
                                selectedTab === 0 &&
                                <AboutService />
                            }
                            {
                                selectedTab === 1 &&
                                <ExpertiseDetail />
                            }
                            {
                                selectedTab === 2 &&
                                <ServiceReview />
                            }
                        </ColumnLeft>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <ColumnRight>
                            <PriceCard
                                type='Basic consultant'
                                matching={20}
                                detail='Solve difficult tax returns at once give!'
                                price='$50/hr'
                                containerStyle={{marginBottom: 20}}
                            />
                            <PriceCard
                                type='Basic consultant'
                                matching={20}
                                detail='Solve difficult tax returns at once give!'
                                price='$50/hr'
                            />
                            <div style={{textAlign: 'center', margin: '20px 0'}}>
                                <ShowMoreButton />
                            </div>
                            <InfoCard />
                            <ServiceButtons
                                containerStyle={{marginTop: 20}}
                                goToReservation={() => router.push('/expert_reservation')}
                                goToChat={() => router.push('/messages')}
                            />
                        </ColumnRight>
                    </Grid>
                </Grid>
            </Horizontal>
        </Container>
    )
}

export default ExpertServiceDetail;