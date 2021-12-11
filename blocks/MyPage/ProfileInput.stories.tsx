import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileInput from './ProfileInput';

export default {
    title: 'Profile Input',
    component: ProfileInput
} as ComponentMeta<typeof ProfileInput>

const Template : ComponentStory<typeof ProfileInput> = (args) => <ProfileInput {...args} />

export const Main = Template.bind({});
Main.args = {
    title: 'Career'
};
