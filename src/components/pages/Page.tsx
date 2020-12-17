import Layout from '../layout';
import { PAGE_ONE, PAGE_TWO, AUTHENTICATED } from '../../store/types';
import { useSelector } from 'react-redux';
import { Store } from '../../types';

interface Props {
    // Tell the component which version to render with string types (exported from store/types)
    type : typeof PAGE_ONE | typeof PAGE_TWO | typeof AUTHENTICATED;
}

// Return a div with a class name of the component
// Add a class name of "page" if component is a page
// Wrap return expression with a fragment if adding styles

// If component has three versions, render with a switch case (This pattern is likely too verbose and we may be better off with unique components; Just trying it out if applicable -Nick)
const Page = ({ type } : Props) => {
    const user = useSelector(({ user } : Store) => user);
    return (<>
        <div className="page Page">
            <h1 className="heading">{(() => {
                switch (type) {
                    case PAGE_ONE:
                        return 'Page 1';
                    case PAGE_TWO:
                        return 'Page 2';
                    case AUTHENTICATED:
                        return 'Authenticated';
                    default:
                        return 'Page Unknown';
                }
            })()}</h1>
            <div className="prompt">You're {!user && 'not '}{type === AUTHENTICATED && 'definitely '}authenticated</div>
        </div>
        
        {/* Prefix all selectors with the class name of the component to limit scope (i.e. "Page .heading") */}
        <style>{`

        `}</style>
    </>)
}

export default Layout(Page);
