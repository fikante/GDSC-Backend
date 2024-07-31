document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const movieDetails = document.getElementById("movieDetails");
    const loadingIndicator = document.getElementById("loadingIndicator");

    const apiKey = '839dcac9'; 

    searchButton.addEventListener("click", function() {
        const query = searchInput.value.trim();
        if (query) {
            fetchMovies(query);
        }
    });

    async function fetchMovies(query) {
        try {
            loadingIndicator.style.display = 'block';
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
            const data = await response.json();
            loadingIndicator.style.display = 'none';

            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                searchResults.innerHTML = '<p>No results found.</p>';
            }
        } catch (error) {
            loadingIndicator.style.display = 'none';
            searchResults.innerHTML = '<p>Error fetching data. Please try again.</p>';
        }
    }

    function displaySearchResults(movies) {
        searchResults.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';
            movieElement.textContent = movie.Title;
            movieElement.addEventListener('click', () => fetchMovieDetails(movie.imdbID));
            searchResults.appendChild(movieElement);
        });
    }

    async function fetchMovieDetails(movieId) {
        try {
            loadingIndicator.style.display = 'block';
            const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
            const data = await response.json();
            loadingIndicator.style.display = 'none';

            if (data.Response === "True") {
                displayMovieDetails(data);
            } else {
                movieDetails.innerHTML = '<p>Movie details not found.</p>';
            }
        } catch (error) {
            loadingIndicator.style.display = 'none';
            movieDetails.innerHTML = '<p>Error fetching movie details. Please try again.</p>';
        }
    }

    function displayMovieDetails(movie) {
        movieDetails.innerHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Release Date:</strong> ${movie.Released}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <img src="${movie.Poster}" alt="Movie Poster">
        `;
    }
});
