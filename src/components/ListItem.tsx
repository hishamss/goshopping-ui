import { ListItemTypes, Order } from '../types';
import { colors } from '../styles';
import { ListTypes, listItemTitleKeys } from '../store/types';
import { useState } from 'react';
import { getStoreItem } from '../ajax';


interface Props {
    item : ListItemTypes;
    type : ListTypes;
    setShowCaseItem: React.Dispatch<React.SetStateAction<ListItemTypes>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ListItem = ({ type, item, setShowCaseItem, setMessage }: Props) => {
    const [titleKey] = useState(listItemTitleKeys[type]);

    return <div className="ListItem">
        <strong className="title">{item[titleKey as keyof typeof item]}</strong>
        <table className="list-item-details">
            <tbody>
                <tr>
                    {Object.entries(item)
                        .filter(([key]) => key !== titleKey)
                        .map(([key]) => <th key={key}>{key}</th>)
                    }
                </tr>
                <tr>
                    {Object.entries(item)
                        .filter(([key]) => key !== titleKey)
                        .map(([key, val]) => <td key={key}>
                            {(![null, undefined, ''].includes(val))
                                ? Array.isArray(val)
                                    ? (key === "items")
                                        ? (item as Order).items.map(({name, id})=><span className="orderItemName" onClick={async () => {
                                            const showCaseItem= await  getStoreItem(id);
                                            if (showCaseItem) {
                                                setShowCaseItem(showCaseItem as ListItemTypes);
                                                setMessage("");
                                            } else setMessage("Unable to load item");
                                        }}>{name}, </span>)    
                                        : val.filter(el => el).join(', ')
                                    : (key ==="date") 
                                        ? new Date(val).toLocaleDateString()
                                        : val.toString()
                                : 'Not available'
                            }
                        </td>
                    )}
                </tr>
            </tbody>
        </table>

        <style>{`
            .ListItem .list-item-details {
                font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
                
            .ListItem .list-item-details td, .ListItem .list-item-details th {
                border: 1px solid #ddd;
                padding: 8px;
            }
                
            .ListItem .list-item-details tr:nth-child(even){ background-color: #f2f2f2; }
                
            .ListItem .list-item-details tr:hover { background-color: #ddd; }
                
            .ListItem .list-item-details th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: ${colors.LIGHTEST};
                color: white;
            }

            .ListItem .title {
                display: block;
                font-size: 1.35rem;
                text-decoration: underline;
                margin-bottom: .25rem;
                margin-left: .125rem;
                transition: color 200ms ease-out;
            }

            .ListItem .title:hover {
                color: ${colors.DARKEST};
            }

            .ListItem .orderItemName:hover {
                cursor: pointer;
                text-decoration: underline;
                color: ${colors.LIGHTER};

            }
        `}</style>
    </div>
}

export default ListItem;
