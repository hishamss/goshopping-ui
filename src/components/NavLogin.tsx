import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { /* useHistory, */ NavLink } from 'react-router-dom';
import { routes, /* apiRoutes */ } from '../resources';
import { Store } from '../types';
// import axios from 'axios';
import { updateUser } from '../store/actions';
import { colors } from '../styles';

const NavLogin = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const user = useSelector(({ user } : Store) => user);
    const [error, setError] = useState('');

    const logOut = async () => {
        try {
            // For testing purposes
            dispatch( updateUser(null) );

            // Bring these back when API is ready
            /*
            const response = await axios.get(apiRoutes.LOG_OUT);
            if (response.status === 200) {
                dispatch( updateUser(null) );
                return history.push(routes.HOME);
            }
            */
        } catch (e) { setError('Something went wrong') }
    }

    return <div className="NavLogin">
        <div className="errorMsg">{error}</div>
        <ul>
            {user
                ? <li key="logout"> <button onClick={logOut}>Log out</button> </li>
                :
                    <>
                        <li key="signup">
                            <NavLink to={routes.SIGN_UP} exact activeClassName="selected">Sign up</NavLink>
                        </li>
                        <li key="login">
                            <NavLink to={routes.LOG_IN} exact activeClassName="selected">Log in</NavLink>
                        </li>
                    </>
            }
        </ul>

        <style>{`
            .NavLogin ul {
                gap: 1.5rem;
            }

            .NavLogin a, .NavLogin button {
                background-color: ${colors.LIGHTER};
                border: none;
                border-radius: 15px;
                padding: .5rem .95rem;
                cursor: pointer;
                color: ${colors.GRAYSCALE[2]};
                font-size: .95rem;
                outline: none;
            }

            .NavLogin .selected {
                background-color: ${colors.DARKER};
            }
            
            .NavLogin a:hover, .NavLogin a:focus, .NavLogin button:hover, .NavLogin button:focus {
                background-color: ${colors.LIGHTEST};
            }

            .NavLogin a:active, .NavLogin button:active {
                background-color: ${colors.DARKEST};
            }

            .NavLogin .errorMsg {
                transform: translateY(-.3rem);
            }
        `}</style>
    </div>
}

export default NavLogin;
