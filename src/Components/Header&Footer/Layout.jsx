import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

export const Layout = ({ children }) => {
    return (
        <div className="Layout">
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;