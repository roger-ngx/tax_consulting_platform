import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PhotosUploader from './PhotosUploader';

export default {
    title: 'Photos Uploader',
    component: PhotosUploader
} as ComponentMeta<typeof PhotosUploader>

const Template : ComponentStory<typeof PhotosUploader> = (args) => <PhotosUploader {...args} />

export const Main = Template.bind({});
Main.args = {

};
