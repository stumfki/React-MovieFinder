import React from 'react';
import '../css/movieList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//http://www.omdbapi.com/?s=${movieName.value}&plot=full&apikey=96c23a4d
import star from '../img/star.svg'
import noimage from '../img/noimage.jpg'
function Mywatchlist(props) {
 
 const styles = {
    justifyContent: props.Plot !== "N/A" ? "center" : "start",
    marginLeft: props.Plot !== "N/A" ? "0" : "1%"
 }
  return (
    <div className="movieListCont" style={styles} key={props.imdbID}>
      <div className="movie">

        <img src={props.Poster !== "N/A" ? props.Poster : noimage} id="poster"></img>

        <div className="movieInfo" >

            <div className="movieName mt-3">
                <h1>{props.Title}</h1>
                <img src={star}></img>
                <p>8.1</p>
            </div>

            <div className="movieDuration mt-3">
                <p>{props.Runtime}</p>
                <p>{props.Genre}</p>
                <div className="movieButton ms-1">
                <button onClick={() =>props.removeMovie(props.id, props.imdbID)}></button>
                <p>Remove</p>
                </div>
               
            </div>

            <div className="movieDescription" >
                <p>{props.Plot !== "N/A" ? props.Plot : "No plot avalible faaaaaaaaaamovie."}</p>
            </div>

        </div>
      </div>
      
      <div className="border mt-3"></div>
      

    </div>
  )
}

export default Mywatchlist