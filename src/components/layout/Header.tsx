import React from 'react';
import Nav from '../Nav';
import NavLogin from '../NavLogin';
import { colors } from '../../styles';

interface Props {
    
}

const Header = (props: Props) => {
    return <header>
        <strong className="logo">GoShopping!</strong>
        <Nav />
        <NavLogin />

        <style>{`
            header {
                background-color: ${colors.GRAYSCALE[0]};
                height: 4.5rem;
                color: ${colors.GRAYSCALE[2]};
                display: flex;
                align-items: center;
                justify-content: space-around;
            }

            header .logo {
                color: ${colors.LIGHTEST};
                position: absolute;
                top: 1.45rem;
                left: 1rem;
                font-size: 1.1rem;
                user-select: none;
            }
        `}</style>
    </header>
}

export default Header;
