import Layout from '../layout';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import { capitalize } from '../../util';

const Home = () => {
    const user = useSelector(({ user } : Store) => user);

    return <div className="Home">
        <h1 className="heading">Home</h1>
        <div className="prompt">
            {user
                ? `Welcome, ${capitalize(user.username)}!`
                : 'Log in or sign up today!'}
        </div>
    </div>
}

export default Layout(Home);
