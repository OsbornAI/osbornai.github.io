import React from 'react';
import Head from 'next/head';

import Header from './header';
import Book from './book';
import Footer from './footer';

export default function Layout(props) {
    React.useEffect(() => {
        window.addEventListener("DOMContentLoaded", event => {
            const optionsSidenav = {
            edge: 'left',
            draggable: true,
            inDuration: 250,
            outDuration: 200,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            preventScrolling: true
            }

            const sidenavContainer = document.querySelector(".sidenav");
            M.Sidenav.init(sidenavContainer, optionsSidenav);
        })
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="author" content="OsbornAI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#1E88E5" />
                <meta name="description" content="We use data and AI to help you grow your business. If you have a project in mind that involves lots of data or are looking to grow your business, then book a consult with us, and let's get started!" />
                <meta name="keywords" content="data analytics, business analytics, data dashboards, marketing analysis, business consulting, osbornai" />
                <title>Grow Your Business Using Data and AI - OsbornAI</title>

                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />

                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div id="Top" />
            <Header />
            {props.children}
            <Book />
            <Footer />
        </>
    );
};