// Get elements
const elMovieList = selectElement(".movie__list");
const elMovieForm = selectElement(".movie__form");
const elSearchInput = selectElement(".movie__search", elMovieForm);
const elMoviePrevButton = selectElement(".prev__btn");
const elMovieNextButton = selectElement(".next__btn");

// Get templates
const elMovieListTemplate = selectElement("#movie__list-template").content;

const API_KEY = "43b159dc";
let search = "guardians";
let pagination = 1;
let totalResults = 0;
const filmsNumberOnePage = 10;
const firstPage = 1;
let lastPage = 0;

function renderMovie(array, node) {
  node.innerHTML = null;

  array.forEach((element) => {
    const movieTemplate = elMovieListTemplate.cloneNode(true);

    movieTemplate.querySelector(".movie__poster").src = element.Poster;
    movieTemplate.querySelector(".movie__title").textContent = element.Title;
    movieTemplate.querySelector(".movie__year").textContent = element.Year;

    node.appendChild(movieTemplate);
  });
}

async function getMovie() {
  try {
    const response = await fetch(
      "https://omdbapi.com/?i=tt3896198&apikey=" +
        API_KEY +
        "&s=" +
        search +
        "&page=" +
        pagination
    );
    const data = await response.json();
    const movieArray = data?.Search;
    totalResults = data?.totalResults;
    lastPage = Math.ceil(totalResults / filmsNumberOnePage);

    if (movieArray?.length > 0) {
      renderMovie(movieArray, elMovieList);
    }

    if (pagination <= firstPage) {
      elMoviePrevButton.disabled = true;
    } else {
      elMoviePrevButton.disabled = false;
    }

    if (pagination >= lastPage) {
      elMovieNextButton.disabled = true;
    } else {
      elMovieNextButton.disabled = false;
    }
  } catch (err) {
    elMovieList.textContent = "Xatolik yuz berdi";
  } finally {
    console.log("Final");
  }
}

getMovie();

elMovieForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  search = elSearchInput.value.trim();
  elSearchInput.value = null;

  getMovie();
});

elMoviePrevButton.addEventListener("click", (evt) => {
  pagination--;

  getMovie();
});

elMovieNextButton.addEventListener("click", (evt) => {
  pagination++;

  getMovie();
});
