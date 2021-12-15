import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Filter from './Filter';

export default {
    title: 'Filter',
    component: Filter
} as ComponentMeta<typeof Filter>

const Template : ComponentStory<typeof Filter> = (args) => <Filter {...args} />

export const Main = Template.bind({});
Main.args = {};
