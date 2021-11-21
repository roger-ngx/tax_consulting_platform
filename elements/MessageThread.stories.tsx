import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MessageThread from './MessageThread';

export default {
    title: 'Message Thread',
    component: MessageThread
} as ComponentMeta<typeof MessageThread>

const Template : ComponentStory<typeof MessageThread> = (args) => <MessageThread {...args} />

export const Main = Template.bind({});
Main.args = {
    name: 'Jessi',
    time: 'pm 10:00',
    text: 'Could you explain about your self please.',
    unReadCount: 1
};
