import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { routes } from "../../resources";
import { Store } from "../../types";
import { updateUser } from "../../store/actions";
import { colors } from "../../styles";
import Redirect from "../pages/Redirect";
import { logout } from "../../ajax";

const NavLogin = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((store : Store) => store);

  const logOut = () => {
    // Reset local storage
    logout();
    dispatch(updateUser(null));
    return <Redirect />;
  };

  return (
    <div className="NavLogin">
      <ul>
        <li className="cart">
          <NavLink to={routes.CHECKOUT}>
            <span>
              <i className="fas fa-shopping-cart"></i>
              <span>{cart ? cart.length : 0}</span>
            </span>
          </NavLink>
        </li>
        {user ? (
          <>
            <li className="profile" key="profile">
              <NavLink to={routes.PROFILE}>My Profile</NavLink>
            </li>
            <li key="logout">
              <button onClick={logOut}>Log out</button>
            </li>
          </>
        ) : (
          <>
            <li key="signup">
              <NavLink to={routes.SIGN_UP} exact activeClassName="selected">
                Sign up
              </NavLink>
            </li>
            <li key="login">
              <NavLink to={routes.LOG_IN} exact activeClassName="selected">
                Log in
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <style>{`
            .NavLogin ul {
                gap: 1.25rem;
                height: 0;
            }

            .NavLogin a, .NavLogin button {
                background-color: ${colors.LIGHTER};
                border: none;
                border-radius: 15px;
                padding: .5rem .95rem;
                cursor: pointer;
                color: ${colors.GRAYSCALE[5]};
                font-size: .95rem;
                outline: none;
                user-select: none;
            }

            .NavLogin button {
                padding: .57rem .95rem;
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

            .NavLogin .profile a {
                background-color: transparent;
                color: ${colors.LIGHTEST};
                font-weight: 500;
                font-size: 1rem;
                margin-left: -.5rem;
            }

            .NavLogin .profile a:hover, .NavLogin .profile a:focus {
                color: ${colors.LIGHTER};
            }

            .NavLogin .profile a:active {
                color: ${colors.DARKER};
            }

            .NavLogin .profile a {
                background-color: transparent;
                color: ${colors.LIGHTEST};
                font-weight: 500;
                font-size: 1rem;
            }

            .NavLogin .profile a:hover, .NavLogin .profile a:focus {
                color: ${colors.LIGHTER};
            }

            .NavLogin .profile a:active {
                color: ${colors.DARKER};
            }

            .NavLogin .cart {
              margin-right: -.75rem;
              margin-bottom: .15rem;
            }
            
            .NavLogin .cart a {
                background-color: transparent;
                font-size: 1.5rem;
            }

            .NavLogin .fa-shopping-cart {
                margin-right: .5rem;
                transition: transform 100ms ease-out;
            }

            .NavLogin .fa-shopping-cart:hover {
              transform: scale(1.125) translateY(-.1rem);
            }
        `}</style>
    </div>
  );
};

export default NavLogin;
