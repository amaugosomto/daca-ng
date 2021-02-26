import React from 'react'
import Head from 'next/head';

function head(props) {

  const {iosApplicationTitle} = props;
  const {title} = props;
  const {robots} = props;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="copyright" content={new Date().getFullYear + 'Daca-ng'} />
      <meta name="description" content="To model the nature of God(love) and a culture of excellence while delivering selfless service" />
      <meta name="robots" content={robots}></meta>

      <link rel='manifest' href='/manifest.json' />
      <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/apple-icon.png'></link>
      
      <meta name="keywords" content="Keywords" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"></meta>

      {/* <!-- Android  --> */}
      <meta name="theme-color" content="purple"></meta>
      <meta name="mobile-web-app-capable" content="yes"></meta>

      {/* <!-- iOS --> */}
      <meta name="apple-mobile-web-app-title" content={iosApplicationTitle}></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>

      {/* <!-- Windows  --> */}
      <meta name="msapplication-navbutton-color" content="purple"></meta>
      <meta name="msapplication-TileColor" content="purple"></meta>
      <meta name="msapplication-TileImage" content="ms-icon-144x144.png"></meta>
      <meta name="msapplication-config" content="browserconfig.xml"></meta>

      {/* <!-- Pinned Sites  --> */}
      <meta name="application-name" content={iosApplicationTitle}></meta>
      <meta name="msapplication-tooltip" content="Tooltip Text"></meta>
      <meta name="msapplication-starturl" content="/"></meta>

      {/* <!-- Tap highlighting  --> */}
      <meta name="msapplication-tap-highlight" content="no"></meta>

      {/* <!-- UC Mobile Browser  --> */}
      
      <meta name="full-screen" content="yes"></meta>
      <meta name="browsermode" content="application"></meta>

      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
    </Head>
  )
}

export default head;
