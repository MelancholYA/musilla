import songIcon from '../../imgs/music.svg'
import loader from '../../imgs/loader.svg'
import {useState , useEffect} from 'react';
import { Link } from 'react-router-dom'

const Albums = ({artist}) => {
    const apiUrl = `https://api.happi.dev/v1/music/artists/${artist}/albums`;
    const fetchAlbums = async () => {
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
                      error:error
                    }
                  }
              };
          }
    }
    useEffect(() => {
      window.scrollTo(0, 0);
      setAlbums([]);
      const merge = async () =>{
          const data = await fetchAlbums();
              setAlbums(data.result.albums);
      }
      merge();
    }, [artist])
    const [toShow ,setToShow] = useState(8);
    const expend = () =>{
        setToShow(toShow + 4);
        console.log(toShow);
    }
    const [albums,setAlbums] = useState([]);
    const background = {
      backgroundImage:`url(${songIcon})`,
      backgroundSize: '80% 80%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
    if(albums.length === 0){
      return(
        <div className="songs albums">
            <h1>Albums By the Same Artist</h1>
            <ul>
                <img src={loader} alt=""/>
            </ul>
            {toShow < albums.length && <button onClick={expend}>show more</button>}
        </div>
      )
    }
    return (
        <div className="songs albums">
            <h1>Albums By the Same Artist</h1>
            <ul>
                {albums.map((album,i)=> i < toShow &&
                    <li key={i}>
                        <Link to={`/album/${artist}/${album.id_album}`}>
                            <div className="img" style={background}>
                              <img src={album.cover} alt={album.album}/>
                            </div>
                            <h4>{album.album}</h4>
                        </Link>
                    </li>
                    )}
            </ul>
            {toShow < albums.length && <button onClick={expend}>show more</button>}
        </div>
    )
}

export default Albums
