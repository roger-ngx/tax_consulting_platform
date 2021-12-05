import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileUpload from './FileUpload';

export default {
    title: 'FileUpload',
    component: FileUpload
} as ComponentMeta<typeof FileUpload>

const Template : ComponentStory<typeof FileUpload> = (args) => <FileUpload {...args} />

export const Main = Template.bind({});
Main.args = {name: 'thisistest.zip', size: '6.5MB', progress: 80};
