import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import ProfileInput from './ProfileInput';
import PhotosUploader from './PhotosUploader';
import TextArea from '../../elements/TextArea';
import PriceAddDialog from '../../dialogs/expert/PriceAddDialog';
import { SERVICE_CATEGORIES } from '../../models/EnrollService';
import TFButtonBase from '../../elements/TFButtonBase';
import ExpertService, { IService } from '../../models/ExpertService';
import { isEmpty } from 'lodash';

const Container = styled('div')({

})

const Title = styled('div')({
    marginBottom: 4,
    fontWeight: 'bold'
})

const Part = styled('div')({
    marginBottom: 32
})

type Props = {
    onChange: (param: ExpertService) => void
    data?: IService
}

const Service: React.FC<Props> = ({data, onChange}) => {

    const [ category, setCategory ] = useState(SERVICE_CATEGORIES.TAX);
    const [ detail, setDetail ] = useState('');
    const [ photos, setPhotos ] = useState<string[]>([]);
    const [ videos, setVideos ] = useState<string[]>([]);

    useEffect(() => {
        if(data){
            setCategory(data.category);
            setDetail(data.detail);
        }
    }, [data]);

    useEffect(() => {
        if(isEmpty(detail) || isEmpty(photos) || isEmpty(videos)){
            return;
        }

        onChange(new ExpertService({category, detail, photos, videos}))
    }, [category, detail, photos, videos])

    return (
        <Container>
            <Part>
                <Title>
                    Category
                </Title>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <TFButtonBase
                        containerStyle={{flex: 1}}
                        onClick={() => setCategory(SERVICE_CATEGORIES.TAX)}
                    >
                        <div style={{flex: 1, padding: 8, backgroundImage: SERVICE_CATEGORIES.TAX===category ? 'linear-gradient(#0045D1, #5185EE)' : 'linear-gradient(#B7BECA, #B7BECAAA)', }}>
                            <span style={{fontWeight: 'bold', color: 'white'}}>Tax</span>
                        </div>
                    </TFButtonBase>
                    <TFButtonBase
                        containerStyle={{flex: 1, margin: '0 8px'}}
                        onClick={() => setCategory(SERVICE_CATEGORIES.FUND)}
                    >
                        <div style={{flex: 1, padding: 8, backgroundImage: SERVICE_CATEGORIES.FUND===category ? 'linear-gradient(#0045D1, #5185EE)' : 'linear-gradient(#B7BECA, #B7BECAAA)'}}>
                            <span style={{fontWeight: 'bold', color: 'white'}}>Fund</span>
                        </div>
                    </TFButtonBase>
                    <TFButtonBase
                        containerStyle={{flex: 1}}
                        onClick={() => setCategory(SERVICE_CATEGORIES.ACCOUNTANCY)}
                    >
                        <div style={{flex: 1, padding: 8, backgroundImage: SERVICE_CATEGORIES.ACCOUNTANCY===category ? 'linear-gradient(#0045D1, #5185EE)' : 'linear-gradient(#B7BECA, #B7BECAAA)'}}>
                            <span style={{fontWeight: 'bold', color: 'white'}}>Accountance</span>
                        </div>
                    </TFButtonBase>
                </div>
            </Part>
            
            <Part>
                <TextArea
                    title='Detail'
                    placeholder='Text service detail'
                    value={detail}
                    onChange={setDetail}
                />
            </Part>

            <Part>
                <Title>
                    Photos
                </Title>
                <PhotosUploader
                    onChange={setPhotos}
                    data={data && data.photos}
                />
            </Part>

            <ProfileInput
                title='Video link (Ad)'
                onChange={setVideos}
                data={data && data.videos}
            />
        </Container>
    )
}

export default Service;