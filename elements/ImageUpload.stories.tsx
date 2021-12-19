import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageUpload from './ImageUpload';

export default {
    title: 'Image Upload',
    component: ImageUpload
} as ComponentMeta<typeof ImageUpload>

const Template : ComponentStory<typeof ImageUpload> = (args) => <ImageUpload {...args} />

export const Main = Template.bind({});
Main.args = {
    src: '/assets/images/profile.png',
    progress: 100,
    size: 80,
};
