import { KeyboardEvent } from "react";
import { Tag } from '../types';

type Props = {
    handlers : {
        pageUp() : void;
        pageDown() : void;
        filter(event : { currentTarget: HTMLSelectElement; }) : void;
        search(event: KeyboardEvent<HTMLInputElement> ) : void;
        limit(event: { currentTarget: HTMLSelectElement; }) : void;
        sort(event: { currentTarget: HTMLSelectElement; }) : void;
    };
    tags: Tag[];
    top: boolean;
    showPageButtons: { pageUp : boolean; pageDown : boolean };
};

const SearchBar = ({handlers, tags, top, showPageButtons} : Props) => {
    return <div className="SearchBar">
        {top && 
        <span>
            <select className="filter" defaultValue="default" onChange={handlers.filter}>
                <option key={0} value="default" disabled>Filter by</option>
                <option key="any" value="any">Any</option>
                {tags.map(tag => <option key={tag.id} value={tag.name}>{tag.name}</option>)}
            </select>
            <input type="text" className="search" placeholder="What would you like to see?" onKeyDown={handlers.search} />
            <select className="limit" onChange={handlers.limit}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <select className="sort" defaultValue="default" onChange={handlers.sort}>
                <option value="default" disabled>Sort by</option>
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price Ascending</option>
                <option value="price_desc">Price Descending</option>
                <option value="name_asc">Name Ascending</option>
                <option value="name_desc">Name Descending</option>
            </select>
        </span>}
        {showPageButtons.pageDown && <button onClick={handlers.pageDown}>Previous Page</button>}
        {showPageButtons.pageUp && <button onClick={handlers.pageUp}>Next Page</button>}
    </div>
}

export default SearchBar;