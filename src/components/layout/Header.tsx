import React from 'react';
import Nav from '../Nav';
import NavLogin from '../NavLogin';
import { colors } from '../../styles';

interface Props {
    
}

const Header = (props: Props) => {
    return <header>
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
        `}</style>
    </header>
}

export default Header;
