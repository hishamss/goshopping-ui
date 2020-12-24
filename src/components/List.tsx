import { ListItemTypes } from '../types';
import { STORE, ORDERS, USERS, listItemTitleKeyMap } from '../store/types';
import ListItem from './ListItem';


interface Props {
    list : ListItemTypes[];
    type : typeof STORE | typeof ORDERS | typeof USERS;
}

const List = ({ list, type }: Props) => {
    return (
        <div className="List">
            <div>{!list.length && 'No items found'}</div>
            <ul>{list.map(item => <ListItem key={item.id} titleKey={listItemTitleKeyMap[type] as keyof typeof item} item={item} />)}</ul>

            <style>{`

            `}</style>
        </div>
    )
}

export default List
