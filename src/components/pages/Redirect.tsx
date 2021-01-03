import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../resources';

interface Props {
    to? : string;
}

// Redirect to any route by passing it to the "to" property. Redirects to home by default.
const Redirect = ({ to=routes.STORE } : Props) => {
    const history = useHistory();
    useEffect(() => history.push(to));

    return <></>
}

export default Redirect;
