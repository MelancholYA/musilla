import Albums from "./frags/Albums";
import Songs from "./frags/Songs";
import {useState , useEffect} from 'react';
import albumIcon from '../imgs/album.svg'
import artistIcon from '../imgs/artist.svg'
import loader from '../imgs/loader.svg'
const Album = ({match}) => {
    const apiUrl = `https://api.happi.dev/v1/music/artists/${match.params.artist}/albums/${match.params.album}/tracks`;
    const fetchAlbum = async ()=>{
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
                  albums:{
                      tracks:{
                          error:error
                      }
                  }
                }
            };
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        setAlbum([]);
        const merge = async () =>{
            const data = await fetchAlbum();
                setAlbum(data.result);
        }
        merge();
      }, [match.params.artist ,match.params.album ]);
      const [album , setAlbum] = useState([]);
    if(Object.keys(album).length === 0){
        return (
            <div className='album'>
            <div className="song">
                <div className="lyrics">
                    <div className="header">
                        <div className="holder">
                            <div className="con">
                                <div className="artistt">
                                    <img src={artistIcon} alt="artistIcon"/>
                                    <h4>Artist name</h4>
                                </div>
                                <div className="album">
                                    <img src={albumIcon} alt="albumIcon"/>
                                    <h4>album name</h4>
                                </div>
                            </div> 
                        </div>
                        <img className='coverPic' src={loader} alt={album.album}/>
                    </div>
                    <div className="body">
                        <img src={loader} alt=""/>
                    </div>
                </div>
                </div>
                <img src={loader} alt=""/>
            </div>
        )
    }
    album.tracks.map(track => {
        track.id_album = album.id_album ;
        track.id_artist = album.id_artist;
      })
      console.log(album)
    return (
        <div className='album'>
        <div className="song">
            <div className="lyrics">
                <div className="header">
                    <div className="holder">
                        <div className="con">
                            <div className="artistt">
                                <img src={artistIcon} alt="artistIcon"/>
                                <h4>{album.artist}</h4>
                            </div>
                            <div className="album">
                                <img src={albumIcon} alt="albumIcon"/>
                                <h4>{album.album}</h4>
                            </div>
                        </div> 
                    </div>
                    <img className='coverPic' src={album.cover} alt={album.album}/>
                </div>
                <div className="body">
                    <Songs tracks={album.tracks}/>
                </div>
            </div>
            </div>
            <Albums artist={match.params.artist}/>
        </div>
    )
}

export default Album
