import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const Suggestions = () => {
    const [playlist,setPlayList] = useState([]); 
    const apiUrl = `https://api.happi.dev/v1/music/artists/25243/smart-playlist` ;
    const fetchSongs = async () => {
        try {
            const data = await fetch(apiUrl,{
                headers:{
                    "x-happi-key":process.env.REACT_APP_API_KEY
                }
            })
            const final = await data.json()
            return final;
        } catch (error) {
            return {
                result:{
                    error:error
                }
            };
        }
    }
    useEffect(() => {
        const merge = async () =>{
            const data = await fetchSongs();
            setPlayList(data.result);
        }
        merge();
    }, [])
    if('error' in playlist){
        return(
            <h1 className='error'>something went wrong , please try reloading your page</h1>
        )
    }
    return (
        <div className="suggestions">
            <h1>Try these :</h1>
            <ul>
                {playlist.filter((track,i)=> i < 12).map(track =>
                <li key={track.id_track}>
                   <Link to={`/songs/${track.id_track}/${track.id_artist}/${track.id_album}`}>
                        <img src={track.cover} alt={track.album+' cover'}/>
                        <h4>{`${track.artist} ( ${track.track} )`}</h4>
                    </Link>
                </li>
                )}
            </ul>
            
        </div>
    )
}

export default Suggestions
