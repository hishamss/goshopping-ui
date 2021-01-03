import React from 'react';
import { routes } from '../../resources';
import { Link } from 'react-router-dom';
import Layout from '../layout';
import { colors } from '../../styles';

const NotFound = () => {
    return <div className="NotFound">
        <h1 className="heading">Not Found</h1>
        <div className="prompt">We're sorry! This page doesn't exist.</div>
        <Link to={routes.STORE}>Back to Store</Link>

        <style>{`
            .NotFound .prompt {
                margin-bottom: 1.45rem;
            }

            .NotFound a {
                background-color: ${colors.LIGHTER};
                border: none;
                border-radius: 15px;
                padding: .5rem .95rem;
                cursor: pointer;
                color: ${colors.GRAYSCALE[5]};
                font-size: .95rem;
                outline: none;
            }

            .NotFound .selected {
                background-color: ${colors.DARKER};
            }
            
            .NotFound a:hover, .NotFound a:focus {
                background-color: ${colors.LIGHTEST};
            }

            .NotFound a:active {
                background-color: ${colors.DARKEST};
            }
        `}</style>
    </div>
}

export default Layout(NotFound);
