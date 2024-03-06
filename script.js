
const Searchform =     document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputbox =    document.querySelector('.input-box');
const Loader = document.querySelector('.loading');
const h2container = document.querySelector('#h2id');
const SearchList = document.querySelector('.search-list');

// Titles:https://www.omdbapi.com/?s=sultan&page=1&apikey=7c8f2ef8

// let currentpage = 1;
let showLoader = true;

const getmovieinfo = async (movie) => {
 try {
    if(showLoader){
        Loader.style.visibility = 'visible';
        h2container.style.display = 'none';
    moviecontainer.style.visibility= 'hidden';
    }
    const myAPIkey = "7c8f2ef8";
    const url = `https://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Unable to fetch movie data.')
    }
    const data =  await response.json();

    ShowMovieData(data);
    }
    catch(error){
        showErrorMessage("No Moive Found!!");
    }
    finally {
        if(showLoader){
        Loader.style.visibility = 'hidden';
        moviecontainer.style.visibility= 'visible';
        }
    }
}

// function to show movie data on screen
const ShowMovieData = (data) => {
        
    moviecontainer.innerHTML= '';
    moviecontainer.classList.remove('noBackground');

    // use Destructuring assignment to extract properties from data object
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

    const MovieElement = document.createElement('div');
    MovieElement.classList.add('Movie-info');
    MovieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const MovieGenreElement = document.createElement('div');
    MovieGenreElement.classList.add('Movie-Genre');


    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        MovieGenreElement.appendChild(p)
    });

    MovieElement.appendChild(MovieGenreElement);

    MovieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;


//    creating a div for movie poster
const moviePosterElement = document.createElement("div");
moviePosterElement.classList.add('movie-poster');
moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    moviecontainer.appendChild(moviePosterElement);
   moviecontainer.appendChild(MovieElement);                       
}


// function to display error message
const showErrorMessage = (message)=>{
    moviecontainer.innerHTML=`<div class="errormsg">
    <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/no-shows-found.7f82dc78.svg" />
    <h2>${message}</h2>
    </div>`;
    moviecontainer.classList.add('noBackground');
}

// function to handle form submission
const handleformsubmission=(e)=>{
    e.preventDefault();
    inputbox.blur();
    const moivename = inputbox.value.trim();
    if(moivename !== ""){
        getmovieinfo(moivename);
    }else{
        showErrorMessage('Enter movie name to get movie information');
    }

}

// add EventListener to search form
Searchform.addEventListener('submit',handleformsubmission);




