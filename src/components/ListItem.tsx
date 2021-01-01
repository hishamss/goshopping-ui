import { ListItemTypes } from '../types';
import { colors } from '../styles';

interface Props {
    item : ListItemTypes;
}

const ListItem = ({ item }: Props) => {

    return <table className="ListItem">
            <tbody>
                <tr>
                    {Object.entries(item)
                        .map(([key]) => <th key={key}>{key}</th>)
                    }
                </tr>
                <tr>
                    {Object.entries(item)
                        .map(([key, val]) => <td key={key}>{(val || val === false) ? val.toString() : 'no data'}</td>)
                    }
                </tr>
            </tbody>

        <style>{`
            .ListItem {
                font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
                
            .ListItem td, .ListItem th {
                border: 1px solid #ddd;
                padding: 8px;
            }
                
            .ListItem tr:nth-child(even){ background-color: #f2f2f2; }
                
            .ListItem tr:hover { background-color: #ddd; }
                
            .ListItem th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: ${colors.LIGHTEST};
                color: white;
            }
        `}</style>
    </table>
}

export default ListItem;
