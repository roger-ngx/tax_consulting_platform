import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StateCheckbox from './StateCheckbox';

export default {
    title: 'State Checkbox',
    component: StateCheckbox
} as ComponentMeta<typeof StateCheckbox>

const Template : ComponentStory<typeof StateCheckbox> = (args) => <StateCheckbox {...args} />

export const Main = Template.bind({});
Main.args = {
    short: 'AL',
    long: 'Alabama'
};
