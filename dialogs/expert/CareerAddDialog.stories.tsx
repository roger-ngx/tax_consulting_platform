import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CareerAddDialog from './CareerAddDialog';

export default {
    title: 'Career Add Dialog',
    component: CareerAddDialog
} as ComponentMeta<typeof CareerAddDialog>

const Template : ComponentStory<typeof CareerAddDialog> = (args) => <CareerAddDialog {...args} />

export const Main = Template.bind({});
Main.args = {};
