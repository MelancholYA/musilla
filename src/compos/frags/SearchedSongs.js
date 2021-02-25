import {useState , useEffect} from 'react';
import loader from '../../imgs/loader.svg';
import { Link } from 'react-router-dom'
import Songs from './Songs'
const SearchedSongs = ({query}) => {
    const [songs,setSongs] = useState([]);
    const [counter,setCounter] = useState(8);
    const showMore = () => {
        setCounter(counter + 4);
    }
        const apiUrl = `https://api.happi.dev/v1/music?q=${query}&limit=50&type=track&lyrics=0`;
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
              setSongs([]);
              const merge = async () => {
                const data = await fetchSongs();
                setSongs(data.result);
              }
              merge();
          }, [query])
          
    if(Object.keys(songs).length === 0){
        return(
            <div className='searched songs'>
                <h2>songs</h2>
                <div className="songs" >
                    <ul>
                        <li className='flex'>
                            <a href="">
                                <div >
                                    <h4 >Loading</h4>
                                </div>
                                <img src={loader} alt=""/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    return (
        <div className='searched songs'>
            <h2>songs</h2>
            <Songs tracks={songs} from={'search'}/>
        </div>
    ) 
}

export default SearchedSongs
