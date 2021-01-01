import React from 'react'
import {CssBaseline} from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div>
      <CssBaseline />
      <Header />
      {children}
      <Footer />
    </div>
  )
}