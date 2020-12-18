import Layout from '../layout';
import { PAGE_ONE, PAGE_TWO, AUTHENTICATED } from '../../store/types';
import { useSelector } from 'react-redux';
import { Store } from '../../types';

interface Props {
    // Tell the component which version to render with string types (exported from store/types)
    type : typeof PAGE_ONE | typeof PAGE_TWO | typeof AUTHENTICATED;
}

// Return a div with a class name of the component, include style tags below all JSX but inside component div

// If component has three versions, render with a switch case (This pattern is likely too verbose and we may be better off with unique components; Just trying it out if applicable -Nick)
const Page = ({ type } : Props) => {
    const user = useSelector(({ user } : Store) => user);

    return <div className="Page">
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
    
        {/* Prefix all selectors with the class name of the component to limit scope (i.e. ".Page .heading") */}
        {/* import { colors } from styles.ts and inject with ${colors.SOMECOLOR}, don't hardcode! */}
        {/* Don't use inline styles; Prefer classes instead of hierarchical selectors */}
        <style>{`

        `}</style>
    </div>
}

export default Layout(Page);
