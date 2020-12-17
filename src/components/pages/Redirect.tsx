import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
    to : string;
}

const Redirect = ({ history, to='/' }: Props) => {
    useEffect(() => history.push(to));

    return <></>
}

export default Redirect;
