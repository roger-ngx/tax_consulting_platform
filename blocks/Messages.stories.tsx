import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as dayjs from 'dayjs';

import Messages from './Messages';

export default {
    title: 'Messages',
    component: Messages
} as ComponentMeta<typeof Messages>

const Template : ComponentStory<typeof Messages> = (args) => <Messages {...args} />

export const Main = Template.bind({});
Main.args = {
    isMine: false,
    messages: [
        {
            time: dayjs('2021-10-22'),
            text: 'Hello guy'
        },
        {
            time: dayjs('2021-10-22'),
            text: 'Welcome to my consulting service.'
        },
        {
            time: dayjs('2021-10-22'),
            text: 'How can I help you ?'
        }
    ]
};