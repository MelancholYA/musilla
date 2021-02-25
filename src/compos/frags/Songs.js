import { Link } from 'react-router-dom'
import lyrics from '../../imgs/lyrics.svg'
import {useState , useEffect} from 'react';
const Songs = ({tracks , from }) => {
    const [songs ,setSongs] = useState(tracks);
    const [toShow ,setToShow] = useState(9); 
    const expend = () =>{
        setToShow(toShow + 6);
    }
    const styles = {
        margin: '0',
        padding: '0',
    }
    return (
        <div className="songs" style={from === 'search' ? styles : {}}>
            {from !== 'search' && <h1>Tracks from the Same album</h1>}
            <ul>
                {songs.length > 0 ?
                songs.map((song,i)=> i < toShow &&
                    <li key={i} className='flex'>
                        <Link to={`/songs/${song.id_track}/${song.id_artist}/${song.id_album}`}>
                            <div >
                                <h4 >{song.track}</h4>
                                <h6 >{song.artist}</h6>
                            </div>
                            {!song.haslyrics && <img src={lyrics} alt="lyrics icon"/>}
                        </Link>
                    </li>
                    ) : <li className='error'>No songs available</li> }
            </ul>
            {(toShow < songs.length && songs.length > 0) && <button onClick={expend}>show more</button>}
        </div>
    )
}

export default Songs
