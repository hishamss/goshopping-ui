import React from 'react';
import Nav from './Nav';
import NavLogin from './NavLogin';
import MobileNav from './MobileNav';
import { colors } from '../../styles';

interface Props {
    
}

const Header = (props: Props) => {
    return <header>
        <MobileNav />
        <strong className="logo">GoShopping!</strong>
        <Nav />
        <NavLogin />

        <style>{`
            header {
                background-color: ${colors.GRAYSCALE[0]};
                height: 4.8rem;
                color: ${colors.GRAYSCALE[2]};
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
            }

            header .logo {
                color: ${colors.LIGHTEST};
                position: absolute;
                top: 1.66rem;
                left: 1rem;
                user-select: none;
                background-color: ${colors.GRAYSCALE[0]};
            }
        `}</style>
    </header>
}

export default Header;
