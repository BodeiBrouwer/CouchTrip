require('../configs/db.config')
const mongoose = require('mongoose');
const BooksModel = require('../models/Books.model');
const app = require('../app');

let books = [
  {title: "A Thousand Splendid Suns",
  author: "Khaled Hosseini",
  country: "Afghanistan"
  },
  {title: "A Thousand Rooms of Dream and Fear",
  author:"Atiq Rahimi",
  country: "Afghanistan"
  },
  {title: "The Palace of Dreams",
  author: "Ismail Kadare",
  country: "Albania"
  },
  {title: "Sworn Virgin",
  author: "Elvira Dones",
  country: "Albania"
  },
  {title: "The Lovers of Algeria",
  author: "Anouar Benmalek",
  country: "Algeria"
  },
  {title: "The Attack",
  author: "Yasmina Khadra",
  country: "Algeria"
  },
  {title: "The Teacher of Cheops",
  author: "Albert Salvadó",
  country: "Andorra"
  },
  {title: "",
  author: "",
  country: "Andorra"
  },
  {title: "The Return of the Water Spirit",
  author: "Pepetela",
  country: "Angola"
  },
  {title: "The Book of Chameleons",
  author: "Jose Eduardo Agualusa",
  country: "Angola"
  },
  {title: "Lucy",
  author: "Jamaica Kincaid",
  country: "Antigua and Barbuda"
  },
  {title: "Loving this Man",
  author: "Althea Prince",
  country: "Antigua and Barbuda"
  },
  {title: "How I Became a Nun",
  author: "César Aira",
  country: "Argentina"
  },
  {title: "Musicians and Watchmakers",
  author: "Alicia Steimberg",
  country: "Argentina"
  },
  {title: "Bringing Ararat",
  author: "Armand Inezian",
  country: "Armenia"
  },
  {title: "Armenian Golgotha",
  author: "Grigoris Balakian",
  country: "Armenia"
  },
  {title: "The Songlines",
  author: "Bruce Chatwin",
  country: "Australia "
  },
  {title: "Cloudstreet ",
  author: "Tim Winton",
  country: "Australia "
  },
  {title: "Frozen Time",
  author: "Anna Kim",
  country: "Austria "
  },
  {title: "The Torch in my Ear",
  author: "Elias Canetti ",
  country: "Austria "
  },
  {title: "Magnolia",
  author: "Gioulzar Akhmedova",
  country: "Azerbaijan"
  },
  {title: "Ali and Nino",
  author: "Qurban Saeed",
  country: "Azerbaijan"
  },
  {title: "God’s Angry Babies",
  author: "Ian Strachan",
  country: "Bahamas"
  },
  {title: "Thine is the Kingdom",
  author: "Garth Buckner",
  country: "Bahamas"
  },
  {title: "Quixotiq ",
  author: "Ali Al Saeed",
  country: "Bahrain "
  },
  {title: "Yummah",
  author: "Sarah A Al Sahfei",
  country: "Bahrain "
  },
  {title: "Shame",
  author: "Taslima Nasrin",
  country: "Bangladesh"
  },
  {title: "The Laughter of a Slave",
  author: "Shawkat Osman",
  country: "Bangladesh"
  },
  {title: "Redemption in Indigo",
  author: "Karen Lord",
  country: "Barbados"
  },
  {title: "Flickering Shadows",
  author: "Agymah Kamau",
  country: "Barbados"
  },
  {title: "The Sun City of Dreams",
  author: "Artur Klinov",
  country: "Belarus"
  },
  {title: "Paranoia",
  author: "Viktar Martsinovich",
  country: "Belarus"
  },
  {title: "The Angel Maker ",
  author: "Stefan Brijs",
  country: "Belgium"
  },
  {title: "The Misfortunates",
  author: "Dimitri Verhulst",
  country: "Belgium"
  },
  {title: "On Heroes",
  author: "Zoila Ellis",
  country: "Belize"
  },
  {title: "",
  author: "",
  country: "Belize"
  },
  {title: "Stories We Tell Each Other",
  author: "Rashidah Ismaili Abubakr",
  country: "Benin"
  },
  {title: "",
  author: "",
  country: "Benin"
  },
  {title: "The Circle of Karma ",
  author: "Kunzang Choden",
  country: "Bhutan"
  },
  {title: "The Hero with a Thousand Eyes",
  author: "Karma Ura",
  country: "Bhutan"
  },
  {title: "Sweet Blood",
  author: "Giovanna Rivero",
  country: "Bolivia"
  },
  {title: "Our Dead World",
  author: "Liliana Colanzi",
  country: "Bolivia"
  },
  {title: "Zlata’s Diary",
  author: "Zlata Filipovic",
  country: "Bosnia and Herzegovina "
  },
  {title: "The Bridge on the Drina",
  author: "Ivo Andric",
  country: "Bosnia and Herzegovina "
  },
  {title: "The Lion Children",
  author: "Angus, Maisie and Travers McNeice",
  country: "Botswana"
  },
  {title: "A Question of Power ",
  author: "Bessie Head",
  country: "Botswana"
  },
  {title: "An Invincible Memory",
  author: "João Ubaldo Ribeiro",
  country: "Brazil"
  },
  {title: "The Double Death of Quincas Water-Bray",
  author: "Jorge Amado",
  country: "Brazil" 
  },
  {title: "Four Kings",
  author: "Christopher Sun",
  country: "Brunei"
  },
  {title: "The Forlorn Adventure",
  author: "Amir Falique",
  country: "Brunei"
  },
  {title: "The Tongue Set Free",
  author: "Elias Canetti",
  country: "Bulgaria"
  },
  {title: "Is there Anybody to Love You? ",
  author: "Kalin Terziyski",
  country: "Bulgaria"
  },
  {title: "The Parachute Drop",
  author: "Nobert Zongo",
  country: "Burkina Faso"
  },
  {title: "",
  author: "",
  country: "Burkina Faso" 
  },
  {title: "Weep Not, Refugee",
  author: "Marie-Therese Toyi",
  country: "Burundi"
  },
  {title: "Baho!",
  author: "Roland Rugero",
  country: "Burundi"
  },
  {title: "Three Wildernesses",
  author: "U Sam Oeur",
  country: "Cambodia"
  },
  {title: "Unpolished Gem",
  author: "Alice Pung",
  country: "Cambodia"
  },
  {title: "Mission to Kala",
  author: "Mongo Beti",
  country: "Cameroon"
  },
  {title: "Mystique: a collection of lake myths",
  author: "Beatrice Fri Bime",
  country: "Cameroon"
  },
  {title: "Our Daily Bread",
  author: "Lauren B Davis",
  country: "Canada" 
  },
  {title: "Green Grass, Running Water",
  author: "Thomas King",
  country: "Canada"
  },
  {title: "The Last Will & Testament of Senhor da Silva Araújo",
  author: "Germano Almeida",
  country: "Cape Verde"
  },
  {title: "The Madwoman of Serrano",
  author: "Dina Salústio",
  country: "Cape Verde"
  },
  {title: "Dada’s Travels from Ouadda to Bangui",
  author: "Pierre Makombo Bamboté",
  country: "Central African Republic"
  },
  {title: "African Tales: Folklore of the Central African Republic",
  author: "Polly Strong",
  country: "Central African Republic"
  },
  {title: "Told by Starlight in Chad",
  author: "Joseph Brahim Seid",
  country: "Chad"
  },
  {title: "",
  author: "",
  country: "Chad" 
  },
  {title: "The Savage Detectives",
  author: "Roberto Bolano",
  country: "Chile"
  },
  {title: "The House of the Spirits",
  author: "Isabel Allende",
  country: "Chile"
  },
  {title: "Stick Out Your Tongue",
  author: "Ma Jian",
  country: "China"
  },
  {title: "Dream of the Red Chamber",
  author: "Cao Xuequin",
  country: "China"
  },
  {title: "The Armies",
  author: "Evelio Rosero",
  country: "Colombia"
  },
  {title: "One Hundred Years of Solitude",
  author: "Gabriel García Márquez",
  country: "Colombia"
  },
  {title: "The Kafir of Karthala",
  author: "Mohammed Toihiri",
  country: "Comoros" 
  },
  {title: "A Girl Called Eel",
  author: "Ali Zamir",
  country: "Comoros"
  },
  {title: "Full Circle",
  author: "Frederick Yamusangie",
  country: "Congo, Democratic Republic of"
  },
  {title: "Little Boys Come from the Stars",
  author: "Emmanuel Dongala",
  country: "Congo, Republic of"
  },
  {title: "The Antipeople",
  author: "Sony Lab’ou Tansi",
  country: "Congo, Republic of"
  },
  {title: "Cadence of the Moon",
  author: "Oscar Nunez Olivas",
  country: "Costa Rica"
  },
  {title: "The Madwoman of Gandoca",
  author: "Anacristina Rossi",
  country: "Costa Rica"
  },
  {title: "Climbié",
  author: "Bernard Dadié",
  country: "Côte d’Ivoire" 
  },
  {title: "Allah is not Obliged",
  author: "Ahmadou Kourouma",
  country: "Côte d’Ivoire"
  },
  {title: "On the Edge of Reason",
  author: "Miroslav Krleža",
  country: "Croatia"
  },
  {title: "The Ministry of Pain",
  author: "Dubravka Ugrĕsic",
  country: "Croatia"
  },
  {title: "Dancing to Almendra",
  author: "Mayra Montero",
  country: "Cuba"
  },
  {title: "One Hundred Bottles",
  author: "Ena Lucia Portela",
  country: "Cuba"
  },
  {title: "Famagusta: the Story of the City",
  author: "Andreas Coutas",
  country: "Cyprus"
  },
  {title: "A Watermelon, a Fish and a Bible",
  author: "Christy Lefteri",
  country: "Cyprus" 
  },
  {title: "Too Loud a Solitude",
  author: "Bohumil Hrabal",
  country: "Czech Republic"
  },
  {title: "The House on Prague Street",
  author: "Hana Demetz",
  country: "Czech Republic"
  },
  {title: "Dog Head",
  author: "Morten Ramsland",
  country: "Denmark"
  },
  {title: "The Exception",
  author: "Christian Jungersen",
  country: "Denmark"
  },
  {title: "In the United States of Africa",
  author: "Abdourahman Waberi",
  country: "Djibouti"
  },
  {title: "Passage of Tears",
  author: "Abdourahman Waberi",
  country: "Djibouti"
  },
  {title: "The Orchid House",
  author: "Phyllis Shand Allfrey",
  country: "Dominica" 
  },
  {title: "Black and White Sands",
  author: "Elma Napier",
  country: "Dominica"
  },
  {title: "Neguri’s Secret",
  author: "Arambilet",
  country: "Dominican Republic"
  },
  {title: "When they Loved the Communal Land",
  author: "Pedro Mir",
  country: "Dominican Republic"
  },
  {title: "The Crossing",
  author: "Luis Cardoso",
  country: "East Timor"
  },
  {title: "Huasipungo",
  author: "Jorge Icaza",
  country: "Ecuador"
  },
  {title: "The Map of Love",
  author: "Ahdaf Soueif",
  country: "Egypt"
  },
  {title: "Stealth",
  author: "Sonallah Ibrahim",
  country: "Egypt" 
  },
  {title: "Senselessness",
  author: "Horacio Castellanos Moya",
  country: "El Salvador"
  },
  {title: "By Night the Mountain Burns",
  author: "Juan Tomás Ávila Laurel",
  country: "Equatorial Guinea"
  },
  {title: "Shadows of your Black Memory",
  author: "Donato Ndongo",
  country: "Equatorial Guinea"
  },
  {title: "Heart of Fire",
  author: "Senait Mehari",
  country: "Eritrea"
  },
  {title: "The Consequences of Love",
  author: "Sulaiman Addonia",
  country: "Eritrea"
  },
  {title: "Treading Air",
  author: "Jaan Kross",
  country: "Estonia"
  },
  {title: "The Beauty of History",
  author: "Viivi Luik",
  country: "Estonia"
  },
  {title: "Cutting for Stone",
  author: "Abraham Verghese",
  country: "Ethiopia"
  },
  {title: "Children of the Revolution",
  author: "Dinaw Mengestu",
  country: "Ethiopia"
  },
  {title: "Kava in the Blood",
  author: "Peter Thomson",
  country: "Fiji"
  },
  {title: "Tales of the Tikongs",
  author: "Epeli Hau’ofa",
  country: "Fiji"
  },
  {title: "The Year of the Hare",
  author: "Arto Paasilinna",
  country: "Finland"
  },
  {title: "Troll: A Love Story",
  author: "Johanna Sinisalo",
  country: "Finland"
  },
  {title: "My Phantom Husband",
  author: "Marie Darrieussecq",
  country: "France"
  },
  {title: "The French Art of War",
  author: "Alexis Jenni",
  country: "France"
  },
  {title: "Mema",
  author: "Daniel Mengara",
  country: "Gabon"
  },
  {title: "Reading the Ceiling",
  author: "Dayo Forster",
  country: "The Gambia"
  },
  {title: "Folk Tales and Fables from The Gambia",
  author: "Dembo Fanta Bojang & Sukai Mbye Bojang",
  country: "The Gambia"
  },
  {title: "One More Year",
  author: "Sana Krasikov",
  country: "Georgia"
  },
  {title: "Contemporary Georgian Fiction",
  author: "Elizabeth Heighway",
  country: "Georgia"
  },
  {title: "The Tin Drum",
  author: "Günter Grass",
  country: "Germany"
  },
  {title: "Bridge of the Golden Horn",
  author: "Emine Sevgi Özdamar",
  country: "Germany"
  },
  {title: "The Beautyful Ones Are Not Yet Born",
  author: "Ayi Kwei Armah",
  country: "Ghana"
  },
  {title: "Amanfi’s Gold",
  author: "Jo de Graft Hanson",
  country: "Ghana"
  },
  {title: "The Black Book of Bile",
  author: "Kostas Hatziantoniou",
  country: "Greece"
  },
  {title: "Kassandra and the Wolf",
  author: "Margarita Karapanou",
  country: "Greece"
  },
  {title: "The Ladies are Upstairs",
  author: "Merle Collins",
  country: "Grenada"
  },
  {title: "The President",
  author: "Miguel Angel Asturias",
  country: "Guatemala"
  },
  {title: "The Polish Boxer",
  author: "Eduardo Halfon",
  country: "Guatemala"
  },
  {title: "The Radiance of the King",
  author: "Camara Laye",
  country: "Guinea"
  },
  {title: "Unity and Struggle",
  author: "Amilcar Cabral",
  country: "Guinea-Bissau"
  },
  {title: "The Ultimate Tragedy",
  author: "Abdulai Silá",
  country: "Guinea-Bissau"
  },
  {title: "Buxton Spice",
  author: "Oonya Kempadoo",
  country: "Guyana"
  },
  {title: "Children of Heroes",
  author: "Lyonel Trouillot",
  country: "Haiti"
  },
  {title: "The Farming of the Bones",
  author: "Edwidge Danticat",
  country: "Haiti"
  },
  {title: "Points of Light ",
  author: "Guillermo Yuscaran",
  country: "Honduras"
  },
  {title: "Cipotes",
  author: "Ramón Amaya Amador",
  country: "Honduras"
  },
  {title: "Embers",
  author: "Sándor Márai",
  country: "Hungary"
  },
  {title: "Be Faithful Unto Death",
  author: "Zsigmond Móricz",
  country: "Hungary"
  },
  {title: "Jar City",
  author: "Arnaldur Indridason",
  country: "Iceland"
  },
  {title: "Stone Tree",
  author: "Gyrðir Eliasson",
  country: "Iceland"
  },
  {title: "A Fine Balance",
  author: "Rohinton Mistry",
  country: "India"
  },
  {title: "A Free Man",
  author: "Aman Sathi",
  country: "India"
  },
  {title: "This Earth of Mankind",
  author: "Pramoedya Ananta Toer",
  country: "Indonesia"
  },
  {title: "Supernova",
  author: "Dewi Lestari",
  country: "Indonesia"
  },
  {title: "Parpin Flowers",
  author: "Akbar Golrang",
  country: "Iran"
  },
  {title: "Touba and the Meaning of Night",
  author: "Shahrnush Parsipur",
  country: "Iran"
  },
  {title: "The Tobacco Keeper",
  author: "Ali Bader",
  country: "Iraq"
  },
  {title: "The Long Way Back",
  author: "Fuad al-Takarli",
  country: "Iraq"
  },
  {title: "Castle Rackrent",
  author: "",
  country: "Ireland"
  },
  {title: "",
  author: "",
  country: "Ireland"
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
  {title: "",
  author: "",
  country: ""
  },
]