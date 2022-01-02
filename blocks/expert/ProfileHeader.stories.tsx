import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileHeader from './ProfileHeader';

export default {
    title: 'Profile Header',
    component: ProfileHeader
} as ComponentMeta<typeof ProfileHeader>

const Template : ComponentStory<typeof ProfileHeader> = (args) => <ProfileHeader {...args} />

export const Main = Template.bind({});
Main.args = {};
