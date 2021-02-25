import {useState , useEffect} from 'react';
import loader from '../../imgs/loader.svg';
import { Link } from 'react-router-dom'
const SearchedArtists = ({query}) => {
    const [artists,setArtists] = useState([]);
    const [counter,setCounter] = useState(8);
    const showMore = () => {
        setCounter(counter + 4);
    }
        const apiUrl = `https://api.happi.dev/v1/music?q=${query}&limit=50&type=artist&lyrics=0`;
        const fetchArtists = async () => {
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
              setArtists([]);
              const merge = async () => {
                const data = await fetchArtists();
                setArtists(data.result);
              }
              merge();
          }, [query])
    if(artists.length === 0){
        return(
            <div>
                <img src={loader} alt=""/>
            </div>
        )
    }
    return (
        <div className='searched songs'>
            <h2>Artists</h2>
            <ul>
                {artists.filter((artist,i)=> i < counter).map((artist,i)=>
                    <li key={i}>
                        <Link to={`/artist/${artist.id_artist}`}>
                            <img src={artist.cover} alt={artist.artist}/>
                            <h3>{artist.artist}</h3>
                        </Link>
                    </li>
                    )}
            </ul>
            <button onClick={showMore}>Show More</button>
        </div>
    )
}

export default SearchedArtists