import React from 'react';
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import Mywatchlist from './components/Mywatchlist';
import noimg from './img/noimg.png'
//http://www.omdbapi.com/?s=${movieName.value}&plot=full&apikey=96c23a4d
function App() {
  const [movieName, setMovieName] = React.useState('');
  const [callMovie, setCallMovie] = React.useState(0)
  const [movieIDs, setMoviesIDs] = React.useState([])
  const [movies, setMovies] = React.useState([])
  const [displayWatchlist, setDisplayWatchlist] = React.useState(true)
  const [myMoviesid, setmyMoviesid] = React.useState([])
  const [myMovies, setmyMovies] = React.useState([])



  const handleClick = (e) => {

    setCallMovie(prev => prev + 1)
    e.preventDefault()
    // do something with the movieName here
 
  }


  React.useEffect(() => {
    if (movieName) {
      fetch(`http://www.omdbapi.com/?s=${movieName}&plot=full&apikey=96c23a4d`)
      .then(resp => resp.json())
      .then(data => {
          if(data.Search) {
              const moviess = data.Search.map(movie => movie.imdbID)
              setMoviesIDs(moviess)
              setMovies([])
          }
      })
    }
  },[callMovie, movieName])
  


  React.useEffect(() => {
    for (let item in movieIDs) {
      fetch(`http://www.omdbapi.com/?i=${movieIDs[item]}&plot=short&apikey=96c23a4d`)
        .then(resp => resp.json())
        .then(data => {
          setMovies((prevMovies) => [...prevMovies, data])
        
        })
    }
  }, [movieIDs]);
  
  function addMovie(id, imdbI) {
    console.log(typeof imdbI)
    console.log(id)
    if(!myMoviesid.includes(imdbI)) {
    setmyMoviesid(prev => [...prev, movies[id].imdbID])
    } else {
      console.log("already added")
      alert("Already added.")
    }
    console.log(myMoviesid)
 
  }

  function removeMovie(id, imdbI) {
    console.log(imdbI)
    console.log(myMoviesid)
    const idStorage = myMoviesid.filter(prev => prev !== imdbI)
    const storage = myMovies.filter((prev,index) => index !== id)
    setmyMovies(storage)
    setmyMoviesid(idStorage)
  }

  React.useEffect(() => {
   
    for (let item in myMoviesid) {
      
      fetch(`http://www.omdbapi.com/?i=${myMoviesid[item]}&plot=short&apikey=96c23a4d`)
        .then(resp => resp.json())
        .then(data => {
          setmyMovies((prevMovies) => [...prevMovies, data])
        
        })
    }
     
   
      
console.log(myMovies)
   
  },[displayWatchlist])
 
  
  const myList = myMovies.map((movie,index) => {
    return <Mywatchlist {...movie} id={index} removeMovie={(id, imdbID) =>removeMovie(id, imdbID)}/>
  })

  const theList = movies.map((movie,index) => {
    return <MovieList {...movie} id={index} addMovie={(id, imdbID) =>addMovie(id, imdbID)}/>
  })

  function goToMyWatchList() {
    setDisplayWatchlist(prev => !prev)
    console.log(myList)
    setmyMovies([])
    
  }

  return (
    <div className="appContainer">

      <div className="headerContainer">
        <h1>Find your film</h1>
        <h3><a href="#" onClick={goToMyWatchList}>{displayWatchlist ? "My Watchlist" : "Find More Movies"}</a></h3>
      </div>

{!displayWatchlist && myList}



{displayWatchlist &&<div className='searchCont'>
      <div className="searchBar d-flex justify-content-center">
            <form className="searchForm d-flex">
            <input type="text" placeholder="Search for a movie" id="movieName" onChange={e => setMovieName(e.target.value)}/>
            <button type="submit" id="submit" onClick={handleClick}>
              Search
            </button>
          </form>
     </div>
     </div>}

     {displayWatchlist && <div className="movieContainer">
     {theList}
      
     </div>}

     {!displayWatchlist && myList.length === 0 && <div className='letsAddMovies'>
        <h1>Your watchlist is looking a little empty...</h1>
        <div className='buttonSearchMovie'>
          <button onClick={goToMyWatchList}></button>
          <p>Let's add some movies!</p>
        </div>
      </div>}

    {movieName === '' && displayWatchlist && <div className='noMovieSearched'>

     <img src={noimg}></img>
     <h1 className='mt-3'>Start Exploring</h1>
     </div>}
    </div>
  )
}

export default App