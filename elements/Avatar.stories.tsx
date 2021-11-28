import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './Avatar';

export default {
    title: 'Avatar',
    component: Avatar
} as ComponentMeta<typeof Avatar>

const Template : ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Main = Template.bind({});
Main.args = {src: '/assets/images/profile.png', size: 44};
