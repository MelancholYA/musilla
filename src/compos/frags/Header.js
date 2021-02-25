import logo from '../../imgs/logo.png'
import Search from './Search'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Header = () => {
    const location = useLocation();
    return (
        <header>
            <Link to='/'>
                <img className='logo' src={logo} alt="logo"/>
            </Link>
            {location.pathname !== '/' && <Search/> }
        </header>
    )
}

export default Header
