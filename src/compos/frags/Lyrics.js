import albumIcon from '../../imgs/album.svg'
import artistIcon from '../../imgs/artist.svg'
import songIcon from '../../imgs/music.svg'
import loader from '../../imgs/loader.svg'
import {useState , useEffect} from 'react';
const Lyrics = ({cover,artist}) => {
    const apiUrl = `https://api.happi.dev/v1/music/artists/${artist.artist}/albums/${artist.album}/tracks/${artist.track}/lyrics`;
      const fetchSong = async () => {
            try {
                  const data = await fetch(apiUrl,{
                      headers:{
                          "x-happi-key":process.env.REACT_APP_API_KEY
                      }
                  })
                  const final = await data.json();
                  if("error" in final || !final.success){
                    return {
                            result:{
                                error:"error"
                            }
                  } 
                  }else{
                    return final;
                  }
              } catch (error) {
                  return {
                      result:{
                          error:error
                      }
                  };
              }
        }
    const [song , setSong] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0);
        setSong({});
        const merge = async () =>{
            const data = await fetchSong();
                setSong(data.result);
        }
        merge();
    }, [artist])
    if(Object.keys(song).length === 0){
        return(
            <div className="lyrics">
                <div className="header">
                    <div className="holder">
                    <div className="song">
                            <img src={songIcon} alt="songIcon"/>
                            <h2>Song name</h2>
                        </div>
                        <div className="con">
                            <div className="artistt">
                                <img src={artistIcon} alt="artistIcon"/>
                                <h4>Artist name</h4>
                            </div>
                            <div className="album">
                                <img src={albumIcon} alt="albumIcon"/>
                                <h4>Album name</h4>
                            </div>
                        </div> 
                    </div>
                    <img className='coverPic' src={loader} alt={song.album}/>
                </div>
                <div className="body">
                    <img src={albumIcon} alt="albumIcon"/>
                </div>
            </div>
        )
    }
    if('error' in song){
        return (
            <div className="lyrics">
                <div className="body">
                    <h1 className='error'> No Lyrics are available for this Song</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="lyrics">
            <div className="header">
                <div className="holder">
                   <div className="song">
                        <img src={songIcon} alt="songIcon"/>
                        <h2>{song.track}</h2>
                    </div>
                    <div className="con">
                        <div className="artistt">
                            <img src={artistIcon} alt="artistIcon"/>
                            <h4>{song.artist}</h4>
                        </div>
                        <div className="album">
                            <img src={albumIcon} alt="albumIcon"/>
                            <h4>{song.album}</h4>
                        </div>
                    </div> 
                </div>
                <img className='coverPic' src={cover} alt={song.album}/>
            </div>
            <div className="body">
                {!song.lyrics ? <h1>no lyrics are available</h1> :
                song.lyrics.split('\n').map((lyric,i) => <p key={i}>{lyric}</p> )
                }
            </div>
        </div>
    )
    
}

export default Lyrics
