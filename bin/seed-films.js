require('dotenv').config();

require('../configs/db.config')

const mongoose = require('mongoose')

const axios = require('axios');

const MovieModel = require('../models/Movies.model')


let movies = [
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
  imdb: 'tt0173504'
  },
  {title: 'Time of the Comet',
  country: 'Albania',
  imdb: 'tt1092037'
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

  {title: 'The Sleeping Tree',
  country: 'Bahrain',
  imdb: 'tt2746284'
  },
  {title: 'PickUp',
  country: 'Bahrain',
  imdb: 'tt4391954'
  },

  {title: 'Jibon Thekey Neya',
  country: 'Bangladesh',
  imdb: 'tt0989831'
  },
  {title: 'Aynabaji',
  country: 'Bangladesh',
  imdb: 'tt5354160'
  },

  {title: 'Chrissy',
  country: 'Barbados',
  imdb: 'tt3442840'
  },
  {title: 'Payday',
  country: 'Barbados',
  imdb: 'tt2875848'
  },

  {title: 'Vyshe neba',
  country: 'Belarus',
  imdb: 'tt2543010'
  },
  {title: 'Crystal Swan',
  country: 'Belarus',
  imdb: 'tt6835498'
  },

  {title: 'The Broken Circle Breakdown',
  country: 'Belgium',
  imdb: 'tt2024519'
  },
  {title: 'Two Days, One Night',
  country: 'Belgium',
  imdb: 'tt2737050'
  },

  {title: 'The OceanMaker',
  country: 'Belize',
  imdb: 'tt3816040'
  },
  {title: '2012: Curse of the Xtabai',
  country: 'Belize',
  imdb: 'tt2189752'
  },

  {title: 'Barbecue-Pejo',
  country: 'Benin',
  imdb: 'tt0229234'
  },
  {title: 'Africa paradis',
  country: 'Benin',
  imdb: 'tt0899129'
  },

  {title: 'Lunana: A Yak in the Classroom',
  country: 'Bhutan',
  imdb: 'tt10189300'
  },
  {title: 'The Cup',
  country: 'Bhutan',
  imdb: 'tt0201840'
  },

  {title: 'Cuestión de fe',
  country: 'Bolivia',
  imdb: 'tt0139956'
  },
  {title: 'Southern District',
  country: 'Bolivia',
  imdb: 'tt1526317'
  },

  {title: 'Tito and Me',
  country: 'Bosnia and Herzegovina',
  imdb: 'tt0105602'
  },
  {title: `Men Don't Cry`,
  country: 'Bosnia and Herzegovina',
  imdb: 'tt5239558'
  },

  {title: 'The Last Lions',
  country: 'Botswana',
  imdb: 'tt1692928'
  },
  {title: 'A United Kingdom',
  country: 'Botswana',
  imdb: 'tt3387266'
  },

  {title: 'Central Station',
  country: 'Brazil',
  imdb: 'tt0140888'
  },
  {title: 'City of God',
  country: 'Brazil',
  imdb: 'tt0317248'
  },

  {title: 'Yasmine',
  country: 'Brunei',
  imdb: 'tt3320232'
  },
  {title: 'Ada Apa Dengan Rina',
  country: 'Brunei',
  imdb: 'tt2829176'
  },

  {title: 'Opasen char',
  country: 'Bulgaria',
  imdb: 'tt0283524'
  },
  {title: 'Blind Vaysha',
  country: 'Bulgaria',
  imdb: 'tt5559726'
  },

  {title: 'Yaaba',
  country: 'Burkina Faso',
  imdb: 'tt0098684'
  },
  {title: 'Samba Traoré',
  country: 'Burkina Faso',
  imdb: 'tt0108031'
  },

  {title: 'We Will Win Peace',
  country: 'Burundi',
  imdb: 'tt4820138'
  },
  {title: `Gito, l'ingrat`,
  country: 'Burundi',
  imdb: 'tt0104344'
  },

  {title: 'The Last Reel',
  country: 'Cambodia',
  imdb: 'tt2899234'
  },
  {title: 'The Missing Picture',
  country: 'Cambodia',
  imdb: 'tt2852470'
  },

  {title: 'Sisters in Law',
  country: 'Cameroon',
  imdb: 'tt0474361'
  },
  {title: 'Les saignantes',
  country: 'Cameroon',
  imdb: 'tt0471367'
  },

  {title: 'Atanarjuat: The Fast Runner',
  country: 'Canada',
  imdb: 'tt0285441'
  },
  {title: 'Mon Oncle Antoine',
  country: 'Canada',
  imdb: 'tt0067439'
  },

  {title: 'Djon Africa',
  country: 'Cape Verde',
  imdb: 'tt7862998'
  },
  {title: 'Tchindas',
  country: 'Cape Verde',
  imdb: 'tt4461014'
  },

  {title: 'Cirklar',
  country: 'Central African Republic',
  imdb: 'tt5095312'
  },
  {title: 'Elephant Path/Njaia Njoku',
  country: 'Central African Republic',
  imdb: 'tt7382340'
  },

  {title: 'Grigris',
  country: 'Chad',
  imdb: 'tt2852394'
  },
  {title: 'Dry Season',
  country: 'Chad',
  imdb: 'tt0825241'
  },

  {title: 'A Cab for Three',
  country: 'Chile',
  imdb: 'tt0291507'
  },
  {title: 'Machuca',
  country: 'Chile',
  imdb: 'tt0378284'
  },

  {title: 'Oxhide',
  country: 'China',
  imdb: 'tt0453795'
  },
  {title: 'A Touch of Sin',
  country: 'China',
  imdb: 'tt2852400'
  },

  {title: 'Embrace of the Serpent',
  country: 'Colombia',
  imdb: 'tt4285496'
  },
  {title: 'Land and Shade',
  country: 'Colombia',
  imdb: 'tt4663992'
  },

  {title: 'Ashes of Dreams',
  country: 'Comoros',
  imdb: 'tt3147900'
  },
  {title: 'La résidence ylang ylang',
  country: 'Comoros',
  imdb: 'tt2078661'
  },

  {title: 'Bonobos: Back to the Wild',
  country: 'Congo, Democratic Republic of',
  imdb: 'tt4764974'
  },
  {title: 'John of God the Movie',
  country: 'Congo, Democratic Republic of',
  imdb: 'tt3891046'
  },

  {title: 'The Protectors',
  country: 'Congo, Republic of',
  imdb: 'tt6075918'
  },
  {title: 'National Diploma',
  country: 'Congo, Republic of',
  imdb: 'tt3596272'
  },

  {title: 'Follow the Frog',
  country: 'Costa Rica',
  imdb: 'tt2489258'
  },
  {title: 'Red Princesses',
  country: 'Costa Rica',
  imdb: 'tt2396870'
  },

  {title: 'Run',
  country: 'Côte d’Ivoire',
  imdb: 'tt2375473'
  },
  {title: 'Au nom du Christ',
  country: 'Côte d’Ivoire',
  imdb: 'tt0106319'
  },

  {title: 'One Song a Day Takes Mischief Away',
  country: 'Croatia',
  imdb: 'tt0066461'
  },
  {title: 'Rhythm of a Crime',
  country: 'Croatia',
  imdb: 'tt0082998'
  },

  {title: 'Death of a Bureaucrat',
  country: 'Cuba',
  imdb: 'tt0060722'
  },
  {title: 'I Am Cuba',
  country: 'Cuba',
  imdb: 'tt0058604'
  },

  {title: 'The Last Homecoming',
  country: 'Cyprus',
  imdb: 'tt1321487'
  },
  {title: 'Exodus',
  country: 'Cyprus',
  imdb: 'tt1147538'
  },

  {title: 'Cosy Dens',
  country: 'Czech Republic',
  imdb: 'tt0167331'
  },
  {title: 'Empties',
  country: 'Czech Republic',
  imdb: 'tt0809951'
  },

  {title: 'The Celebration',
  country: 'Denmark',
  imdb: 'tt0154420'
  },
  {title: 'Open Hearts',
  country: 'Denmark',
  imdb: 'tt0315543'
  },

  {title: 'Youth',
  country: 'Djibouti',
  imdb: 'tt12167458'
  },
  {title: 'Sounds of Sand',
  country: 'Djibouti',
  imdb: 'tt0889222'
  },

  {title: 'The Seventh Sign',
  country: 'Dominica',
  imdb: 'tt0096073'
  },
  {title: 'Nous près, nous loin',
  country: 'Dominica',
  imdb: 'tt2161449'
  },

  {title: 'Qué León',
  country: 'Dominican Republic',
  imdb: 'tt8170902'
  },
  {title: 'Sand Dollars',
  country: 'Dominican Republic',
  imdb: 'tt3958098'
  },

  {title: 'East Timor: Art in a New Country',
  country: 'East Timor',
  imdb: 'tt7620280'
  },
  {title: 'Balibo',
  country: 'East Timor',
  imdb: 'tt1111876'
  },

  {title: 'The Porcelain Horse',
  country: 'Ecuador',
  imdb: 'tt2047788'
  },
  {title: 'La tigra',
  country: 'Ecuador',
  imdb: 'tt0100783'
  },

  {title: 'Asmaa',
  country: 'Egypt',
  imdb: 'tt1826603'
  },
  {title: 'The Yacoubian Building',
  country: 'Egypt',
  imdb: 'tt0425321'
  },

  {title: 'Innocent Voices',
  country: 'El Salvador',
  imdb: 'tt0387914'
  },
  {title: 'El lugar más pequeño',
  country: 'El Salvador',
  imdb: 'tt1825758'
  },

  {title: 'Anomalías eléctricas',
  country: 'Equatorial Guinea',
  imdb: 'tt7516618'
  },
  {title: 'Where the Road Runs Out',
  country: 'Equatorial Guinea',
  imdb: 'tt2346198'
  },

  {title: 'Heart of Fire',
  country: 'Eritrea',
  imdb: 'tt1169272'
  },
  {title: 'White Hotel',
  country: 'Eritrea',
  imdb: 'tt0118154'
  },

  {title: 'Disco and Atomic War',
  country: 'Estonia',
  imdb: 'tt1421032'
  },
  {title: 'Georgica',
  country: 'Estonia',
  imdb: 'tt0168819'
  },

  {title: 'Running against the Wind',
  country: 'Ethiopia',
  imdb: 'tt9723240'
  },
  {title: 'Lamb',
  country: 'Ethiopia',
  imdb: 'tt4130944'
  },

  {title: `Pear ta ma 'on maf`,
  country: 'Fiji',
  imdb: 'tt0390179'
  },
  {title: 'Avengers of the Reef',
  country: 'Fiji',
  imdb: 'tt0069746'
  },

  {title: 'The Man Without a Past',
  country: 'Finland',
  imdb: 'tt0311519'
  },
  {title: 'Frozen Land',
  country: 'Finland',
  imdb: 'tt0388318'
  },

  {title: 'Amélie',
  country: 'France',
  imdb: 'tt0211915'
  },
  {title: 'Les Misérables',
  country: 'France',
  imdb: 'tt10199590'
  },

  {title: 'The Rhythm of My Life: Ismael Sankara',
  country: 'Gabon',
  imdb: 'tt1853716'
  },
  {title: 'Equator',
  country: 'Gabon',
  imdb: 'tt0086654'
  },

  {title: 'Welcome to the Smiling Coast: Living in the Gambian Ghetto',
  country: 'The Gambia',
  imdb: 'tt4864800'
  },
  {title: 'Kings of the Gambia',
  country: 'The Gambia',
  imdb: 'tt1765869'
  },

  {title: 'Street Days',
  country: 'Georgia',
  imdb: 'tt1543701'
  },
  {title: 'Udzinarta mze',
  country: 'Georgia',
  imdb: 'tt0108429'
  },

  {title: 'Good Bye Lenin!',
  country: 'Germany',
  imdb: 'tt0301357'
  },
  {title: 'Das Boot',
  country: 'Germany',
  imdb: 'tt0082096'
  },

  {title: 'The Burial of Kojo',
  country: 'Ghana',
  imdb: 'tt7497366'
  },
  {title: 'The Perfect Picture',
  country: 'Ghana',
  imdb: 'tt1929410'
  },

  {title: 'Zorba the Greek',
  country: 'Greece',
  imdb: 'tt0057831'
  },
  {title: 'Dogtooth',
  country: 'Greece',
  imdb: 'tt1379182'
  },

  {title: '500 Years Later',
  country: 'Grenada',
  imdb: 'tt0444593'
  },
  {title: 'Great Moments in Aviation',
  country: 'Grenada',
  imdb: 'tt0107042'
  },

  {title: 'Tremors',
  country: 'Guatemala',
  imdb: 'tt7128732'
  },
  {title: 'José',
  country: 'Guatemala',
  imdb: 'tt6933338'
  },

  {title: 'Circus without Borders',
  country: 'Guinea',
  imdb: 'tt2243177'
  },
  {title: 'Allah Tantou',
  country: 'Guinea',
  imdb: 'tt0209907'
  },

  {title: 'Mortu Nega',
  country: 'Guinea-Bissau',
  imdb: 'tt0095658'
  },
  {title: 'My Voice',
  country: 'Guinea-Bissau',
  imdb: 'tt0296099'
  },

  {title: 'Guyana: Cult of the Damned',
  country: 'Guyana',
  imdb: 'tt0080833'
  },
  {title: 'Thunder in Guyana',
  country: 'Guyana',
  imdb: 'tt0439010'
  },

  {title: 'Ayiti mon amour',
  country: 'Haiti',
  imdb: 'tt5974362'
  },
  {title: 'Strange Things',
  country: 'Haiti',
  imdb: 'tt1338552'
  },

  {title: 'Blood, Passion & Coffee',
  country: 'Honduras',
  imdb: 'tt9855170'
  },
  {title: 'El Paletero',
  country: 'Honduras',
  imdb: 'tt5611112'
  },

  {title: 'Son of Saul',
  country: 'Hungary',
  imdb: 'tt3808342'
  },
  {title: 'Satantango',
  country: 'Hungary',
  imdb: 'tt0111341'
  },

  {title: '101 Reykjavík',
  country: 'Iceland',
  imdb: 'tt0237993'
  },
  {title: 'Rams',
  country: 'Iceland',
  imdb: 'tt3296658'
  },

  {title: 'Pariyerum Perumal',
  country: 'India',
  imdb: 'tt8176054'
  },
  {title: 'Gol Maal',
  country: 'India',
  imdb: 'tt0079221'
  },

  {title: 'Aruna & Lidahnya',
  country: 'Indonesia',
  imdb: 'tt8894180'
  },
  {title: 'Laskar Pelangi',
  country: 'Indonesia',
  imdb: 'tt1301264'
  },

  {title: 'The White Balloon',
  country: 'Iran',
  imdb: 'tt0112445'
  },
  {title: 'A Girl Walks Home Alone at Night',
  country: 'Iran',
  imdb: 'tt2326554'
  },

  {title: 'Son of Babylon',
  country: 'Iraq',
  imdb: 'tt1415290'
  },
  {title: 'Bekas',
  country: 'Iraq',
  imdb: 'tt1733105'
  },

  {title: 'Once',
  country: 'Ireland',
  imdb: 'tt0907657'
  },
  {title: 'The Wind that Shakes the Barley',
  country: 'Ireland',
  imdb: 'tt0460989'
  },

  {title: 'Waltz with Bashir',
  country: 'Israel',
  imdb: 'tt1185616'
  },
  {title: 'Zero Motivation',
  country: 'Israel',
  imdb: 'tt3576084'
  },

  {title: 'Cinema Paradiso',
  country: 'Italy',
  imdb: 'tt0095765'
  },
  {title: 'The Great Beauty',
  country: 'Italy',
  imdb: 'tt2358891'
  },

  {title: 'Marley',
  country: 'Jamaica',
  imdb: 'tt1183919'
  },
  {title: 'Yardie',
  country: 'Jamaica',
  imdb: 'tt5862902'
  },

  {title: 'Spirited Away',
  country: 'Japan',
  imdb: 'tt0245429'
  },
  {title: 'Ringu',
  country: 'Japan',
  imdb: 'tt0178868'
  },

  {title: 'Theeb',
  country: 'Jordan',
  imdb: 'tt3170902'
  },
  {title: 'Captain Abu Raed',
  country: 'Jordan',
  imdb: 'tt1017428'
  },

  {title: 'Tulpan',
  country: 'Kazakhstan',
  imdb: 'tt0436854'
  },
  {title: 'The Horse Thieves. Roads of Time',
  country: 'Kazakhstan',
  imdb: 'tt10921188'
  },

  {title: 'Rafiki',
  country: 'Kenya',
  imdb: 'tt8286894'
  },
  {title: 'Nairobi Half Life',
  country: 'Kenya',
  imdb: 'tt2234428'
  },

  {title: `Anote's Ark`,
  country: 'Kiribati',
  imdb: 'tt7689934'
  },
  {title: 'Millennium Island',
  country: 'Kiribati',
  imdb: 'tt6418710'
  },

  {title: 'A Time for Drunken Horses',
  country: 'Kurdistan',
  imdb: 'tt0259072'
  },
  {title: 'Turtles Can Fly',
  country: 'Kurdistan',
  imdb: 'tt0424227'
  },

  {title: 'The Cruel Sea',
  country: 'Kuwait',
  imdb: 'tt0045659'
  },
  {title: 'Amreeka',
  country: 'Kuwait',
  imdb: 'tt1190858'
  },

  {title: 'The Adopted Son',
  country: 'Kyrgyzstan',
  imdb: 'tt0166503'
  },
  {title: 'The Light Thief',
  country: 'Kyrgyzstan',
  imdb: 'tt1646979'
  },

  {title: 'Good Morning, Luang Prabang',
  country: 'Laos',
  imdb: 'tt1192617'
  },
  {title: 'Lost in Laos',
  country: 'Laos',
  imdb: 'tt4800010'
  },

  {title: 'The Chronicles of Melanie',
  country: 'Latvia',
  imdb: 'tt5541426'
  },
  {title: 'Hong Kong Confidential',
  country: 'Latvia',
  imdb: 'tt1572146'
  },

  {title: 'Capernaum',
  country: 'Lebanon',
  imdb: 'tt8267604'
  },
  {title: 'Where Do We Go Now?',
  country: 'Lebanon',
  imdb: 'tt1772424'
  },

  {title: 'The Forgotten Kingdom',
  country: 'Lesotho',
  imdb: 'tt1937504'
  },
  {title: 'Cry Freedom',
  country: 'Lesotho',
  imdb: 'tt0092804'
  },

  {title: 'Out of My Hand',
  country: 'Liberia',
  imdb: 'tt3922764'
  },
  {title: 'Pray the Devil Back to Hell',
  country: 'Liberia',
  imdb: 'tt1202203'
  },

  {title: 'The Random',
  country: 'Libya',
  imdb: 'tt4043620'
  },
  {title: 'Cydamus',
  country: 'Libya',
  imdb: 'tt6288622'
  },

  {title: 'Fearless Journey',
  country: 'Liechtenstein',
  imdb: 'tt6199624'
  },
  {title: 'How Farmers became Bankers',
  country: 'Liechtenstein',
  imdb: 'tt7843072'
  },

  {title: 'Vaikai is Amerikos viesbucio',
  country: 'Lithuania',
  imdb: 'tt0337383'
  },
  {title: 'Adomas nori buti zmogumi',
  country: 'Lithuania',
  imdb: 'tt0297704'
  },

  {title: 'Superjhemp retörns',
  country: 'Luxembourg',
  imdb: 'tt9185526'
  },
  {title: 'Gutland',
  country: 'Luxembourg',
  imdb: 'tt5455410'
  },

  {title: 'Honeyland',
  country: 'Macedonia',
  imdb: 'tt8991268'
  },
  {title: 'God Exists, Her Name Is Petrunya',
  country: 'Macedonia',
  imdb: 'tt8054608'
  },

  {title: 'Makibefo',
  country: 'Madagascar',
  imdb: 'tt0276313'
  },
  {title: 'Island of Lemurs: Madagascar',
  country: 'Madagascar',
  imdb: 'tt3231010'
  },

  {title: 'The Boy Who Harnessed the Wind',
  country: 'Malawi',
  imdb: 'tt7533152'
  },
  {title: 'Buddha in Africa',
  country: 'Malawi',
  imdb: 'tt10323416'
  },

  {title: 'Chinese Eye',
  country: 'Malaysia',
  imdb: 'tt0433692'
  },
  {title: 'The Garden of Evening Mists',
  country: 'Malaysia',
  imdb: 'tt8434152'
  },

  {title: 'The Island President',
  country: 'Maldives',
  imdb: 'tt1990352'
  },
  {title: 'Leena',
  country: 'Maldives',
  imdb: 'tt10833562'
  },

  {title: 'Bamako',
  country: 'Mali',
  imdb: 'tt0814666'
  },
  {title: 'Brightness',
  country: 'Mali',
  imdb: 'tt0094349'
  },

  {title: 'Simshar',
  country: 'Malta',
  imdb: 'tt2521700'
  },
  {title: 'Gagga',
  country: 'Malta',
  imdb: 'tt0981001'
  },

  {title: 'Ña noniep',
  country: 'Marshall Islands',
  imdb: 'tt1399621'
  },
  {title: 'Jilel: The Calling of the Shell',
  country: 'Marshall Islands',
  imdb: 'tt4004738'
  },

  {title: 'Timbuktu',
  country: 'Mauritania',
  imdb: 'tt3409392'
  },
  {title: `Fatima, l'Algérienne de Dakar`,
  country: 'Mauritania',
  imdb: 'tt1330992'
  },

  {title: 'tt12139700',
  country: 'Mauritius',
  imdb: 'tt12139700'
  },
  {title: 'The Children of Troumaron',
  country: 'Mauritius',
  imdb: 'tt2363259'
  },

  {title: 'Macario',
  country: 'Mexico',
  imdb: 'tt0054042'
  },
  {title: 'Y Tu Mamá También',
  country: 'Mexico',
  imdb: 'tt0245574'
  },

  {title: 'Reigo, the Deep-Sea Monster vs. the Battleship Yamato',
  country: 'Micronesia, Federated States of',
  imdb: 'tt0456627'
  },
  {title: 'Island Soldier',
  country: 'Micronesia, Federated States of',
  imdb: 'tt5630484'
  },

  {title: 'What a Wonderful World',
  country: 'Moldova',
  imdb: 'tt3858500'
  },
  {title: 'Baptism',
  country: 'Moldova',
  imdb: 'tt11541780'
  },

  {title: 'Grace of Monaco',
  country: 'Monaco',
  imdb: 'tt2095649'
  },
  {title: 'Heartbreaker',
  country: 'Monaco',
  imdb: 'tt1465487'
  },

  {title: 'The Story of the Weeping Camel',
  country: 'Mongolia',
  imdb: 'tt0373861'
  },
  {title: 'The Cave of the Yellow Dog',
  country: 'Mongolia',
  imdb: 'tt0432325'
  },

  {title: 'The Beauty of Vice',
  country: 'Montenegro',
  imdb: 'tt0091398'
  },
  {title: 'Gorcilo',
  country: 'Montenegro',
  imdb: 'tt4307948'
  },

  {title: 'Horses of God',
  country: 'Morocco',
  imdb: 'tt2369047'
  },
  {title: 'Casanegra',
  country: 'Morocco',
  imdb: 'tt1364478'
  },

  {title: 'Redemption',
  country: 'Mozambique',
  imdb: 'tt8870574'
  },
  {title: 'Yvone Kane',
  country: 'Mozambique',
  imdb: 'tt3451254'
  },

  {title: 'The Road to Mandalay',
  country: 'Myanmar',
  imdb: 'tt5974402'
  },
  {title: 'The Only Mom',
  country: 'Myanmar',
  imdb: 'tt10309670'
  },

  {title: 'Baxu and the Giants',
  country: 'Namibia',
  imdb: 'tt10407902'
  },
  {title: 'Dead River',
  country: 'Namibia',
  imdb: 'tt2355118'
  },

  {title: 'Pacific Banana',
  country: 'Nauru',
  imdb: 'tt0082875'
  },
  {title: 'Nauru, an Island Adrift',
  country: 'Nauru',
  imdb: 'tt1385944'
  },

  {title: 'The Black Hen',
  country: 'Nepal',
  imdb: 'tt4991660'
  },
  {title: 'Kabaddi',
  country: 'Nepal',
  imdb: 'tt3696800'
  },

  {title: 'Black Book',
  country: 'Netherlands',
  imdb: 'tt0389557'
  },
  {title: 'All Stars',
  country: 'Netherlands',
  imdb: 'tt0118588'
  },

  {title: 'The Piano',
  country: 'New Zealand',
  imdb: 'tt0107822'
  },
  {title: 'Once Were Warriors',
  country: 'New Zealand',
  imdb: 'tt0110729'
  },

  {title: 'Kill the Messenger',
  country: 'Nicaragua',
  imdb: 'tt1216491'
  },
  {title: 'Sandino',
  country: 'Nicaragua',
  imdb: 'tt0100546'
  },

  {title: 'The Wedding Ring',
  country: 'Niger',
  imdb: 'tt5974454'
  },
  {title: 'Zerzura',
  country: 'Niger',
  imdb: 'tt7626082'
  },

  {title: 'The Wedding Party',
  country: 'Nigeria',
  imdb: 'tt5978822'
  },
  {title: 'Chief Daddy',
  country: 'Nigeria',
  imdb: 'tt9652322'
  },

  {title: 'The Other Side of the Mountain',
  country: 'North Korea',
  imdb: 'tt2825806'
  },
  {title: 'The Flower Girl',
  country: 'North Korea',
  imdb: 'tt0168937'
  },

  {title: 'Oslo, August 31st',
  country: 'Norway',
  imdb: 'tt1736633'
  },
  {title: 'Elling',
  country: 'Norway',
  imdb: 'tt0279064'
  },

  {title: 'Zayana',
  country: 'Oman',
  imdb: 'tt7657746'
  },
  {title: 'Randall Dunn feat. Zola Jesus: A True Home',
  country: 'Oman',
  imdb: 'tt9643212'
  },

  {title: 'Waar',
  country: 'Pakistan',
  imdb: 'tt1821700'
  },
  {title: 'Bol',
  country: 'Pakistan',
  imdb: 'tt1891757'
  },

  {title: 'The Last Reef 3D',
  country: 'Palau',
  imdb: 'tt2070717'
  },
  {title: 'Journey 2: The Mysterious Island',
  country: 'Palau',
  imdb: 'tt1397514'
  },

  {title: `Laila's Birthday`,
  country: 'Palestine',
  imdb: 'tt1281951'
  },
  {title: 'Private',
  country: 'Palestine',
  imdb: 'tt0420090'
  },

  {title: 'Salsipuedes',
  country: 'Panama',
  imdb: 'tt5637418'
  },
  {title: 'Weed',
  country: 'Panama',
  imdb: 'tt7525458'
  },

  {title: 'Mr. Pip',
  country: 'Papua New Guinea',
  imdb: 'tt1485749'
  },
  {title: 'Ileksen',
  country: 'Papua New Guinea',
  imdb: 'tt0079328'
  },

  {title: 'The Heiresses',
  country: 'Paraguay',
  imdb: 'tt7875464'
  },
  {title: 'Leal, solo hay una forma de vivir',
  country: 'Paraguay',
  imdb: 'tt7606620'
  },

  {title: 'Retablo',
  country: 'Peru',
  imdb: 'tt7761590'
  },
  {title: 'Undertow',
  country: 'Peru',
  imdb: 'tt1368491'
  },

  {title: 'The Master',
  country: 'Philippines',
  imdb: 'tt1560747'
  },
  {title: 'Through Night and Day',
  country: 'Philippines',
  imdb: 'tt9279666'
  },

  {title: 'Three Colors: White',
  country: 'Poland',
  imdb: 'tt0111507'
  },
  {title: 'Ida',
  country: 'Poland',
  imdb: 'tt2718492'
  },

  {title: 'Jaime',
  country: 'Portugal',
  imdb: 'tt0120790'
  },
  {title: 'Zona J',
  country: 'Portugal',
  imdb: 'tt0164987'
  },

  {title: 'Team Qatar',
  country: 'Qatar',
  imdb: 'tt1396225'
  },
  {title: 'The Challenge',
  country: 'Qatar',
  imdb: 'tt5943708'
  },

  {title: 'The Oak',
  country: 'Romania',
  imdb: 'tt0103969'
  },
  {title: 'Asphalt Tango',
  country: 'Romania',
  imdb: 'tt0115577'
  },

  {title: 'Come and See',
  country: 'Russia',
  imdb: 'tt0091251'
  },
  {title: 'Sisters',
  country: 'Russia',
  imdb: 'tt0284492'
  },

  {title: 'Munyurangabo',
  country: 'Rwanda',
  imdb: 'tt1031947'
  },
  {title: 'Grey Matter',
  country: 'Rwanda',
  imdb: 'tt1890465'
  },

  {title: 'A Rose Between Thorns',
  country: 'Saint Kitts and Nevis',
  imdb: 'tt5768350'
  },
  {title: 'Hot Resort',
  country: 'Saint Kitts and Nevis',
  imdb: 'tt0089305'
  },

  {title: 'Firepower',
  country: 'Saint Lucia',
  imdb: 'tt0079153'
  },
  {title: 'Superman II',
  country: 'Saint Lucia',
  imdb: 'tt0081573'
  },

  {title: 'Black Doll',
  country: 'Saint Vincent and the Grenadines',
  imdb: 'tt8765850'
  },
  {title: 'Voodoo Man',
  country: 'Saint Vincent and the Grenadines',
  imdb: 'tt5833986'
  },

  {title: 'Whale Rider',
  country: 'Samoa',
  imdb: 'tt0298228'
  },
  {title: 'One Thousand Ropes',
  country: 'Samoa',
  imdb: 'tt5371832'
  },

  {title: 'Il Mago Mancini (Mancini, the motorcycle wizard)',
  country: 'San Marino',
  imdb: 'tt5902542'
  },
  {title: 'The Last Alchemist',
  country: 'San Marino',
  imdb: 'tt2585238'
  },

  {title: 'Little Fruit from the Equator',
  country: 'Sao Tome and Principe',
  imdb: 'tt0412751'
  },
  {title: 'The Lost Wave',
  country: 'Sao Tome and Principe',
  imdb: 'tt1010322'
  },


  {title: 'Wadjda',
  country: 'Saudi Arabia',
  imdb: 'tt2258858'
  },
  {title: 'The Perfect Candidate',
  country: 'Saudi Arabia',
  imdb: 'tt6971114'
  },


  {title: 'Touki-Bouki',
  country: 'Senegal',
  imdb: 'tt0070820'
  },
  {title: 'Atlantique',
  country: 'Senegal',
  imdb: 'tt10199586'
  },


  {title: `Who's Singin' Over There?`,
  country: 'Serbia',
  imdb: 'tt0076276'
  },
  {title: 'The Marathon Family',
  country: 'Serbia',
  imdb: 'tt0084302'
  },


  {title: 'Kristel',
  country: 'Seychelles',
  imdb: 'tt6171164'
  },
  {title: 'Bolot Feray',
  country: 'Seychelles',
  imdb: 'tt9468550'
  },


  {title: 'Paradise Island',
  country: 'Sierra Leone',
  imdb: 'tt4110430'
  },
  {title: 'The Language You Cry In',
  country: 'Sierra Leone',
  imdb: 'tt0157919'
  },


  {title: 'Crazy Rich Asians',
  country: 'Singapore',
  imdb: 'tt3104988'
  },
  {title: 'Bad Match',
  country: 'Singapore',
  imdb: 'tt5990066'
  },

  {title: 'The Copper Tower',
  country: 'Slovakia',
  imdb: 'tt0171518'
  },
  {title: 'The Garden',
  country: 'Slovakia',
  imdb: 'tt0115040'
  },

  {title: 'Kekec',
  country: 'Slovenia',
  imdb: 'tt0043703'
  },
  {title: 'Outsider',
  country: 'Slovenia',
  imdb: 'tt0117273'
  },

  {title: 'Policing The Pacific',
  country: 'Solomon Islands',
  imdb: 'tt0832316'
  },
  {title: 'Liborio',
  country: 'Solomon Islands',
  imdb: 'tt6898474'
  },

  {title: 'The Lost Diamond',
  country: 'Somalia',
  imdb: 'tt4663196'
  },
  {title: 'Somalia: The Forgotten Story',
  country: 'Somalia',
  imdb: 'tt6212268'
  },

  {title: 'Tsotsi',
  country: 'South Africa',
  imdb: 'tt0468565'
  },
  {title: 'Sarafina!',
  country: 'South Africa',
  imdb: 'tt0105316'
  },

  {title: 'Parasite',
  country: 'South Korea',
  imdb: 'tt6751668'
  },
  {title: 'Train to Busan',
  country: 'South Korea',
  imdb: 'tt5700672'
  },

  {title: 'Machine Gun Preacher',
  country: 'South Sudan',
  imdb: 'tt1586752'
  },
  {title: 'Lost Boys of Sudan',
  country: 'South Sudan',
  imdb: 'tt0383475'
  },

  {title: 'Amores perros',
  country: 'Spain',
  imdb: 'tt0245712'
  },
  {title: `Pan's Labyrinth`,
  country: 'Spain',
  imdb: 'tt0457430'
  },

  {title: 'The Last Phase',
  country: 'Sri Lanka',
  imdb: 'tt3376620'
  },
  {title: 'May 20th',
  country: 'Sri Lanka',
  imdb: 'tt4619782'
  },

  {title: 'You Will Die at Twenty',
  country: 'Sudan',
  imdb: 'tt9686154'
  },
  {title: 'Khartoum Offside',
  country: 'Sudan',
  imdb: 'tt9221304'
  },

  {title: 'Wiren',
  country: 'Suriname',
  imdb: 'tt10217930'
  },
  {title: 'One People',
  country: 'Suriname',
  imdb: 'tt0075411'
  },

  {title: 'Never a Neverland',
  country: 'Swaziland',
  imdb: 'tt1790788'
  },
  {title: 'Liyana',
  country: 'Swaziland',
  imdb: 'tt6977442'
  },

  {title: 'Fanny and Alexander',
  country: 'Sweden',
  imdb: 'tt0083922'
  },
  {title: 'Pippi Longstocking',
  country: 'Sweden',
  imdb: 'tt0366905'
  },

  {title: 'Vitus',
  country: 'Switzerland',
  imdb: 'tt0478829'
  },
  {title: 'Alpine Fire',
  country: 'Switzerland',
  imdb: 'tt0093235'
  },

  {title: 'For Sama',
  country: 'Syria',
  imdb: 'tt9617456'
  },
  {title: 'Al-lail',
  country: 'Syria',
  imdb: 'tt0104672'
  },

  {title: 'Crouching Tiger, Hidden Dragon',
  country: 'Taiwan',
  imdb: 'tt0190332'
  },
  {title: 'Yi yi',
  country: 'Taiwan',
  imdb: 'tt0244316'
  },

  {title: 'Luna Papa',
  country: 'Tajikistan',
  imdb: 'tt0170259'
  },
  {title: 'Kosh ba kosh',
  country: 'Tajikistan',
  imdb: 'tt0107340'
  },

  {title: 'Homecoming',
  country: 'Tanzania',
  imdb: 'tt5116212'
  },
  {title: 'Kwanini',
  country: 'Tanzania',
  imdb: 'tt1411245'
  },

  {title: 'A Prayer before Dawn',
  country: 'Thailand',
  imdb: 'tt4080956'
  },
  {title: 'The Pool',
  country: 'Thailand',
  imdb: 'tt9128686'
  },

  {title: 'En attendant le soleil',
  country: 'Togo',
  imdb: 'tt4744838'
  },
  {title: 'Atlantic Produce Togo S.A.',
  country: 'Togo',
  imdb: 'tt2368594'
  },

  {title: 'When the Man Went South',
  country: 'Tonga',
  imdb: 'tt3026908'
  },
  {title: 'Leitis in Waiting',
  country: 'Tonga',
  imdb: 'tt8394526'
  },

  {title: 'Moving Parts',
  country: 'Trinidad and Tobago',
  imdb: 'tt5327850'
  },
  {title: 'Hero',
  country: 'Trinidad and Tobago',
  imdb: 'tt4218012'
  },

  {title: 'The String',
  country: 'Tunisia',
  imdb: 'tt1302559'
  },
  {title: 'Arab Blues',
  country: 'Tunisia',
  imdb: 'tt9648886'
  },

  {title: 'Mustang',
  country: 'Turkey',
  imdb: 'tt3966404'
  },
  {title: 'A Touch of Spice',
  country: 'Turkey',
  imdb: 'tt0378897'
  },

  {title: 'Karakum',
  country: 'Turkmenistan',
  imdb: 'tt0107306'
  },
  {title: 'Daughter-in-Law',
  country: 'Turkmenistan',
  imdb: 'tt0365552'
  },

  {title: 'ThuleTuvalu',
  country: 'Tuvalu',
  imdb: 'tt3438802'
  },
  {title: 'Greedy Lying Bastards',
  country: 'Tuvalu',
  imdb: 'tt2069784'
  },

  {title: 'Who Killed Captain Alex?',
  country: 'Uganda',
  imdb: 'tt1813757'
  },
  {title: 'Bad Black',
  country: 'Uganda',
  imdb: 'tt6044414'
  },

  {title: 'The Diamond Arm',
  country: 'Ukraine',
  imdb: 'tt0062759'
  },
  {title: 'Homeward',
  country: 'Ukraine',
  imdb: 'tt9431740'
  },

  {title: 'Djinn',
  country: 'United Arab Emirates',
  imdb: 'tt1770672'
  },
  {title: 'Bilal: A New Breed of Hero',
  country: 'United Arab Emirates',
  imdb: 'tt3576728'
  },

  {title: 'Trainspotting',
  country: 'United Kingdom',
  imdb: 'tt0117951'
  },
  {title: 'Notting Hill',
  country: 'United Kingdom',
  imdb: 'tt0125439'
  },

  {title: 'Some Like It Hot',
  country: 'United States of America',
  imdb: 'tt0053291'
  },
  {title: 'Selma',
  country: 'United States of America',
  imdb: 'tt1020072'
  },

  {title: '25 Watts',
  country: 'Uruguay',
  imdb: 'tt0280381'
  },
  {title: 'Whisky',
  country: 'Uruguay',
  imdb: 'tt0331370'
  },

  {title: 'Hot Bread',
  country: 'Uzbekistan',
  imdb: 'tt11011540'
  },
  {title: 'Scorpion',
  country: 'Uzbekistan',
  imdb: 'tt9346816'
  },

  {title: 'Tanna',
  country: 'Vanuatu',
  imdb: 'tt4239726'
  },
  {title: 'Yakel 3D',
  country: 'Vanuatu',
  imdb: 'tt1852974'
  },

  {title: 'The Two Popes',
  country: 'Vatican City',
  imdb: 'tt8404614'
  },
  {title: 'Angels & Demons',
  country: 'Vatican City',
  imdb: 'tt0808151'
  },

  {title: 'Hermano',
  country: 'Venezuela',
  imdb: 'tt1588358'
  },
  {title: 'Maroa',
  country: 'Venezuela',
  imdb: 'tt0478702'
  },

  {title: 'Three Seasons',
  country: 'Vietnam',
  imdb: 'tt0138874'
  },
  {title: 'The Sapphires',
  country: 'Vietnam',
  imdb: 'tt1673697'
  },

  {title: '10 Days Before the Wedding',
  country: 'Yemen',
  imdb: 'tt8866064'
  },
  {title: 'I Am Nojoom, Age 10 and Divorced',
  country: 'Yemen',
  imdb: 'tt4313646'
  },

  {title: 'Mwansa the Great',
  country: 'Zambia',
  imdb: 'tt1756632'
  },
  {title: 'I Am Not A Witch',
  country: 'Zambia',
  imdb: 'tt6213284'
  },

  {title: 'Mugabe and the White African',
  country: 'Zimbabwe',
  imdb: 'tt1437235'
  },
  {title: 'Neria',
  country: 'Zimbabwe',
  imdb: 'tt0107670'
  },
]


movies.forEach((movie) => {
  axios.get(`http://www.omdbapi.com/?i=${movie.imdb}&apikey=${process.env.OMDBKEY}`)
  .then((result) => {
    movie.description = result.data.Plot;
    if (result.data.Poster === 'N/A') {
      movie.img = 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    }
    else {
      movie.img = result.data.Poster;
    }
    if (result.data.Ratings[0] === undefined) {
      movie.rating = 'No rating'
    }
    else {
      movie.rating = result.data.Ratings[0].Value;
    }
    MovieModel.create(movie)
    })
    .then(() => {
      console.log('inserted!')
    })
    .catch((err) => {
      console.log(err)
    })
    .catch((err) => {
      console.log(err)
    })
  })


const CountryModel = require('../models/Country.model')

let countries = [];
let movie1;
let movie2;

movies.forEach(movie => {
  if (movies.indexOf(movie)%2 === 0) {
    movie1 = movie.title;
  }
  else {
    movie2 = movie.title
    countries.push({name: movie.country, movies: [movie1, movie2]});
  }
})

CountryModel.create(countries);
