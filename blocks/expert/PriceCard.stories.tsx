import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PriceCard from './PriceCard';

export default {
    title: 'Price Card',
    component: PriceCard
} as ComponentMeta<typeof PriceCard>

const Template : ComponentStory<typeof PriceCard> = (args) => <PriceCard {...args} />

export const Main = Template.bind({});
Main.args = {
    type: 'Basic consultant',
    matching: 20,
    detail: 'Solve difficult tax returns at once give!',
    price: '$50/hr'
};
