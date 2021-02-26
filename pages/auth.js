import Head from "next/head";
import React from "react";
import {connect} from 'react-redux';
import { authLogin, authRegister } from "../redux/actions/authActions";

import HomeLayout from "../components/home/HomeLayout";
import Login from '../components/Auth/login';
import SignUp from '../components/Auth/register';

import CustomHead from '../components/HEAD/head';

const Auth =  function(props) {
  
  return (
    <div>
      <HomeLayout>
        <Head>
          <CustomHead 
            iosApplicationTitle="Daca-ng Auth Login-Register"
            title="Daca-ng - Auth - Login-Register"
            robots="Auth"
          />
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