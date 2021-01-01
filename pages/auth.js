import Head from "next/head";
import React from "react";
import {connect} from 'react-redux';
import { authLogin, authRegister } from "../redux/actions/authActions";

import HomeLayout from "../components/home/HomeLayout";
import Login from '../components/Auth/login';
import SignUp from '../components/Auth/register';

const Auth =  function(props) {
  
  return (
    <div>
      <HomeLayout>
        <Head>
          <title>Auth</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="copyright" content="Login" />
          <meta name="description" content="To model the nature of God(love) and a culture of excellence while delivering selfless service" />
          <meta name="robots" content="Login/Register"></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
        </Head>
        {props.authPage == 'login' ? <Login /> : <SignUp />}
      </HomeLayout>
    </div>
    
  )
}

const mapStateToProps = state => ({
  authPage: state.authPage.authPage
});

const mapDispatchToProps = {
  authLogin,
  authRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);