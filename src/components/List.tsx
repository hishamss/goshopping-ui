import { ListItemTypes } from '../types';
import { ListTypes } from '../store/types';
import ListItem from './ListItem';
import { colors } from '../styles';

interface Props {
    list : ListItemTypes[];
    type : ListTypes;
}

const List = ({ list, type }: Props) => {
    return (
        <div className="List">
            <div>{!list.length && 'No items found'}</div>
            <ul> {list.map(item => <li key={item.id}> <ListItem key={item.id} type={type} item={item} /> </li> )} </ul>

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
                    background-color: ${colors.GRAYSCALE[3]};
                    padding: .4rem .45rem;
                    box-shadow: 2px 2px 3px 1px ${colors.GRAYSCALE[1]};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 7px;
                    width: 100%;
                }
            `}</style>
        </div>
    )
}

export default List;
