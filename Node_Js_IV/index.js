const express = require('express');
const app = express();
const port = 3000;

const movies = [
    {
        id: 1,
        title: 'Inception',
        releaseDate: '2010-07-16',
        genre: 'Sci-Fi',
        plotSummary: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        director: 'Christopher Nolan',
        actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
        posterUrl: 'https://example.com/inception.jpg'
    },
    {
        id: 2,
        title: 'The Matrix',
        releaseDate: '1999-03-31',
        genre: 'Action',
        plotSummary: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        director: 'Lana Wachowski, Lilly Wachowski',
        actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
        posterUrl: 'https://example.com/matrix.jpg'
    },
    // We can add more movies here...
];

app.get('/search', (req, res) => {
    const { s } = req.query;

    if (!s) {
        return res.status(400).json({ error: 'Missing search term' });
    }

    const searchTerm = s.toLowerCase();
    const results = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));

    if (results.length === 0) {
        return res.status(404).json({ error: 'No movies found' });
    }

    res.json(results);
});

app.get('/movie/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === parseInt(id));

    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
