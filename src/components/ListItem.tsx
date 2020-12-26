import { useState, useEffect } from 'react';
import { ListItemTypes } from '../types';
import { USERS, STORE, ORDERS, ListTypes, listItemTitleKeyMap } from '../store/types';
import { Link } from 'react-router-dom';
import { colors } from '../styles';
import { routes } from '../resources';

interface Props {
    type : ListTypes;
    item : ListItemTypes;
}

const ListItem = ({ type, item }: Props) => {
    const [itemRoute, setItemRoute] = useState<typeof routes.STORE | typeof routes.ORDERS | typeof routes.USERS>('');
    const [titleKey, setTitleKey] = useState<keyof typeof item|''>('');

    useEffect(() => {
        switch (type) {
            case USERS:
                setTitleKey(listItemTitleKeyMap[type] as keyof typeof item);
                setItemRoute(routes.USERS);
                break;
            case STORE:
                setTitleKey(listItemTitleKeyMap[type] as keyof typeof item);
                setItemRoute(routes.STORE);
                break;
            case ORDERS:
                setTitleKey(listItemTitleKeyMap[type] as keyof typeof item);
                setItemRoute(routes.ORDERS);
                break;
            default:
                return;
        }
    }, [type]);

    return (
        <div className="ListItem" key={item.id}>
            <Link to={`${itemRoute}/${item.id}`}><strong>{item[titleKey as keyof typeof item]}</strong></Link>
            <ul>
                {Object.entries(item)
                    .filter(([key]) => key !== titleKey)
                    .map(([key, val]) => <li key={key}><i>{key}</i>: {val.toString()}</li>)
                }
            </ul>

            <style>{`
                .ListItem {
                    box-shadow: 1px 1px 1px ${colors.GRAYSCALE[1]};
                    background-color: ${colors.GRAYSCALE[4]};
                    padding: .35rem .65rem .75rem .65rem;
                    width: 100%;
                    border-radius: 6px;
                }
                
                .ListItem a {
                    color: ${colors.GRAYSCALE[0]};
                    font-size: 1.15rem;
                    text-decoration: underline;
                    outline: none;
                }

                .ListItem a:hover, .ListItem a:focus {
                    color: ${colors.LIGHTER};
                }

                .ListItem a:active {
                    color: ${colors.DARKER};
                }

                .ListItem ul {
                    margin-top: .75rem;
                    background-color: transparent;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: .4rem;
                }
            `}</style>
        </div>
    )
}

export default ListItem
