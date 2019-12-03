const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const apps = require('./playstore-Data.js');

app.get('/apps', (req, res) => {
  const { search = ' ', sort, genres } = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must be one of Rating or App');
    }
  }

  if (genres) {
    if (
      ![
        'Action',
        'Puzzle',
        'Strategy',
        'Casual',
        'Arcade',
        'Card',
        'Free'
      ].includes(genres)
    ) {
      return res
        .status(400)
        .send(
          'Acceptable genres are: Action, Puzzle, Strategy, Casual, Arcade, Card'
        );
    }
  }

  let results = apps.filter(app =>
    app.App.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  endResults = results.filter(app =>
    app.Genres.toLowerCase().includes(genres.toLowerCase())
  );

  res.json(endResults);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
