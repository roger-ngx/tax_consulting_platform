import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TabHeader from './TabHeader';

export default {
    title: 'Tab Header',
    component: TabHeader
} as ComponentMeta<typeof TabHeader>

const Template : ComponentStory<typeof TabHeader> = (args) => <TabHeader {...args} />

export const Main = Template.bind({});
Main.args = {
    text: 'Name & Address',
    active: true,
    index: 1
};
