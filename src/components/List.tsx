import { ListItemTypes, Item, OrderItem, Tag, Store } from "../types";
import { ListTypes, STORE, CHECKOUT, ORDERS } from "../store/types";
import ListItem from "./ListItem";
import { updateCart } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { updateCartStorage } from '../util';
import {useState ,FormEvent } from 'react';

interface Props {
  list: ListItemTypes[];
  type: ListTypes;
}

const List = ({ list, type }: Props) => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((store : Store) => store);
  const [showCaseItem, setShowCaseItem] = useState<ListItemTypes>(list[0]);
  const [message, setMessage] = useState("");
  
  const addToCart = (e : FormEvent<HTMLFormElement>, item : Item) => {
    e.preventDefault();
    const itemToAdd : OrderItem = {
        ...item,
        quantity: Number.parseInt(e.currentTarget.quantity?.value) || 1
    };
    e.currentTarget.reset();
    const itemIndexInCart = cart.findIndex(cartItem => cartItem.id === itemToAdd.id);

    if (itemIndexInCart > -1) {
        cart[itemIndexInCart].quantity += itemToAdd.quantity;
    } else cart.push(itemToAdd);

    dispatch( updateCart(cart) );
    updateCartStorage(user, cart);
    e.currentTarget.children[0].innerHTML = `Added ${itemToAdd.quantity} item${itemToAdd.quantity > 1 ? 's' : ''}`;
  };

  const adjustCartQuantity = (itemId:number, drop:boolean=false, dropall:boolean=false) => {
    const cartItem = cart.find(({ id }) => itemId === id);
    if (!cartItem) return;
    if (drop) {
        if (dropall) { cart.splice(cart.findIndex(item => item === cartItem), 1) }
        else if (cartItem.quantity === 1) {
            if (window.confirm("This will remove the item from your cart")) {
                cart.splice(cart.findIndex(item => item === cartItem), 1);
            }
        }
        else cartItem.quantity--;
    } else cartItem.quantity++;

    dispatch( updateCart(cart) );
    updateCartStorage(user, cart);
  }

  return (
    <div className="List">
        {message && <div className = "failure"> {message}</div>}
        {!list.length
            ? <div>No items found</div>
            : <ul>
                {( ((type === ORDERS) && (showCaseItem && showCaseItem !== list[0])) ? [showCaseItem, ...list] : list).map((item) =>
                    <li key={item.id}>
                        {[STORE, CHECKOUT].includes(type) && <img src={(item as Item).img} alt="store item" />}

                        <ListItem key={item.id} type={type} setMessage={setMessage} setShowCaseItem={setShowCaseItem} item={  Object.entries(item)
                            .reduce((acc, [key, val]) =>
                                ['id', 'img'].includes(key)
                                    ? acc
                                    : ({ ...acc, [key]: (key === 'tags')
                                        ? val.map(({ name } : Tag) => name)
                                        : (key === 'price') ? `$${val}` : val }),
                            {}) as ListItemTypes} 
                        />
                        
                        {type === STORE &&
                            <form className="adjust-cart-store" onSubmit={e => addToCart(e, item as Item)}>
                                <div className="success"></div>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="quantity"
                                    min={1}
                                    required
                                    onClick={e => {
                                        const form = e.currentTarget.parentElement;
                                        if (form) form.children[0].innerHTML = '';
                                    }}
                                />
                                <button>ADD TO CART</button>
                            </form>
                        }

                        {type === CHECKOUT &&
                            <div className="adjust-cart-checkout">
                                <button style={{ backgroundColor: 'turquoise' }} onClick={() => adjustCartQuantity(item.id)}>+</button>
                                <button style={{ backgroundColor: 'red' }} onClick={() => adjustCartQuantity(item.id, true)}>-</button>
                                <button onClick={() => adjustCartQuantity(item.id, true, true)}>Drop All</button>
                            </div>
                        }
                    </li>
                )}
            </ul>
        }

        <style>{`
            .List {
                margin: 1.5rem 1rem;
            }

            .List > ul {
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                width: calc(100vw - 4rem);
                gap: 2.5rem;
            }

            .List > ul > li {
                display: grid;
                grid-template-columns: 1fr 6fr 1fr;
                gap: 2rem;
                align-items: center;
            }

            .List .adjust-cart-store button, .List .adjust-cart-checkout button {
                width: 100%;
                white-space: nowrap;
                transition: transform 125ms ease-out;
                border-radius: 10px;
            }

            .List .adjust-cart-checkout {
                display: flex;
            }

            .List .adjust-cart-checkout button:hover { 
                transform: translateY(-.2rem);
            }

            .List .adjust-cart-checkout button:active {
                transform: translateY(-.05rem);
            }
        `}</style>
    </div>
  );
};

export default List;
