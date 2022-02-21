import React from 'react';
import { styled } from '@mui/system';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

const Name = styled('span')({
    fontSize: 16
})

const Rate = styled('span')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

type Props = {
    src: string,
    name: string,
    rate?: number,
    rateCount?: number
}

const Profile: React.FC<Props> = ({src='/assets/images/profile.png', name='Roger', rate=0, rateCount=0}) => {

    return (
        <Container>
            <div style={{borderRadius: '30px', overflow: 'hidden', fontSize: 0}}>
                <Image
                    src={src}
                    width={60}
                    height={60}
                />
            </div>
            <Name>{name}</Name>
            {
                rate > 0 &&
                <Rate>
                    <StarIcon sx={{color: '#0045D1'}} />
                    <span>{rate}</span>
                    <span>({rateCount})</span>
                </Rate>
            }
        </Container>
    )
}

export default Profile;