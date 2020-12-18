import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routes } from '../resources';
import { Store } from '../types';
import { colors } from '../styles';

const Nav = () => {
    const user = useSelector(({ user } : Store) => user);

    return <nav>
        <ul>
            <li> <NavLink to={routes.HOME} exact activeClassName="selected">Home</NavLink> </li>
            {/* Move these into user guard if we want to require authentication */}
            <li> <NavLink to={routes.PAGE_ONE} exact activeClassName="selected">Page 1</NavLink> </li>
            <li> <NavLink to={routes.PAGE_TWO} exact activeClassName="selected">Page 2</NavLink> </li>

            {user &&
                <>
                    <li> <NavLink to={routes.AUTHENTICATED} exact activeClassName="selected">Authenticated</NavLink> </li>
                </>
            }

            {user?.isAdmin && <li> <NavLink to={routes.ADMIN} exact activeClassName="selected">Admin</NavLink> </li>}
        </ul>

        <style>{`
            nav a {
                color: ${colors.GRAYSCALE[2]};
                font-size: 1.25rem;
                outline: none;
            }

            nav .selected {
                color: ${colors.LIGHTEST};
            }

            nav a:hover, nav a:focus {
                color: ${colors.LIGHTER};
            }

            nav a:active {
                color: ${colors.DARKER};
            }
        `}</style>
    </nav>
}

export default Nav;
