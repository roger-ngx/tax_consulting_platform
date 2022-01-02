import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import ProfileInput from './ProfileInput';
import PhotosUploader from './PhotosUploader';
import TextArea from '../../elements/TextArea';
import PriceAddDialog from '../../dialogs/expert/PriceAddDialog';
import { SERVICE_CATEGORIES } from '../../models/EnrollService';
import TFButtonBase from '../../elements/ButtonBase';

const Container = styled('div')({

})

const Title = styled('div')({
    marginBottom: 4,
    fontWeight: 'bold'
})

const Part = styled('div')({
    marginBottom: 32
})

const Service = () => {

    const [ category, setCategory ] = useState(SERVICE_CATEGORIES.TAX);
    const [ detail, setDetail ] = useState();
    const [ photos, setPhotos ] = useState<string[]>([]);
    const [ videos, setVideos ] = useState<string[]>([]);

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
                    onChange={e => setDetail(e.target.value)}
                />
            </Part>

            <Part>
                <Title>
                    Photos
                </Title>
                <PhotosUploader
                    onChange={setPhotos}
                />
            </Part>

            <ProfileInput
                title='Video link (Ad)'
                onChange={setVideos}
            />
        </Container>
    )
}

export default Service;