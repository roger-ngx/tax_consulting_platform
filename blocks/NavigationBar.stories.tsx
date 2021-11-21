import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavigationBar from "./NavigationBar";

export default {
    title: 'Navigation Bar',
    component: NavigationBar
} as ComponentMeta<typeof NavigationBar>

const Template : ComponentStory<typeof NavigationBar> = (args) => <NavigationBar {...args} />

export const Main = Template.bind({});
Main.args = {};