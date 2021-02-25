import HeroImage from "../imgs/background.jpg";
import Search from './frags/Search'
import Suggestions from './frags/Suggestions'
import Arcostic from './frags/Arcostic'
const Home = () => {
    const style = {
        background:`url(${HeroImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
    }
    return (
        <div className="home">
            <div className="hero" style={style}>
                <div className="container">
                    <h1>Your Place to Read the Music</h1>
                    <h4>Find the Lyrics of the music you love</h4>
                    <Search/>
                </div>
            </div>
            <Suggestions/>
            <Arcostic/>
        </div>
    )
}

export default Home
