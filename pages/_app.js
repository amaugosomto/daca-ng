import React from 'react';
import { Provider } from "react-redux";
import store from '../redux/store';
import '../styles/globals.css'
import '../styles/carouselOverride.css'
function MyApp({ Component, pageProps}) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps };
}

export default MyApp;

