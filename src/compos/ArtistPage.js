import Albums from './frags/Albums'
import Artist  from './frags/Artist'
const ArtistPage = ({match}) => {
    return (
        <div className="artist">
            <div className='song'>
                <Albums artist={match.params.artist}/>
                <Artist id={match.params.artist} />
            </div>
        </div>
    )
}

export default ArtistPage
