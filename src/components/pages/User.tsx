import { useState, useEffect } from 'react';
import { getUser } from '../../ajax';
import { User as UserType } from '../../types';
import Layout from '../layout';
import { RouteComponentProps } from 'react-router-dom';
import { capitalize, getPathVar } from '../../util';

const User = ({ location } : RouteComponentProps) => {
    const [fetchedUser, setFetchedUser] = useState<UserType|null>(null);

    useEffect(() => { (async () => setFetchedUser(await getUser(Number.parseInt(getPathVar(location)))) )() }, [location]);

    return (
        <div className="User">
            <h1 className="heading">User {fetchedUser ? `"${capitalize(fetchedUser.username)}"` : getPathVar(location)}</h1>
            <div className="prompt">{fetchedUser ? "Here's what information we have for this user" : "Failed to fetch information for this user"}</div>
        </div>
    )
}

export default Layout(User);