import React, { ComponentType } from 'react';
import Header from './Header';
import Footer from './Footer';

// Higher-order component for wrapping dynamic body content with commonly reused components
// Requires no code modifications
const Layout = (Body : ComponentType<any>) => (props : any) =>
    <>
        <Header />
        <div style={{ margin: '1rem' }}> <Body {...props} /> </div>
        <Footer />
    </>

export default Layout;
