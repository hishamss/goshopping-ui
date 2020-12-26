import { useState, useEffect } from 'react';
import { getStoreItem } from '../../ajax';
import { StoreItem as StoreItemType } from '../../types';
import Layout from '../layout';
import { RouteComponentProps } from 'react-router-dom';
import { capitalize, getPathVar } from '../../util';

const StoreItem = ({ location } : RouteComponentProps) => {
    const [fetchedItem, setFetchedItem] = useState<StoreItemType|null>(null);

    useEffect(() => { (async () => setFetchedItem(await getStoreItem(Number.parseInt(getPathVar(location)))) )() }, [location]);

    return (
        <div className="StoreItem">
            <h1 className="heading">{fetchedItem ? `${capitalize(fetchedItem.title)}` : `Item #${getPathVar(location)}`}</h1>
            <div className="prompt">{fetchedItem ? "Here's what information we have for this item" : "Failed to fetch information for this item"}</div>
        </div>
    )
}

export default Layout(StoreItem);