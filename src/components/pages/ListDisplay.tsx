import { useState, useEffect, KeyboardEvent } from 'react';
import Layout from '../layout';
import { STORE, ORDERS, USERS } from '../../store/types';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import List from '../List';
import SearchBar from '../SearchBar';
import { getOrders, getStoreItems, getUsers, getTags } from '../../ajax';
import { ListItemTypes, ItemSearchQueryParams, Tag } from '../../types';
import Redirect from './Redirect';

interface Props {
    type : typeof STORE | typeof ORDERS | typeof USERS;
}

const ListDisplay = ({ type } : Props) => {
    const user = useSelector(({ user } : Store) => user);
    const [listItems, setListItems] = useState<ListItemTypes[]>([]);
    const [heading, setHeading] = useState<string>('Store');
    const [prompt, setPrompt] = useState<string>('Store');
    const [search, setSearch] = useState<ItemSearchQueryParams>({ page: 0, quantity: 10 });
    const [tags, setTags] = useState<Tag[]>([]);
    const [showPageButtons, setShowPageButtons] = useState<{pageUp:boolean;pageDown:boolean}>({ pageUp: true, pageDown: false });

    useEffect(() => {
        (async () => {
            switch (type) {
                case STORE:
                    setHeading('Store');
                    setPrompt('Browse items in our catalog');
                    setTags(await getTags());
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

    useEffect(() => {
        (type === STORE) && getStoreItems(search)
            .then(result => {
                setShowPageButtons({
                    pageUp: (result.length > search.quantity),
                    pageDown: (search.page > 0)
                });
                setListItems(result.slice(0, Math.min(search.quantity, result.length)));
            });
    }, [search, type]);

    const handlers = {
        pageUp() {
            setSearch({ ...search, page: search.page+1 });
        },

        pageDown() {
            setSearch({ ...search, page: Math.max(0, search.page-1) });
        },

        filter(event : { currentTarget: HTMLSelectElement; }) {
                setSearch({ ...search, page: 0, tag: (event.currentTarget.value === "any") ? undefined : event.currentTarget.value });
        },

        search(event: KeyboardEvent<HTMLInputElement>) {
            if(event.key === 'Enter')
                setSearch({ ...search, page: 0, text: event.currentTarget.value });
        },

        limit(event : { currentTarget: HTMLSelectElement; }) {
            setSearch({ ...search, quantity: Number(event.currentTarget.value), page: 0 });
        },

        sort(event : { currentTarget: HTMLSelectElement; }) {
            setSearch({ ...search, page: 0, sortBy: event.currentTarget.value})
        }
    }

    return <div className="ListDisplay">
        <h1 className="heading">{heading}</h1>
        <div className="prompt">{prompt}</div>
        {type === STORE && <SearchBar handlers={handlers} tags={tags} top showPageButtons={showPageButtons} />}
        <List type={type} list={listItems} />
        {type === STORE && <SearchBar handlers={handlers} tags={tags} top={false} showPageButtons={showPageButtons} />}
    </div>
}

export default Layout(ListDisplay);