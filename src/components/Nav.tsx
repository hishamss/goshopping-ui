import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routes } from '../resources';
import { Store } from '../types';

const Nav = () => {
    const user = useSelector(({ user } : Store) => user);

    return (<>
        <nav>
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
        </nav>

        <style>{`
            nav a {
                color: white;
                font-size: 1.25rem;
                outline: none;
            }

            nav .selected {
                color: #ffa400;
            }

            nav a:hover, nav a:focus {
                color: tomato;
            }

            nav a:active {
                color: #ff3000;
            }
        `}</style>
    </>)
}

export default Nav;
