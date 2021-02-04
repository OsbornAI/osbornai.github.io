import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { parseDate } from '../../helpers/helpers';

export default function Payment({ payment_id_details }) {
    const [status, setStatus] = useState(0); // 0 is normal; 1 is error; 2 is success

    function render() {
        if (status === 0 || status === 1) {
            return (
                <div className="container">
                    <div className="container">
                        <br />
                        <br />
                        <br />
                        <br />
                        <h4>Purchase information:</h4>
                        <br />
                        <br />
                        <b>Payment ID:</b>
                        <br />
                        {payment_id_details._id}
                        <br />
                        <br />
                        <b>Expiry date:</b>
                        <br />
                        {parseDate(payment_id_details.expiry)}
                        <br />
                        <br />
                        <b>Purchase:</b>
                        <div style={{whiteSpace: 'pre-line'}}>
                            {payment_id_details.purchase}
                        </div>
                        <br />
                        <b>Amount:</b>
                        <br />
                        ${payment_id_details.amount} {payment_id_details.currency.toUpperCase()}
                        <br />
                        <br />
                        <StripeCheckout stripeKey="pk_live_51I8LX2C7YoItP8TecbnnNAlWuANCjN2bQBfUpdu9yoaYwLoNrVZ480oNqCQyOlZSfNPxeb0GemzaQBSSVLG6pX9w00gPrfeZeS" 
                            name={payment_id_details.name}
                            description={payment_id_details.purchase}
                            amount={payment_id_details.amount * 100}
                            currency={payment_id_details.currency.toUpperCase()}
                            token={token => {
                                axios.post('https://osbornai.herokuapp.com/pay', { token: JSON.stringify(token), payment_id: payment_id_details._id })
                                .then(res => {
                                    setStatus(2);
                                })
                                .catch(err => {
                                    console.log(err.response.data);
                                    setStatus(1);
                                });
                            }}
                        >
                            <button className="btn blue darken-1 waves-effect waves-light">
                                Pay Now
                                <i className="material-icons right">local_grocery_store</i>
                            </button>
                        </StripeCheckout>
                        {status === 1 ? <p className="flow-text" style={{color: 'red'}}>Transaction failed! Please try again!</p> : <></>}
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            );
        } else if (status === 2) {
            return (
               <div class="container center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h4 style={{color: "#039be5"}}>Payment succeeded!</h4>
                    <h5>Please check your email for further details!</h5>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div> 
            );
        }
    };

    return (
        <div className="Pay container center" style={{fontSize: 18}} >
            {render()}
        </div>
    );
};

export async function getStaticPaths() {
    try {
        const payment_ids_response = await axios.post('https://osbornai.herokuapp.com/view_valid_payment_ids');
        const payment_ids = payment_ids_response.data.payment_ids;

        const paths = payment_ids.map(payment_id => ({
            params: {
                slug: payment_id
            }
        }));

        return {
            paths,
            fallback: false
        };
    } catch {
        const paths = [];

        return {
            paths,
            fallback: false
        };
    }
};

export async function getStaticProps({ params: { slug } }) {
    try {
        const payment_id_details_response = await axios.post('https://osbornai.herokuapp.com/load_payment_id', { payment_id: slug });
        const payment_id_details = payment_id_details_response.data.payment_id_info;
        
        return { props: { payment_id_details: payment_id_details } };

    } catch {
        return { props: { payment_id_details: null } };
    }
};