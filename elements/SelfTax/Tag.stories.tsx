import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tag from './Tag';

export default {
    title: 'Tag',
    component: Tag
} as ComponentMeta<typeof Tag>

const Template : ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const Main = Template.bind({});
Main.args = {
    text: 'Your Filling status',
    active: true,
};
