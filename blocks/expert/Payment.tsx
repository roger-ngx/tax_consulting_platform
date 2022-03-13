import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/system';
import { Button, TextField, Grid } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import dayjs from 'dayjs';

import RadioButton from '../../elements/RadioButton';
import { handleSuccessfulPayment } from '../../firebase/payment';
import { useSelector } from 'react-redux';

const Container = styled('div')({
    backgroundColor: '#F6F8FB',
    padding: 20
})

type ButtonsProps = {
    amount: number,
    onFinish: () => void
}

const PaypalButtonsWrapper: React.FC<ButtonsProps> = ({amount, onFinish}) => {

    const uid = useSelector((state: any) => state.firebase.auth.uid)

    // use useCallback to only update the value of `createOrder` when the `amount` changes 
    const createOrder = useCallback((data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: amount,
                        },
                    },
                ],
            })
            .then((orderID: string) => {
                return orderID;
            });
    }, [amount]);

    return(
        <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={createOrder}
            onApprove={(data: Record<string, unknown>, actions: any) => {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(async (details: any) => {
                    console.log(details);
                    // This function shows a transaction success message to your buyer.
                    const { create_time, id, payer, purchase_units, status, update_time } = details;
                    const paymentData = {
                        createTime: create_time,
                        orderId: id,
                        payer,
                        purchaseUnit: purchase_units[0],
                        status: status,
                        updateTime: update_time
                    }
                    await handleSuccessfulPayment({uid, paymentData, orderId: id, subscribedUntil: dayjs().add(amount/25, 'month').toDate()})
                    onFinish();
                });
            }}
            onCancel={(data:any) => {
                // Show a cancel page, or return to cart
            }}

            onError={(err: any) => {
                // For example, redirect to a specific error page
                
            }}
            forceReRender={[amount]} 
        />
    )
}

type PaymentProps = {
    onFinish: () => void
}

const Payment: React.FC<PaymentProps> = ({onFinish}) => {
    const [ amount, setAmount ] = useState(100);

    return (
            <Container>
                <div style={{marginBottom: 32}}>
                    <div style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
                        Payment Amount
                    </div>

                    <Grid container spacing={2}>
                        <Grid item md={4} sm={6} xs={12}>
                            <RadioButton
                                checked={amount===100}
                                title='4 months (1 month free) '
                                price={100}
                                onValueChange={setAmount}
                            />
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                            <RadioButton
                                checked={amount===200}
                                title='8 months (2 months free) '
                                price={200}
                                onValueChange={setAmount}
                            />
                        </Grid>

                        <Grid item md={4} sm={6} xs={12}>
                            <RadioButton
                                checked={amount===300}
                                title='12 months (3 months free) '
                                price={300}
                                onValueChange={setAmount}
                            />
                        </Grid>
                    </Grid>
                </div>

            <PayPalScriptProvider options={{ "client-id": "AQ1nS5XcPMrl7LcMUeJ2SOi9jWYjR3RvtYKVHaBcGDqpIdy5gbnhhW9WOeCRf7GtK3q6H8oIkVVz2-bR" }}>
                <PaypalButtonsWrapper amount={amount} onFinish={onFinish}/>
            </PayPalScriptProvider>
        </Container>
    )
}

export default Payment;