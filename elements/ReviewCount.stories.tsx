import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReviewCount from './ReviewCount';

export default {
    title: 'Review Count',
    component: ReviewCount
} as ComponentMeta<typeof ReviewCount>

const Template : ComponentStory<typeof ReviewCount> = (args) => <ReviewCount {...args} />

export const Main = Template.bind({});
Main.args = {
    rate: 4.2,
    count: 24
};
