import React from 'react';
import FormData from 'form-data';
import axios from 'axios';
import PayNotFound from './payNotFound';
import StripeCheckout from 'react-stripe-checkout';
import analytics from '../analytics';
import { Helmet } from 'react-helmet';

const Pay = (props) => {
    const [paymentDetails, setPaymentDetails] = React.useState({});
    const [render, setRender] = React.useState(0); // 0 = Loading, 1 = Bad display, 2 = Display ID, 3 = Bad payment, 4 = Payment success 

    React.useEffect(() => {
        analytics.init();

        setRender(0);

        const payment_id = props.match.params.payment_id;

        const pay_form = new FormData();
        pay_form.append('payment_id', payment_id);

        axios.post('https://osbornai.herokuapp.com/load_payment_id', pay_form)
        .then((res) => {
            const form = res.data;

            setPaymentDetails(form);
            setRender(2);

            analytics.sendPageview(`/pay/${payment_id}`);
        })
        .catch((err) => {
            setRender(1);
        });
    }, [props.match.params.payment_id]);

    const handleToken = (token) => {
        const payment_form = new FormData();
        payment_form.append('token', JSON.stringify(token));
        payment_form.append('payment_id', paymentDetails._id);

        axios.post('https://osbornai.herokuapp.com/pay', payment_form)
        .then((res) => {
            setRender(4);

            analytics.sendEvent({category: 'User', action: 'Paid', value: paymentDetails.amount});
        })
        .catch((err) => {
            const form = err.response.data;

            if (form.payment_success === true) {
                setRender(4);
                analytics.sendEvent({category: 'User', action: 'Paid', value: paymentDetails.amount});
            } else {
                setRender(3);
            }
        });
    };

    const isDisplayed = () => {
        if (render === 0) {
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
                    <h4 style={{color: '#039be5'}}>Loading...</h4>
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
                    <br />
                    <br />
                </div>
            );
        } else if (render === 2 || render === 3) {
            return (
                <div class="container center" style={{fontSize: 18}}>
                    <div class="container">
                        <br />
                        <br />
                        <br />
                        <br />
                        <h4>Purchase Information:</h4>
                        <br />
                        <div class="container">
                            <b>Payment ID:</b> 
                            <br />
                            {paymentDetails._id}
                            <br />
                            <b>Name:</b>
                            <br />
                            {paymentDetails.name}
                            <br />
                            <b>Purchase:</b> 
                            <div style={{whiteSpace: 'pre-line'}}>
                                {paymentDetails.purchase}
                            </div>
                            <b>Amount:</b> 
                            <br />
                            ${paymentDetails.amount} {paymentDetails.currency.toUpperCase()}
                        </div>
                    </div>
                    <br />
                    <StripeCheckout stripeKey="pk_live_51I8LX2C7YoItP8TecbnnNAlWuANCjN2bQBfUpdu9yoaYwLoNrVZ480oNqCQyOlZSfNPxeb0GemzaQBSSVLG6pX9w00gPrfeZeS" 
                        name={paymentDetails.name}
                        description={paymentDetails.purchase}
                        amount={paymentDetails.amount * 100}
                        currency={paymentDetails.currency.toUpperCase()}
                        token={handleToken}
                    >
                        <button class="btn blue darken-1 waves-effect waves-light">
                            Pay Now
                            <i class="material-icons right">local_grocery_store</i>
                        </button>
                    </StripeCheckout>
                    <br />
                    {render === 3 ?
                    <h5 style={{color: 'red'}}>
                        Transaction failed! Please try again!
                    </h5>
                    :null}
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
        } else if (render === 4) {
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
        } else {
            return (
                <>
                    <PayNotFound />
                </>
            );
        }
    };

    return (
        <div className="Pay">
            <br />
            {isDisplayed()}
            <br />
            <br />
            <Helmet>
                <title>Complete The Payment Process - OsbornAI</title>
                <meta name="description" content={`Complete the payment process so that we can get started with your project! Payment ID: ${paymentDetails._id}`} />
                <meta name="keywords" content="payment, pay, osbornai, checkout, money" />
                <meta name="author" content="OsbornAI" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
        </div>
    );
};

export default Pay;