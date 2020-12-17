import Layout from '../layout';
import { useSelector } from 'react-redux';
import { Store } from '../../types';

// Return a div with a class name of the component
// Add a class name of "page" if component is a page
// Wrap return expression with a fragment if adding styles
const Home = () => {
    const user = useSelector(({ user } : Store) => user);
    
    return (<>
        <div className="page Home">
            <h1 className="heading">Home</h1>
            <div className="prompt">
                {user
                    ? `Welcome, ${user.username}`
                    : 'Log in or sign up today!'}
            </div>
        </div>

        {/* Prefix all selectors with the class name of the component to limit scope (i.e. "Home .heading") */}
        <style>{`
        
        `}</style>
    </>)
}

export default Layout(Home);
