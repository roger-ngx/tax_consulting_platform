import RadioButton from './RadioButton';

export default {
    title: 'Radio Button',
    compoent: RadioButton
}

const Template = (args) => <RadioButton {...args} />

export const Main = Template.bind({});
Main.args ={
    title: '4 months (1 month free)',
    price: 100
}