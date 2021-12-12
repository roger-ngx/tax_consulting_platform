import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AvailableTime from './AvailableTime';

export default {
    title: 'Available Time',
    component: AvailableTime
} as ComponentMeta<typeof AvailableTime>

const Template : ComponentStory<typeof AvailableTime> = (args) => <AvailableTime {...args} />

export const Main = Template.bind({});
Main.args = {
};
