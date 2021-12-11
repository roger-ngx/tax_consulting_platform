import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchBox from './SearchBox';

export default {
    title: 'Search Box',
    component: SearchBox
} as ComponentMeta<typeof SearchBox>

const Template : ComponentStory<typeof SearchBox> = (args) => <SearchBox {...args} />

export const Main = Template.bind({});
Main.args = {};
