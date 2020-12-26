import { useState, useEffect } from 'react';
import { getOrderById } from '../../ajax';
import { Order as OrderType } from '../../types';
import Layout from '../layout';
import { RouteComponentProps } from 'react-router-dom';
import { getPathVar } from '../../util';

const Order = ({ location } : RouteComponentProps) => {
    const [fetchedOrder, setFetchedOrder] = useState<OrderType|null>(null);

    useEffect(() => { (async () => setFetchedOrder(await getOrderById(Number.parseInt(getPathVar(location)))) )() }, [location]);

    return (
        <div className="Order">
            <h1 className="heading">Order #{getPathVar(location)}</h1>
            <div className="prompt">{fetchedOrder ? "Here's what information we have for this order" : "Failed to fetch information for this order"}</div>
        </div>
    )
}

export default Layout(Order);