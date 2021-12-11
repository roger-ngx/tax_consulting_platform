import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MyPageSideMenu from "./MyPageSideMenu";

export default {
    title: 'MyPageSideMenu',
    component: MyPageSideMenu
} as ComponentMeta<typeof MyPageSideMenu>

const Template : ComponentStory<typeof MyPageSideMenu> = (args) => <MyPageSideMenu {...args} />

export const Main = Template.bind({});
Main.args = {};