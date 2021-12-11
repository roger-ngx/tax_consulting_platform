import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LocationChip from './LocationChip';

export default {
    title: 'Location Chip',
    component: LocationChip
} as ComponentMeta<typeof LocationChip>

const Template : ComponentStory<typeof LocationChip> = (args) => <LocationChip {...args} />

export const Main = Template.bind({});
Main.args = {
    text: 'Alabama'
};
