import React from 'react';
import { routes } from '../../resources';
import { Link } from 'react-router-dom';
import Layout from '../layout';

const NotFound = () => {
    return (<>
        <div className="page NotFound">
            <h1 className="heading">Not Found</h1>
            <br />
            <div>We're sorry! This page doesn't exist.</div>
            <button className="btn"><Link to={routes.HOME}>Back to Home</Link></button>
        </div>

        <style>{`
        
        `}</style>
    </>)
}

export default Layout(NotFound);
