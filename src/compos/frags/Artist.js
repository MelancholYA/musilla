import {useState , useEffect} from 'react';
import facebookIcon from '../../imgs/facebook.svg'
import instagramIcon from '../../imgs/instagram.svg'
import spotifyIcon from '../../imgs/spotify.svg'
import twitterIcon from '../../imgs/twitter.svg'
import youtubeIcon from '../../imgs/youtube.svg'
import globeIcon from '../../imgs/globe.svg'
import loader from '../../imgs/loader.svg'
const Artist = ({id}) => {
    const apiUrl = `https://api.happi.dev/v1/music/artists/${id}`;
    const fetchartist = async () => {
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
        setArtist({});
        const merge = async ()=>{
            const data = await fetchartist();
            setArtist(data.result);
        }
        merge();
    }, [id])
    const [artist,setArtist] = useState({});
    const Prelinks = [
        artist.twitter,
        artist.instagram,
        artist.twitter,
        artist.facebook,
        artist.website,
        artist.spotify];
    const links = [
        `https://www.youtube.com/channel/${artist.twitter}`,
        `https://www.instagram.com/${artist.instagram}`,
        `https://twitter.com/${artist.twitter}`,
        `https://web.facebook.com/${artist.facebook}`,
        artist.website,
        `https://open.spotify.com/artist/${artist.spotify} `];
    const icons = [youtubeIcon,instagramIcon,twitterIcon,facebookIcon,globeIcon,spotifyIcon];
    if(Object.keys(artist).length === 0){
        return(
            <div className="artist">
                <img src={loader} />
                <h1>Artist name</h1>
            </div>
        )
    }else if("error" in artist){
        <div className="artist">
                <h1>something went wrong , please try again later</h1>
        </div>
    }
    return (
        <div className="artist">
            <img src={artist.cover} alt={artist.artist+' picture'} className='singer'/>
            <h1>{artist.artist}</h1>
            <div className="links">
                {links.map((link,i)=> 
                    <a key={i} href={link} className={Prelinks[i].length === 0 ? "disable" :'able'} target='_blank'><img src={icons[i]} alt=""/></a>
                    )}
            </div>
        </div>
    )
}

export default Artist
