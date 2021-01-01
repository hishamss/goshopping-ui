import { ListItemTypes } from '../types';
import ListItem from './ListItem';
import { colors } from '../styles';

interface Props {
    list : ListItemTypes[];
}

const List = ({ list }: Props) => {
    return (
        <div className="List">
            <div>{!list.length && 'No items found'}</div>
            <ul> {list.map(item => <li key={item.id}> <ListItem key={item.id} item={item} /> </li> )} </ul>

            <style>{`
                .List {
                    margin: 1.5rem 1rem;
                }

                .List > ul {
                    margin: auto;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    width: 78vw;
                    gap: 1rem;
                }

                .List > ul > li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
            `}</style>
        </div>
    )
}

export default List;
