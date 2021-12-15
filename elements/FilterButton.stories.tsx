import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckIcon from '@mui/icons-material/Check';

import FilterButton from './FilterButton';

export default {
    title: 'Filter Button',
    component: FilterButton
} as ComponentMeta<typeof FilterButton>

const Template : ComponentStory<typeof FilterButton> = (args) => <FilterButton {...args} />

export const Main = Template.bind({});
Main.args = {
    text: 'Immediately',
    active: true,
    icon: <CheckIcon />
};
