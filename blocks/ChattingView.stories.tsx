import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChattingView from './ChattingView';

export default {
    title: 'Chatting View',
    component: ChattingView
} as ComponentMeta<typeof ChattingView>

const Template : ComponentStory<typeof ChattingView> = (args) => <ChattingView {...args} />

export const Main = Template.bind({});
Main.args = {};
