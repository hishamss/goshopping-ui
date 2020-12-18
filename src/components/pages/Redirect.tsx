import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
    to : string;
}

// Redirect to any route by passing it to the "to" property. Redirects to home by default.
const Redirect = ({ history, to='/' } : Props) => {
    useEffect(() => history.push(to));

    return <></>
}

export default Redirect;
