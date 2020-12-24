import { ListItemTypes } from '../types';
import { Link } from 'react-router-dom';

interface Props<T> {
    titleKey : keyof T;
    item : ListItemTypes;
}

const ListItem = ({ titleKey, item }: Props<ListItemTypes>) => {
    return (
        <div className="ListItem" key={item.id}>
            <li key={item.id}>
                <Link to={`/store/${item.id}`}><strong>{item[titleKey]}</strong></Link>
                {Object.entries(item)
                    .filter(([key]) => key !== titleKey)
                    .map(([key, val]) => <div>{key} | {val}</div>)
                }
            </li>

            <style>{`

            `}</style>
        </div>
    )
}

export default ListItem
