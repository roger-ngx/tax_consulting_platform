import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UploadedPhoto from './UploadedPhoto';

export default {
    title: 'Uploaded Photo',
    component: UploadedPhoto
} as ComponentMeta<typeof UploadedPhoto>

const Template : ComponentStory<typeof UploadedPhoto> = (args) => <UploadedPhoto {...args} />

export const Main = Template.bind({});
Main.args = {
    src: '/assets/images/test.png'
};
