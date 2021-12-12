import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Location from './Location';

export default {
    title: 'Tag',
    component: Location
} as ComponentMeta<typeof Location>

const Template : ComponentStory<typeof Location> = (args) => <Location {...args} />

export const Main = Template.bind({});
Main.args = {
    locations: ['NY', 'CA']
};
