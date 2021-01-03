import { ListItemTypes, Item, OrderItem, Tag, Store, User } from "../types";
import { ListTypes, STORE, CHECKOUT, ORDERS, USERS } from "../store/types";
import ListItem from "./ListItem";
import { updateCart } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { updateCartStorage } from '../util';
import { useState, FormEvent } from 'react';
import { deleteUser } from '../ajax';

interface Props {
  list: ListItemTypes[];
  setList?: React.Dispatch<React.SetStateAction<ListItemTypes[]>>;
  type: ListTypes;
}

const List = ({ list, setList, type }: Props) => {
  const dispatch = useDispatch();
  const {user, cart} = useSelector((store : Store) => store);
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

  const onDeleteUser = (user_ : User) : void => {
    if (user?.admin && !user_.admin && window.confirm("This action cannot be reversed")) {
      deleteUser(user_.id)
        .then(() => {
          setMessage(`Deleted user "${user_.username}"`);
          setList && setList(list.filter(listItem => listItem !== user_));
        })
        .catch(() => setMessage(`Failed to delete user "${user_.username}"`))
    }
  }

  return (
    <div className="List">
        {message && <div className="error">{message}</div>}
        {!list.length
            ? <div>No items found</div>
            : <ul>
                {( ((type === ORDERS) && (showCaseItem && showCaseItem !== list[0])) ? [showCaseItem, ...list] : list).map((item) =>
                    <li key={item.id}>
                        {[STORE, CHECKOUT].includes(type) && <img src={(item as Item).img} alt="store item" />}

                        <ListItem key={item.id} type={type} setMessage={setMessage} setShowCaseItem={setShowCaseItem} item={  Object.entries(item)
                            .reduce((acc, [key, val]) =>
                                [(type !== USERS && 'id'), 'img', 'password'].includes(key)
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

                        {(type === USERS && !(item as User).admin) &&
                            <button className="btn-delete-user" onClick={() => onDeleteUser(item as User)}>Delete</button>
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

            .List .btn-delete-user {
                background-color: red;
                color: white;
                width: 4rem;
                text-align: center;
            }

            .List .btn-delete-user:hover {
                box-shadow: inset 2px 1px maroon;
            }

            .List .error {
                font-size: 1.25rem;
                margin-bottom: 1rem;
                text-align: center;
            }
        `}</style>
    </div>
  );
};

export default List;
