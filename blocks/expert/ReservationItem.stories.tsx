import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ReservationItem from './ReservationItem';

export default {
    title: 'Reservation Item',
    component: ReservationItem
} as ComponentMeta<typeof ReservationItem>

const Template : ComponentStory<typeof ReservationItem> = (args) => <ReservationItem {...args} />

export const Main = Template.bind({});
Main.args = {
    date: '8.11 (wed)',
    time: '09:00AM',
    content: 'this is a content',
    status: 'Completed'
};
