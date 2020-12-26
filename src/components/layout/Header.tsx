import React from 'react';
import Nav from './Nav';
import NavLogin from './NavLogin';
import MobileNav from './MobileNav';
import { colors } from '../../styles';

const Header = () => {
    return <header>
        <MobileNav />
        <strong className="logo">GoShopping!</strong>
        <Nav />
        <NavLogin />

        <style>{`
            header {
                background-color: ${colors.GRAYSCALE[0]};
                height: 5rem;
                color: ${colors.GRAYSCALE[5]};
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
            }

            header .logo {
                color: ${colors.LIGHTEST};
                position: absolute;
                top: 1.85rem;
                left: .9rem;
                user-select: none;
            }
        `}</style>
    </header>
}

export default Header;
