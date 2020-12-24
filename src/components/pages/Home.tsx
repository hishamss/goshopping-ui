import Layout from '../layout';
import { useSelector } from 'react-redux';
import { Store } from '../../types';

// Return a div with a class name of the component, include style tags below all JSX but inside component div
const Home = () => {
    const user = useSelector(({ user } : Store) => user);

    return <div className="Home">
        <h1 className="heading">Home</h1>
        <div className="prompt">
            {user
                ? `Welcome, ${user.username}!`
                : 'Log in or sign up today!'}
        </div>

        {/* Prefix all selectors with the class name of the component to limit scope (i.e. ".Home .heading") */}
        {/* import { colors } from styles.ts and inject with ${colors.SOMECOLOR}, don't hardcode! */}
        {/* Don't use inline styles; Prefer classes instead of hierarchical selectors */}
        <style>{`
        
        `}</style>
    </div>
}

export default Layout(Home);
