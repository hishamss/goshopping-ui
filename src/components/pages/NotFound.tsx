import React from 'react';
import { routes } from '../../resources';
import { Link } from 'react-router-dom';
import Layout from '../layout';

const NotFound = () => {
    return <div className="NotFound">
        <h1 className="heading">Not Found</h1>
        <div className="prompt">We're sorry! This page doesn't exist.</div>
        <Link to={routes.HOME}>Back to Home</Link>

        <style>{`
            .NotFound .prompt {
                margin-bottom: 1.45rem;
            }

            .NotFound a {
                background-color: tomato;
                border: none;
                border-radius: 15px;
                padding: .5rem .95rem;
                cursor: pointer;
                color: white;
                font-size: .95rem;
                outline: none;
            }

            .NotFound .selected {
                background-color: #ff2900;
            }
            
            .NotFound a:hover, .NotFound a:focus {
                background-color: #ff9000;
            }

            .NotFound a:active {
                background-color: red;
            }
        `}</style>
    </div>
}

export default Layout(NotFound);
