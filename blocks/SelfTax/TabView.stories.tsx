import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TabView from './TabView';

export default {
    title: 'Tab View',
    component: TabView
} as ComponentMeta<typeof TabView>

const Template : ComponentStory<typeof TabView> = (args) => <TabView {...args} />

export const Main = Template.bind({});
Main.args = {};
