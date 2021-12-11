import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EducationAddDialog from './EducationAddDialog';

export default {
    title: 'Education Add Dialog',
    component: EducationAddDialog
} as ComponentMeta<typeof EducationAddDialog>

const Template : ComponentStory<typeof EducationAddDialog> = (args) => <EducationAddDialog {...args} />

export const Main = Template.bind({});
Main.args = {};
