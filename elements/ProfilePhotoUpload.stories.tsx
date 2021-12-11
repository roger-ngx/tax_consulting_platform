import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfilePhotoUpload from './ProfilePhotoUpload';

export default {
    title: 'Profile Photo Upload',
    component: ProfilePhotoUpload
} as ComponentMeta<typeof ProfilePhotoUpload>

const Template : ComponentStory<typeof ProfilePhotoUpload> = (args) => <ProfilePhotoUpload {...args} />

export const Main = Template.bind({});
Main.args = {};
