import { useSelector } from 'react-redux';
import Layout from '../layout';
import { Store } from '../../types';

const Profile = () => {
    const user = useSelector(({ user } : Store) => user);

    return (
        <div className="Profile">
            <h1 className="heading">{user && user.username[0].toUpperCase() + user.username.slice(1)}{user && (user.username.endsWith('s') ? "' " : "'s ")}Profile</h1>
            <div className="prompt">View and edit your account information here</div>
        </div>
    )
}

export default Layout(Profile);
