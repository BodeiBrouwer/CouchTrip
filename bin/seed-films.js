require('dotenv').config();

const mongoose = require('mongoose')

const axios = require('axios');

// const FilmModel = require('../models/Movie.model')


let films = [
  {title: 'Osama',
  country: 'Afghanistan',
  imdb: 'tt0368913'
  },
  {title: 'Black Kite',
  country: 'Afghanistan',
  imdb: 'tt6098208'
  },

  {title: 'Zonja nga qyteti',
  country: 'Albania',
  imdb: 'tt1092037'
  },
  {title: 'Time of the Comet',
  country: 'Albania',
  imdb: 'tt0173504'
  },

  {title: 'Until the Birds Return',
  country: 'Algeria',
  imdb: 'tt6226610'
  },
  {title: 'The battle of Algiers',
  country: 'Algeria',
  imdb: 'tt0058946'
  },

  {title: 'Impacto',
  country: 'Andorra',
  imdb: 'tt6079382'
  },
  {title: 'Le Blizzard',
  country: 'Andorra',
  imdb: 'tt6426966'
  },

  {title: 'Nzinga, Queen of Angola',
  country: 'Angola',
  imdb: 'tt3463004'
  },
  {title: 'Death Metal Angola',
  country: 'Angola',
  imdb: 'tt2118609'
  },

  {title: 'Vanishing Sail',
  country: 'Antigua and Barbuda',
  imdb: 'tt4698760'
  },
  {title: 'The Sweetest Mango',
  country: 'Antigua and Barbuda',
  imdb: 'tt0489568'
  },

  {title: 'Nine Queens',
  country: 'Argentina',
  imdb: 'tt0247586'
  },
  {title: 'The Official Story',
  country: 'Argentina',
  imdb: 'tt0089276'
  },

  {title: 'A Bride from the North',
  country: 'Armenia',
  imdb: 'tt0359384'
  },
  {title: 'Taniel',
  country: 'Armenia',
  imdb: 'tt7603760'
  },

  {title: 'Rabbit-Proof Fence',
  country: 'Australia',
  imdb: 'tt0252444'
  },
  {title: `Muriel's Wedding`,
  country: 'Australia',
  imdb: 'tt0110598'
  },

  {title: 'Funny Games',
  country: 'Austria',
  imdb: 'tt0119167'
  },
  {title: `Mother's Day`,
  country: 'Austria',
  imdb: 'tt0107625'
  },

  {title: 'Ali and Nino',
  country: 'Azerbaijan',
  imdb: 'tt4072326'
  },
  {title: 'Nabat',
  country: 'Azerbaijan',
  imdb: 'tt3977898'
  },

  {title: 'Float',
  country: 'The Bahamas',
  imdb: 'tt0929747'
  },
  {title: 'Eleutheran Adventure',
  country: 'The Bahamas',
  imdb: 'tt1024842'
  },




  {title: 'The Cruel Sea',
  country: 'Kuwait',
  imdb: 'tt0045659'
  },
  {title: 'Amreeka',
  country: 'Kuwait',
  imdb: 'tt1190858'
  },
]


films.forEach(film => {
  axios.get(`http://www.omdbapi.com/?i=${film.imdb}&apikey=${process.env.OMDBKEY}`)
  .then((result) => {
    film.description = result.data.Plot;
    film.picture = result.data.Poster;
    film.rating = result.data.Ratings[0].Value;
  })
})



// MovieModel.create(films)
//     .then(() => {
//         mongoose.connection.close()
//           .then(() => {
//             console.log('Added films')
//           })
//     })