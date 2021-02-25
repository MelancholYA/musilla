import Header from "./compos/frags/Header"
import Home from "./compos/Home"
import Song from "./compos/Song"
import Album from "./compos/Album"
import SearchResult from "./compos/SearchResult"
import ArtistPage from "./compos/ArtistPage"
import Footer from './compos/frags/Footer'
import { BrowserRouter as Router,Switch ,Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/songs/:track/:artist/:album' component={Song}/>
            <Route path='/album/:artist/:album' component={Album}/>
            <Route path='/search/:word/' component={SearchResult}/>
            <Route path='/artist/:artist/' component={ArtistPage}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
