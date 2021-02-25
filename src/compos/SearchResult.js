import SearchedSongs from  './frags/SearchedSongs';
import SearchedArtists from  './frags/SearchedArtists';
const SearchResult = ({match}) => {
    return (
        <div className="searchResult">
            <h1>Search Results</h1>
            <SearchedSongs query={match.params.word}/>
            <SearchedArtists query={match.params.word}/>
        </div>
    )
}

export default SearchResult
