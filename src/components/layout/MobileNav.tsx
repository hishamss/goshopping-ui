import { useState, useEffect, useRef } from 'react';
import { colors } from '../../styles';
import { NavLink } from 'react-router-dom';
import { routes } from '../../resources';
import { useSelector } from 'react-redux';
import { Store } from '../../types';

const MobileNav = () => {
    const [open, setOpen] = useState<boolean>(false);
    const hamburger = useRef<HTMLDivElement>(null);
    const dropdown = useRef<HTMLUListElement>(null);
    const user = useSelector(({ user } : Store) => user);

    useEffect(() => {
        if (hamburger?.current && dropdown?.current) {
            [hamburger.current, dropdown.current].forEach(ref => open
                ? ref.classList.add('nav-open')
                : ref.classList.remove('nav-open')
            );
        }
    }, [open]);

    return (
        <div className="MobileNav">
            <div className="hamburger" ref={hamburger} />
            <span className="hamburger-click-region" onClick={() => setOpen(!open)} />
            <ul ref={dropdown}>
                <li> <NavLink to={routes.HOME} exact activeClassName="selected">Home</NavLink> </li>
                <li> <NavLink to={routes.STORE} exact activeClassName="selected">Store</NavLink> </li>

                {user &&
                    <li> <NavLink to={routes.ORDERS} exact activeClassName="selected">{!user.isAdmin && 'My '}Orders</NavLink> </li>
                }
                
                {user?.isAdmin &&
                    <li> <NavLink to={routes.USERS} exact activeClassName="selected">Users</NavLink> </li>
                }
                <li> <NavLink to={routes.ABOUT} exact activeClassName="selected">About</NavLink> </li>
                <li> <NavLink to={routes.CONTACT} exact activeClassName="selected">Contact</NavLink> </li>
            </ul>

            <style>{`
                .MobileNav {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 0;
                }

                .MobileNav .hamburger, .MobileNav .hamburger-click-region {
                    position: absolute;
                    left: 1.5rem;
                    top: 2.26rem;
                }

                .MobileNav .hamburger,
                .MobileNav .hamburger::before,
                .MobileNav .hamburger::after {
                    width: 1.725rem;
                    height: 2.25px;
                    background-color: ${colors.GRAYSCALE[2]};
                    transition: transform 250ms ease-in-out,
                                opacity 250ms ease-in-out;
                }

                .MobileNav .hamburger::before,
                .MobileNav .hamburger::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 6px;
                }

                .MobileNav .hamburger::after {
                    top: 6px;
                }

                .MobileNav .hamburger-click-region {
                    height: 21px;
                    width: 2rem;
                    cursor: pointer;
                    top: 1.5rem;
                }

                .MobileNav .nav-open.hamburger {
                    transform: rotate(45deg);
                }

                .MobileNav .nav-open.hamburger::before {
                    opacity: 0;
                }

                .MobileNav .nav-open.hamburger::after {
                    transform: rotate(90deg) translateX(-5.5px);
                }

                .MobileNav ul {
                    flex-direction: column;
                    gap: 0;
                    align-items: flex-start;
                    background-color: ${colors.GRAYSCALE[0]};
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    z-index: -1;
                    padding: 20rem 7.9rem 1.1rem 1rem;
                    transition: bottom 300ms ease-out;
                    border-radius: 12px;
                }

                .MobileNav ul.nav-open {
                    bottom: ${!user ? -15.15 : !user.isAdmin ? -17.6 : -19.75}rem;
                }

                .MobileNav li {
                    margin: .5rem;
                    position: relative;
                    white-space: nowrap;
                }

                .MobileNav li a {
                    color: ${colors.LIGHTEST};
                    outline: none;
                    user-select: none;
                }
    
                .MobileNav .selected {
                    color: ${colors.GRAYSCALE[2]};
                }
    
                .MobileNav a:hover, .MobileNav a:focus {
                    color: ${colors.LIGHTER};
                }
    
                .MobileNav a:active {
                    color: ${colors.DARKER};
                }

                .MobileNav li::after {
                    content: '';
                    height: 1px;
                    width: 100%;
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    background-color: ${colors.GRAYSCALE[2]};
                }
            `}</style>
        </div>
    )
}

export default MobileNav;
