import Payment from '../Payment';
import Layout from '../layout';
import List from '../List';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import { CHECKOUT } from '../../store/types';
import { capitalize } from '../../util';
import { colors } from '../../styles';

const Checkout = () => {
    const { user, cart } = useSelector((store : Store) => store);

    return (
        <div className="Checkout">
            <h1 className="heading">{user ? capitalize(user.username) + "'s" : 'My'} Cart</h1>
            <div className="prompt">{cart?.length ? "Here's what items are in your cart" : 'Visit the "Store" page to add items to your cart!'}</div>
            <List type={CHECKOUT} list={cart || []} />
            {user
              ? <Payment />
              : <div className="msg-unathenticated">
                  <div>Log in or make an account to place an order!</div>
                  <span>Don't worry, the items in your cart will still be there when you do.</span>
                </div>
            }
            <style>{`
              .Checkout .msg-unathenticated {
                text-align: center;
                margin-top: 2.8rem;
              }

              .Checkout .msg-unathenticated > div {
                font-weight: bold;
                color: ${colors.LIGHTER};
                font-size: 1.5rem;
                margin-bottom: .85rem;
              }

              .Checkout .msg-unathenticated span {
                display: block;
                font-size: 1.05rem;
                color: ${colors.LIGHTEST};
                margin-bottom: 3.5rem;
              }
            `}</style>
        </div>
    )
}

export default Layout(Checkout);
