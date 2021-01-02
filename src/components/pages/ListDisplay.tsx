import { useState, useEffect } from 'react';
import Layout from '../layout';
import { STORE, ORDERS, USERS } from '../../store/types';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import List from '../List';
import { getOrders, getStoreItems, getUsers } from '../../ajax';
import { ListItemTypes } from '../../types';
import Redirect from './Redirect';

interface Props {
    type : typeof STORE | typeof ORDERS | typeof USERS;
}

const ListDisplay = ({ type } : Props) => {
    const user = useSelector(({ user } : Store) => user);
    const [listItems, setListItems] = useState<ListItemTypes[]|[]>([]);
    const [heading, setHeading] = useState<string>('Store');
    const [prompt, setPrompt] = useState<string>('Store');

    useEffect(() => {
        (async () => {
            switch (type) {
                case STORE:
                    setHeading('Store');
                    setPrompt('Browse items in our catalog')
                    setListItems(await getStoreItems());
                    break;
                case ORDERS:
                    if (!user) return <Redirect />;
                    setHeading('My Orders');
                    setPrompt('View current and past orders for your account');
                    setListItems(await getOrders(user.id));
                    break;
                case USERS:
                    if (!user?.admin) return <Redirect />;
                    setHeading('Users');
                    setPrompt('View and manage registered users');
                    setListItems(await getUsers());
                    break;
                default:
                    return <Redirect />
            }
        })();
    }, [type, user]);

    return <div className="ListDisplay">
        <h1 className="heading">{heading}</h1>
        <div className="prompt">{prompt}</div>
        <List type={type} list={listItems} />
    </div>
}

export default Layout(ListDisplay);