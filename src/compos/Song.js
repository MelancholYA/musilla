import Lyrics from "./frags/Lyrics";
import Artist from "./frags/Artist";
import Songs from "./frags/Songs";
import Albums from "./frags/Albums";
import loader from '../imgs/loader.svg' 
import {useState , useEffect} from 'react';
const Song = ({match}) => {
  const [album , setalbum] = useState({});
  const [tracks , setTracks] = useState([]);
      const apiUrl = `https://api.happi.dev/v1/music/artists/${match.params.artist}/albums/${match.params.album}/tracks`;
      const fetchSong = async () => {
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
            const merge = async ()=>{
              const data = await fetchSong();
              setalbum(data.result);
              setTracks(data.result.tracks);
              
            }
            merge();
          }, [match.params.album,match.params.artist]);
          tracks.map(track => {
            track.id_album = album.id_album ;
            track.id_artist = album.id_artist;
          })
          console.log(tracks);
          console.log(album);

    if(Object.keys(album).length === 0){
      return(
            <div className="loader">
                <img src={loader} alt="loader"/>
            </div>
      )
    }

    if('error' in album){
      return(
        <h1 className='error'>something went wrong , please try reloading your page</h1>
      )
    }
    return (
        <>
            <div className='song'>
                <Lyrics cover={album.cover} artist={match.params}/>
                <Artist id={match.params.artist} />
            </div>
            <Songs tracks={album.tracks}/>
            <Albums artist={match.params.artist}/>
        </>
        
    )
}

export default Song
