import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import loader from '../../imgs/loader.svg' 
const Message = ({message,counter}) => {
    const apiUrl = `https://api.happi.dev/v1/music/artists/25243/smart-playlist/acrostic?message=${message}` 
    const fetchPlaylist = async () => {
        try {
            const data = await fetch(apiUrl,{
                headers:{
                    "x-happi-key":process.env.REACT_APP_API_KEY
                }
            })
            const final = await data.json()
            if(!final.success){
                return {
                    result:{
                        error:final.error
                    }
                };
            }
            return final;
        } catch (error) {
            return {
                result:{
                    error:error
                }
            };
        }
    }
    const [playlist,setPlaylist] = useState([]);
    useEffect(() => {
        const merge = async () => {
            setPlaylist([]);
            const data = await fetchPlaylist();
            setPlaylist(data.result);
        }
        merge();
    }, [counter])
    if(playlist.length === 0){
        return (
            <div className="loader">
                <img src={loader} alt="loader"/>
            </div>
        )
    }else if('error' in playlist){
        return(
            <h1 className='error'>something went wrong , please try reloading your page</h1>
        )
    }
    return (
        <div className='message'>
           <h1>{message}</h1>
           <ul>
               {playlist.map((track,i) => 
                <li key={track.id_track}>
                    <Link to={`/songs/${track.id_track}/${track.id_artist}/${track.id_album}`} >
                        <h2>{track.track}</h2>
                        <img src={track.cover} alt={track.album+' cover'}/>
                        <h4>{track.artist}</h4>
                    </Link>
                </li>
                )}
           </ul>
        </div>
    )
}

export default Message
