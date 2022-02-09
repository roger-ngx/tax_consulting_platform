import React from 'react';
import { styled } from '@mui/system';
import { ExpertReview } from '../ExpertReview';

type Props = {
    data: any
}

const ServiceReview : React.FC<Props> = ({data}) => {

    return (
        <div style={{width: '100%'}}>
            <ExpertReview />
        </div>
    )
}

export default ServiceReview;