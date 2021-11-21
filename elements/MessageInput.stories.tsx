import React from 'react';
import MessageInput from './MessageInput';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Message Input',
    component: MessageInput
} as ComponentMeta<typeof MessageInput>

const Template : ComponentStory<typeof MessageInput> = (args) => <MessageInput {...args} />

export const SendButton = Template.bind({});
SendButton.args = {active: true};
