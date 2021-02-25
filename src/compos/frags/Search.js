import searchIcon from '../../imgs/search.png'
import { Redirect } from 'react-router'
import {useState} from 'react';
const Search = () => {
    const [redirect,setRedirect] = useState(false); 
    const [searchWord,setSearchWord] = useState('');
    const [searchQuery,setSearchQuery] = useState('');
    const searchSong = () => {
        if(searchWord.length === 0){
            alert('please enter a song name to search for')
        }
        setSearchQuery(searchWord);
        setRedirect(true);
        console.log(redirect);
    }
    const update = (e) => {
        setSearchWord(e.target.value);
    }
    const searchSongEnter = (e) => {
        if(e.key === 'Enter'){
            searchSong();
        }
    }
    
    return (
        <div className="search">
                <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder='search for artists or tracks' 
                onKeyDown={searchSongEnter} 
                onChange={update}
                value={searchWord}/>
                <div className="img">
                    <img src={searchIcon} alt="searchIcon" onClick={searchSong}/>
                </div>
                {redirect ? <Redirect to={"/search/"+searchQuery} /> : '' }
        </div>
        
    )
}

export default Search
