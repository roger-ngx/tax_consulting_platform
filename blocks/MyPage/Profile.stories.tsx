import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Profile from './Profile';

export default {
    title: 'Profile',
    component: Profile
} as ComponentMeta<typeof Profile>

const Template : ComponentStory<typeof Profile> = (args) => <Profile {...args} />

export const Main = Template.bind({});
Main.args = {

};
