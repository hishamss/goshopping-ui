import React from 'react';
import Nav from '../Nav';
import NavLogin from '../NavLogin';

interface Props {
    
}

const Header = (props: Props) => {
    return <header>
        <Nav />
        <NavLogin />

        <style>{`
            header {
                background-color: #111;
                height: 4.5rem;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-around;
            }
        `}</style>
    </header>
}

export default Header;
