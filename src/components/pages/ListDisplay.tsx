import { useState, useEffect } from 'react';
import Layout from '../layout';
import { STORE, ORDERS, USERS } from '../../store/types';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import List from '../List';
import { getOrdersForUser, getStoreItems, getUsers } from '../../ajax';
import { ListItemTypes } from '../../types';

interface Props {
    // Tell the component which version to render with string types (exported from store/types)
    type : typeof STORE | typeof ORDERS | typeof USERS;
}

// Return a div with a class name of the component, include style tags below all JSX but inside component div

// If component has three versions, render with a switch case (This pattern is likely too verbose and we may be better off with unique components; Just trying it out if applicable -Nick)
const ListDisplay = ({ type } : Props) => {
    const user = useSelector(({ user } : Store) => user);
    const [listItems, setListItems] = useState<[ListItemTypes]|[]>([]);
    const [heading, setHeading] = useState<string>('Store');
    const [prompt, setPrompt] = useState<string>('Store');

    useEffect(() => {
        user && (async () => {
            switch (type) {
                case STORE:
                    setListItems(await getStoreItems());
                    setHeading('Store');
                    setPrompt('Browse items in our catalog')
                    break;
                case ORDERS:
                    setListItems(await getOrdersForUser(user));
                    setHeading('My Orders');
                    setPrompt('View current and past orders for your account');
                    break;
                case USERS:
                    setListItems(await getUsers());
                    setHeading('Users');
                    setPrompt('View and manage registered users');
                    break;
                default:     
                setHeading('Page Unknown');
            }
        })();
    }, [type, user]);

    return <div className="ListDisplay">
        <h1 className="heading">{heading}</h1>
        <div className="prompt">{prompt}</div>
        <List list={listItems} type={type} />
    
        <style>{`

        `}</style>
    </div>
}

export default Layout(ListDisplay);