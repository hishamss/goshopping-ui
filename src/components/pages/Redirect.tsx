import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    to? : string;
}

// Redirect to any route by passing it to the "to" property. Redirects to home by default.
const Redirect = ({ to='/' } : Props) => {
    const history = useHistory();
    useEffect(() => history.push(to));

    return <></>
}

export default Redirect;
