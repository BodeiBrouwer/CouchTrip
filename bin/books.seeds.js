require('dotenv').config();
require('../configs/db.config')
const mongoose = require('mongoose');
const BooksModel = require('../models/Books.model');
const axios = require('axios');
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
  {title: "Stories We Tell Each Other",
  author: "Rashidah Ismaili Abubakr",
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
  {title: "The Secret Scripture",
  author: "Sebastian Barry",
  country: "Ireland"
  },
  {title: "Falling Out of Time",
  author: "David Grossman",
  country: "Israel"
  },
  {title: "A Tale of Love and Darkness",
  author: "Amos Oz",
  country: "Israel"
  },
  {title: "Can You Hear Me?",
  author: "Elena Varvello",
  country: "Italy"
  },
  {title: "Gomorrah",
  author: "Roberto Saviano",
  country: "Italy"
  },
  {title: "The Pirate’s Daughter",
  author: "Margaret Cezair-Thompson",
  country: "Jamaica"
  },
  {title: "Paint the Town Red",
  author: "Brian Meeks",
  country: "Jamaica"
  },
  {title: "1Q84",
  author: "Haruki Murakami",
  country: "Japan"
  },
  {title: "Hotel Iris",
  author: "Yoko Ogawa",
  country: "Japan"
  },
  {title: "Time of White Horses",
  author: "Ibrahim Nasrallah",
  country: "Jordan"
  },
  {title: "Cities of Salt",
  author: "Abdulrahman Munif",
  country: "Jordan"
  },
  {title: "The Day the World Collapsed",
  author: "Rollan Seisenbayev",
  country: "Kazakhstan"
  },
  {title: "The Silent Steppe",
  author: "Mukhamet Shayakhmetov",
  country: "Kazakhstan"
  },
  {title: "One Day I Will Write About This Place",
  author: "Binyavanga Wainaina",
  country: "Kenya"
  },
  {title: "Wizard of the Crow",
  author: "Ngũgĩ wa Thiong’o",
  country: "Kenya"
  },
  {title: "Waa in Storms",
  author: "Teweiariki Teaero",
  country: "Kiribati"
  },
  {title: "The Man in Blue Pyjamas",
  author: "Jalal Barzanji",
  country: "Kurdistan"
  },
  {title: "Pearling in the Arabian Gulf",
  author: "Saif Marzooq al-Shamlan",
  country: "Kuwait"
  },
  {title: "Women in Kuwait",
  author: "Haya al-Mughni",
  country: "Kuwait"
  },
  {title: "Jamilia",
  author: "Chinghiz Aitmatov",
  country: "Kyrgyzstan"
  },
  {title: "Cranes Fly Early",
  author: "Chinghiz Aitmatov",
  country: "Kyrgyzstan"
  },
  {title: "Mother’s Beloved",
  author: "Outhine Bounyavong",
  country: "Laos"
  },
  {title: "The Free World",
  author: "David Bezmozgis",
  country: "Latvia"
  },
  {title: "A Woman in Amber",
  author: "Agate Nesaule",
  country: "Latvia"
  },
  {title: "I Killed Scheherazade",
  author: "Joumana Haddad",
  country: "Lebanon"
  },
  {title: "June Rain",
  author: "Jabbour Douhaiy",
  country: "Lebanon"
  },
  {title: "Chaka",
  author: "Thomas Mofolo",
  country: "Lesotho"
  },
  {title: "Blanket Boy’s Moon",
  author: "AS Mopeli-Paulus",
  country: "Lesotho"
  },
  {title: "The House at Sugar Beach",
  author: "Helene Cooper",
  country: "Liberia"
  },
  {title: "This Child Will Be Great",
  author: " Ellen Johnson Sirleaf",
  country: "Liberia"
  },
  {title: "In the Country of Men",
  author: "Hisham Matar",
  country: "Libya"
  },
  {title: "Anubis",
  author: "Ibrahim Al-Khoni",
  country: "Libya"
  },
  {title: "The Noble Forger",
  author: "CC Bergius",
  country: "Liechtenstein"
  },
  {title: "Vilnius Poker",
  author: "Ricardas Gavelis",
  country: "Lithuania"
  },
  {title: "Hour of the Wolf",
  author: "Andrius Tapinas",
  country: "Lithuania"
  },
  {title: "Amateur",
  author: "Jean Back",
  country: "Luxembourg"
  },
  {title: "Minute Stories",
  author: "Robi Gottlieb-Cahen",
  country: "Luxembourg"
  },
  {title: "Scribbles",
  author: "Rumena Bužarovska",
  country: "Macedonia"
  },
  {title: "Conversation with Spinoza",
  author: "Goce Smilevski",
  country: "Macedonia"
  },
  {title: "Voices from Madagascar",
  author: "Jacques Bourgeacq and Liliane Ramarosoa",
  country: "Madagascar"
  },
  {title: "Beyond the Rice Fields",
  author: "Naivo",
  country: "Madagascar"
  },
  {title: "The Jive Talker",
  author: "Samson Kambalu",
  country: "Malawi"
  },
  {title: "No Easy Task",
  author: "Aubrey Kachingwe",
  country: "Malawi"
  },
  {title: "Ripples and Other Stories",
  author: "Shih-Li Kow",
  country: "Malaysia"
  },
  {title: "This End of The Rainbow",
  author: "Adibah Amin",
  country: "Malaysia"
  },
  {title: "Dhon Hiyala and Ali Fulhu",
  author: "Abdullah Sadiq",
  country: "Maldives"
  },
  {title: "Bound to Violence",
  author: "Yambo Ouloguem",
  country: "Mali"
  },
  {title: "The Strange Destiny of Wangrin",
  author: "Amadou Hampâté Bâ",
  country: "Mali"
  },
  {title: "Happy Weekend",
  author: "Immanuel Mifsud",
  country: "Malta"
  },
  {title: "My Century",
  author: "Herbert Ganado",
  country: "Malta"
  },
  {title: "Marshall Islands Legends and Stories",
  author: "Ed Daniel Kelin",
  country: "Marshall Islands"
  },
  {title: "For the Good of Mankind",
  author: "Jack Niedenthal",
  country: "Marshall Islands"
  },
  {title: "Angels of Mauritania and the Curse of the Language",
  author: "Mohamed Bouya Bamba",
  country: "Mauritania"
  },
  {title: "The Desert and the Drum",
  author: "Mbarek Ould Beyrouk",
  country: "Mauritania"
  },
  {title: "Watch Them Go Down",
  author: "Anand Mulloo",
  country: "Mauritius"
  },
  {title: "Benares",
  author: "Barlen Pyamootoo",
  country: "Mauritius"
  },
  {title: "The Labyrinth of Solitude",
  author: "Octavio Paz",
  country: "Mexico"
  },
  {title: "Like Water for Chocolate",
  author: "Laura Esquivel",
  country: "Mexico"
  },
  {title: "The Book of Luelen",
  author: "Luelen Bernart",
  country: "Micronesia, Federated States of"
  },
  {title: "Moldavian Autumn",
  author: "Ion Drutse",
  country: "Moldova"
  },
  {title: "The Good Life Elsewhere",
  author: "Vladimir Lorchenkov",
  country: "Moldova"
  },
  {title: "Grace Kelly: Princesse du Cinema",
  author: "Richard and Danae Projetti",
  country: "Monaco"
  },
  {title: "The Blue Sky",
  author: "Galsan Tschinag",
  country: "Mongolia"
  },
  {title: "The Mountain Wreath",
  author: "Petar II Petrović-Njegoš",
  country: "Montenegro"
  },
  {title: "A Lullaby for No Man’s Wolf",
  author: "Xenia Popovich",
  country: "Montenegro"
  },
  {title: "The Sacred Night",
  author: "Tahar Ben Jelloun",
  country: "Morocco"
  },
  {title: "The Arch and the Butterfly",
  author: "Mohammed Achaari",
  country: "Morocco"
  },
  {title: "The Sleepwalking Land",
  author: "Mia Couto",
  country: "Mozambique"
  },
  {title: "The First Wife",
  author: "Paulina Chiziane",
  country: "Mozambique"
  },
  {title: "Smile as they Bow",
  author: "Nu Nu Yi Inwa",
  country: "Myanmar"
  },
  {title: "Troubled Waters",
  author: "Joseph Diescho",
  country: "Namibia"
  },
  {title: "The Purple Violet of Oshaantu",
  author: "Neshani Andreas",
  country: "Namibia"
  },
  {title: "Legends, Traditions and Tales of Nauru",
  author: "Timothy Detudamo",
  country: "Nauru"
  },
  {title: "Stories from Nauru",
  author: "Ben Bam Solomon et al",
  country: "Nauru"
  },
  {title: "Buddha’s Orphans",
  author: "Samrat Upadhyay",
  country: "Nepal"
  },
  {title: "The Lazy Conman and Other Stories",
  author: "Ajit Baral",
  country: "Nepal"
  },
  {title: "Turkish Delight",
  author: "Jan Wolkers",
  country: "Netherlands"
  },
  {title: "The Evenings",
  author: "Gerard Reve",
  country: "Netherlands"
  },
  {title: "Singularity",
  author: "Charlotte Grimshaw",
  country: "New Zealand"
  },
  {title: "The Bone People",
  author: "Keri Hulme",
  country: "New Zealand"
  },
  {title: "Infinity in the Palm of her Hand",
  author: "Gioconda Belli",
  country: "Nicaragua"
  },
  {title: "The Epic of Askia Mohammed",
  author: "Nouhou Malio",
  country: "Niger"
  },
  {title: "Half of a Yellow Sun",
  author: "Chimamanda Ngozi Adichie",
  country: "Nigeria"
  },
  {title: "Things Fall Apart",
  author: "Chinua Achebe",
  country: "Nigeria"
  },
  {title: "My Life and Faith",
  author: "Ri In Mo",
  country: "North Korea"
  },
  {title: "My Struggle",
  author: "Karl Ove Knausgaard",
  country: "Norway"
  },
  {title: "Out Stealing Horses",
  author: "Per Petterson",
  country: "Norway"
  },
  {title: "Smiles of Saints",
  author: "Ibrahim Farghali",
  country: "Oman"
  },
  {title: "My Grandmother’s Stories",
  author: "Khadija bint Alawi Al-Dhahab",
  country: "Oman"
  },
  {title: "Moth Smoke",
  author: "Mohsin Hamid",
  country: "Pakistan"
  },
  {title: "Meatless Days",
  author: "Sara Suleri",
  country: "Pakistan"
  },
  {title: "Spirits’ Tides",
  author: "Susan Kloulechad",
  country: "Palau"
  },
  {title: "Tasting the Sky: A Palestinian Childhood",
  author: "Ibtisam Barakat",
  country: "Palestine"
  },
  {title: "Wild Thorns",
  author: "Sahar Khalifeh",
  country: "Palestine"
  },
  {title: "The Golden Horse",
  author: "Juan David Morgan",
  country: "Panama"
  },
  {title: "Maiba",
  author: "Russell Soaba",
  country: "Papua New Guinea"
  },
  {title: "Two Seasons",
  author: "Bernard Narokobi",
  country: "Papua New Guinea"
  },
  {title: "I, the Supreme",
  author: "Augusto Roa Bastos",
  country: "Paraguay"
  },
  {title: "Death in the Andes",
  author: "Mario Vargas Llosa",
  country: "Peru"
  },
  {title: "The Storyteller",
  author: "Mario Vargas Llosa",
  country: "Peru"
  },
  {title: "Illustrado",
  author: "Miguel Syjuco",
  country: "Philippines"
  },
  {title: "Dogeaters",
  author: "Jessica Hagedorn",
  country: "Philippines"
  },
  {title: "Primeval and Other Times",
  author: "Olga Tokarczuk",
  country: "Poland"
  },
  {title: "A Grain of Truth",
  author: "Zygmunt Miloszewski",
  country: "Poland"
  },
  {title: "The Mandarin and Other Stories",
  author: "Eca de Queiroz",
  country: "Portugal"
  },
  {title: "Blindness",
  author: "José Saramago",
  country: "Portugal"
  },
  {title: "Victory over Abu Derya",
  author: "Mohammed Ali",
  country: "Qatar"
  },
  {title: "The Corsair",
  author: "Abdul Aziz Al Mahmoud",
  country: "Qatar"
  },
  {title: "The Passport",
  author: "Herta Müller",
  country: "Romania"
  },
  {title: "The Baiut Alley Lads",
  author: "Filip and Matei Florian",
  country: "Romania"
  },
  {title: "The Hottest Dishes of the Tartar Cuisine",
  author: "Alina Bronsky",
  country: "Russia"
  },
  {title: "A Hero of Our Time",
  author: "Mikhail Lermontov",
  country: "Russia"
  },
  {title: "We Wish to Inform You that Tomorrow We Will Be Killed with our Families",
  author: "Philip Gourevitch",
  country: "Rwanda"
  },
  {title: "Into the Quick of Life",
  author: "Jean Hatzfeld",
  country: "Rwanda"
  },
  {title: "Only God Can Make a Tree",
  author: "Bertram Roach",
  country: "Saint Kitts and Nevis"
  },
  {title: "Omeros",
  author: "Derek Walcott",
  country: "Saint Lucia"
  },
  {title: "A Room on the Hill",
  author: "Garth St Omer",
  country: "Saint Lucia"
  },
  {title: "Spirits in the Dark",
  author: "H Nigel Thomas",
  country: "Saint Vincent and the Grenadines"
  },
  {title: "The Moon is Following Me",
  author: "Cecil Browne",
  country: "Saint Vincent and the Grenadines"
  },
  {title: "Love and Money",
  author: "Misa Telefoni Retzlaff",
  country: "Samoa"
  },
  {title: "Telesa: The Covenant Keeper",
  author: "Lani Wendt Young",
  country: "Samoa"
  },
  {title: "The Republic of San Marino",
  author: "Giuseppe Rossi",
  country: "San Marino"
  },
  {title: "The Shepherd’s House",
  author: "Olinda Beja",
  country: "Sao Tome and Principe"
  },
  {title: "Girls of Riyadh",
  author: "Rajaa Al-Sanea",
  country: "Saudi Arabia"
  },
  {title: "Endings",
  author: "Abdul Rahman Munif",
  country: "Saudi Arabia"
  },
  {title: "So Long a Letter",
  author: "Mariama Bâ",
  country: "Senegal"
  },
  {title: "Doomi Golo: The Hidden Notebooks",
  author: "Boubacar Boris Diop",
  country: "Senegal"
  },
  {title: "A Novel About London; Migrations",
  author: "Milos Crnjanski",
  country: "Serbia"
  },
  {title: "Dictionary of the Khazars",
  author: "Milorad Pavic",
  country: "Serbia"
  },
  {title: "Voices",
  author: "Glynn Burridge",
  country: "Seychelles"
  },
  {title: "Shark for Sale",
  author: "William Travis",
  country: "Seychelles"
  },
  {title: "Fistful of Colours",
  author: "Su-Chen Christine Lim",
  country: "Singapore"
  },
  {title: "Rivers of Babylon",
  author: "Peter Pišťanek",
  country: "Slovakia"
  },
  {title: "Tale’s Cemetery Book",
  author: "Daniela Kapitánová Samko",
  country: "Slovakia"
  },
  {title: "Heaven in a Blackberry Bush",
  author: "Nataša Kramberger",
  country: "Slovenia"
  },
  {title: "You do Understand",
  author: "Andrej Blatnik",
  country: "Slovenia"
  },
  {title: "The Alternative",
  author: "John Saunana",
  country: "Solomon Islands"
  },
  {title: "Sweet and Sour Milk",
  author: "Nuruddin Farah",
  country: "Somalia"
  },
  {title: "African Delights",
  author: "Siphiwo Mahala",
  country: "South Africa"
  },
  {title: "Cry, the Beloved Country",
  author: "Alan Paton",
  country: "South Africa"
  },
  {title: "The Guest",
  author: "Hwang Sok-yong",
  country: "South Korea"
  },
  {title: "A House on the Road",
  author: "Lee Hye-Kyung",
  country: "South Korea"
  },
  {title: "To Forgive is Divine Not Human",
  author: "Julia Duany",
  country: "South Sudan"
  },
  {title: "The Shadow of the Wind",
  author: "Carlos Ruiz Zafón",
  country: "Spain"
  },
  {title: "Exiled from Almost Everywhere",
  author: "Juan Goytisolo",
  country: "Spain"
  },
  {title: "Reef",
  author: "Romesh Gunesekera",
  country: "Sri Lanka"
  },
  {title: "Chinaman",
  author: "Shehan Karunatilaka",
  country: "Sri Lanka"
  },
  {title: "The Grub Hunter",
  author: "Amir Tag Elsir",
  country: "Sudan"
  },
  {title: "The Palm House",
  author: "Tarek Eltayeb",
  country: "Sudan"
  },
  {title: "The Cost of Sugar",
  author: "Cynthia Mcleod",
  country: "Suriname"
  },
  {title: "Weeding the Flowerbeds",
  author: "Sarah Mkhonza",
  country: "Swaziland"
  },
  {title: "Chronicler of the Winds",
  author: "Henning Mankell",
  country: "Sweden"
  },
  {title: "The Hundred-Year-Old Man Who Climbed Out of the Window and Disappeared",
  author: "Jonas Jonasson",
  country: "Sweden"
  },
  {title: "The Pledge",
  author: "Friedrich Dürrenmatt",
  country: "Switzerland"
  },
  {title: "A Happy Man",
  author: "Hansjörg Schertenlieb",
  country: "Switzerland"
  },
  {title: "Sarmada",
  author: "Fadi Azzam",
  country: "Syria"
  },
  {title: "Breaking Knees",
  author: "Zakaria Tamer",
  country: "Syria"
  },
  {title: "Crystal Boys",
  author: "Pai Hsien-yung",
  country: "Taiwan"
  },
  {title: "Hurramabad",
  author: "Andrei Volos",
  country: "Tajikistan"
  },
  {title: "The Sands of Oxus: Boyhood Reminiscences of Sadriddin Aini",
  author: "Sadriddin Aini",
  country: "Tajikistan"
  },
  {title: "Desertion",
  author: "Abdulrazak Gurnah",
  country: "Tanzania"
  },
  {title: "Blood on Our Land",
  author: "Ismael Mbise",
  country: "Tanzania"
  },
  {title: "No Way Out",
  author: "Chart Korbjitti",
  country: "Thailand"
  },
  {title: "A Child of the Northeast",
  author: "Kampoon Boontawee",
  country: "Thailand"
  },
  {title: "An African in Greenland",
  author: "Tété-Michel Kpomassie",
  country: "Togo"
  },
  {title: "A Providence of War",
  author: "Joshua Taumoefolau",
  country: "Tonga"
  },
  {title: "Tales of the Tikongs",
  author: "Epeli Hau’ofa",
  country: "Tonga"
  },
  {title: "A House for Mr Biswas",
  author: "VS Naipaul",
  country: "Trinidad and Tobago"
  },
  {title: "Near Open Water",
  author: "Keith Jardim",
  country: "Trinidad and Tobago"
  },
  {title: "The Scents of Marie-Claire",
  author: "Habib Selmi",
  country: "Tunisia"
  },
  {title: "Talismano",
  author: "Abdelwahab Meddeb",
  country: "Tunisia"
  },
  {title: "Snow",
  author: "Orhan Pamuk",
  country: "Turkey"
  },
  {title: "Dear Shameless Death",
  author: "Latife Tekin",
  country: "Turkey"
  },
  {title: "Unknown Sands",
  author: "John Kropf",
  country: "Turkmenistan"
  },
  {title: "Cobra",
  author: "Ak Welsapar",
  country: "Turkmenistan"
  },
  {title: "Tuvalu: A history",
  author: "Various",
  country: "Tuvalu"
  },
  {title: "Abyssinian Chronicles",
  author: "Moses Isegawa",
  country: "Uganda"
  },
  {title: "Tropical Fish: Stories Out Of Entebbe",
  author: "Doreen Baingan",
  country: "Uganda"
  },
  {title: "Death and the Penguin",
  author: "Andrey Kurkov",
  country: "Ukraine"
  },
  {title: "Wave of Terror",
  author: "Theodore Odrach",
  country: "Ukraine"
  },
  {title: "Gold Ring",
  author: "Qais Sedki",
  country: "United Arab Emirates"
  },
  {title: "The Sand Fish",
  author: "Maha Gargash",
  country: "United Arab Emirates"
  },
  {title: "The Remains of the Day",
  author: "Kazuo Ishiguro",
  country: "United Kingdom"
  },
  {title: "To the Edge of the Sea",
  author: "Christina Hall",
  country: "United Kingdom"
  },
  {title: "American Gods",
  author: "Neil Gaiman",
  country: "United States of America"
  },
  {title: "The Time of New Weather",
  author: "Sean Murphy",
  country: "United States of America"
  },
  {title: "The Shipyard",
  author: "Juan Carlos Onetti",
  country: "Uruguay"
  },
  {title: "Lands of Memory",
  author: "Felisberto Hernández",
  country: "Uruguay"
  },
  {title: "The Railway",
  author: "Hamid Ismailov",
  country: "Uzbekistan"
  },
  {title: "The Dancer from Khiva: One Muslim Woman’s Quest for Freedom",
  author: "Bibish",
  country: "Uzbekistan"
  },
  {title: "Laef Blong Mi: From Village to Nation",
  author: "Sethy Regenvau",
  country: "Vanuatu"
  },
  {title: "Shroud of Secrecy of Gone with the Wind in the Vatican",
  author: "Luigi Marinello & The Millenari",
  country: "Vatican City "
  },
  {title: "The Sickness",
  author: "Alberto Barrera Tyszka",
  country: "Venezuela"
  },
  {title: "Falke",
  author: "Federico Vegas",
  country: "Venezuela"
  },
  {title: "The Joker",
  author: "Phan Hon Nhien",
  country: "Vietnam"
  },
  {title: "The Sorrow of War",
  author: "Bao Ninh",
  country: "Vietnam"
  },
  {title: "A Land without Jasmine",
  author: "Wajdi al-Ahdal",
  country: "Yemen"
  },
  {title: "The Hostage",
  author: "Zayd Mutee’ Dammaj",
  country: "Yemen"
  },
  {title: "Baking Cakes in Kigali",
  author: "Gaile Parkin ",
  country: "Zambia"
  },
  {title: "A Cowrie of Hope",
  author: "Binwell Sinyangwe",
  country: "Zambia"
  },
  {title: "An Elegy for Easterly",
  author: "Petinah Gappah",
  country: "Zimbabwe"
  },
  {title: "Nervous Conditions",
  author: "Tsitsi Dangarembga",
  country: "Zimbabwe"
  }
]

let newBooks = [
  {title: "A Thousand Splendid Suns",
  author: "Khaled Hosseini",
  country: "Afghanistan"
  }
]

newBooks.forEach((book, i) => {
  let myTimeout = []
  myTimeout[i]= setTimeout(() => {

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book.title}+inauthor:${book.author}&key=${process.env.GOOGLE_API_KEY}`)
    .then((result) => {
      let bookObj = {
      description: result.data.items.volumeInfo.description,
      img: result.data.items.volumeInfo.imageLinks ? result.data.items.volumeInfo.imageLinks.thumbnail: '',
      rating: result.data.items.volumeInfo.averageRating
    }
      BooksModel.findOneAndUpdate({title: book.title}, {$set: bookObj})
        .then(() => {
          console.log('data updated')
        })
    })
    .catch((err) => {
      console.log('error', err)
    })
    clearTimeout(myTimeout[i])
  }, 2000)
})


// BooksModel.create(books)
//   .then(() => {
//     console.log('Books are inserted')
//         mongoose.connection.close()
//             .then(() => {
//                 console.log('Connection is closed')
//             })
//   })
//   .catch((err) => {
//     console.log('wow, that did not go well', err)
// });
