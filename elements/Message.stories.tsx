import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Message from './Message';

export default {
    title: 'Message',
    component: Message
} as ComponentMeta<typeof Message>

const Template : ComponentStory<typeof Message> = (args) => <Message {...args} />

export const Main = Template.bind({});
Main.args = {isMine: true, text: 'How can I help you, guy ?', time: 'pm 07:00'};
