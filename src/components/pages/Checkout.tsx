import Payment from '../Payment';
import Layout from '../layout';
import List from '../List';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import { CHECKOUT } from '../../store/types';
import { capitalize } from '../../util';

const Checkout = () => {
    const { user, cart } = useSelector((store : Store) => store);

    return (
        <div className="Checkout">
            <h1 className="heading">{user ? capitalize(user.username) + "'s" : 'My'} Cart</h1>
            <div className="prompt">{cart?.length ? "Here's what items are in your cart" : 'Visit the "Store" page to add items to your cart!'}</div>
            {cart
                ? <List list={cart} type={CHECKOUT} />
                : <div>Loading...</div>
            }
            <Payment />
        </div>
    )
}

export default Layout(Checkout);
