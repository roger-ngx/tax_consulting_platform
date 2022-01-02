import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MatchingCount from './MatchingCount';

export default {
    title: 'Matching Count',
    component: MatchingCount
} as ComponentMeta<typeof MatchingCount>

const Template : ComponentStory<typeof MatchingCount> = (args) => <MatchingCount {...args} />

export const Main = Template.bind({});
Main.args = {
    count: 24
};
