
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

import Avatar from '../../elements/Avatar';
import Tag from '../../elements/Card/Tag';
import MatchingCount from '../../elements/MatchingCount';
import ReviewCount from '../../elements/ReviewCount';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { SERVICE_CATEGORIES } from '../../models/EnrollService';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
    border: 'solid 1px #DFDFDF',
    backgroundColor: '#F6F8FB'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row'
})

type Props = {
    data: any
}

const ProfileHeader : React.FC<Props> = ({data}) => {

    if(!data) return null;

    const { displayName, photoURL, profile, service } = data;

    const serviceCategories = service.category;

    return (
        <Container>
            <div>
                <Avatar
                    src={photoURL}
                    size={80}
                    active={true}
                    name={displayName}
                />
            </div>
            <div style={{flex: 1, marginLeft: 24}}>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginBottom: 24}}>
                    {
                        serviceCategories.includes(SERVICE_CATEGORIES.TAX) &&
                        <Tag
                            text='Tax'
                            colors={['#0045D1', '#5185EE']}
                        />
                    }
                    {
                        serviceCategories.includes(SERVICE_CATEGORIES.FUND) &&
                        <Tag
                            text='Fund'
                            colors={['#0075FF', '#74B4FF']}
                            containerStyle={{margin: '0 4px'}}
                        />
                    }
                    {
                        serviceCategories.includes(SERVICE_CATEGORIES.ACCOUNTANCY) &&
                        <Tag
                            text='Accountancy'
                            colors={['#990002', '#E80000']}
                        />
                    }
                </div>
                <div style={{fontSize: 22, fontWeight: 'bold', marginBottom: 32}}>{profile.introduction}</div>
                <Horizontal>
                    <ReviewCount containerStyle={{marginRight: 24}} count={24} rate={4.2}/>
                    <MatchingCount count={32}/>
                </Horizontal>
            </div>
            <div style={{margin: - 8}}>
                <IconButton>
                    <FavoriteBorderIcon />
                </IconButton>
            </div>
        </Container>
    )
}

export default ProfileHeader;