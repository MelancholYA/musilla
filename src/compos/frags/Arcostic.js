import { useState , useEffect} from 'react'
import Message from './Message'
const Arcostic = () => {
    const [playlist,setPlaylist] = useState([]);
    const [message,setMessage] = useState('');
    const [counter,setcounter] = useState(0);
    const [show,setshow] = useState(false);
    const update = (e) =>{
        setMessage(e.target.value);
        
    }
    useEffect(() => {
        if (message.length === 0) {
            setshow(false);
        }
    }, [message])
    const generate = ()=>{
        const newCounter = counter+1;
        setcounter(newCounter);
        if(message.length === 0){
            alert("please fill in the field");
        }else{
            setshow(true);
        }
        
    }
    
    return (
        <div className="Arcostic">
            <h3>Make an Arcostic playlist</h3>
            <h5>Create a playlist with a secret message hidden as an acrostic in track name (first letter)</h5>
            <div className="generator">
                <input type="text" placeholder='enter your message' onChange={(e)=>update(e)} value={message} required/>
                <button onClick={generate}>Generate</button>
            </div>
            {show && <Message message={message} counter={counter}/>}
        </div>
    )
}

export default Arcostic
