
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Authorized countries list (exactly 22 countries)
const AUTHORIZED_COUNTRIES = [
  'Poland', 'Hungary', 'Romania', 'Canada', 'Ireland', 'Germany', 'Portugal', 
  'Belgium', 'Netherlands', 'Luxembourg', 'Switzerland', 'Austria', 'Denmark', 
  'Norway', 'Sweden', 'Greece', 'Finland', 'Iceland', 'France', 'United Kingdom', 
  'Turkey', 'Thailand'
];

// Complete hotel data for exactly 66 hotels (3 per country)
const hotelData = [
  // Poland (3 hotels)
  {
    name: "Central Hotel Downtown Warsaw",
    description: "A modern hotel in the heart of Warsaw's historic district, perfect for business travelers and tourists exploring Poland's capital city.",
    country: "Poland",
    city: "Warsaw",
    address: "Krakowskie Przedmieście 13, Warsaw, Poland 00-071",
    postal_code: "00-071",
    latitude: 52.2297,
    longitude: 21.0122,
    price_per_month: 1800,
    property_type: "Hotel",
    style: "Classic",
    ideal_guests: "Business travelers and cultural enthusiasts",
    atmosphere: "Professional yet welcoming",
    perfect_location: "Historic city center with easy access to major attractions"
  },
  {
    name: "Plaza Hotel Downtown Wroclaw",
    description: "A boutique hotel in Wroclaw's charming old town square, offering modern amenities in a historic setting.",
    country: "Poland",
    city: "Wroclaw",
    address: "Rynek 42, Wroclaw, Poland 50-116",
    postal_code: "50-116",
    latitude: 51.1079,
    longitude: 17.0385,
    price_per_month: 1600,
    property_type: "Boutique Hotel",
    style: "Modern",
    ideal_guests: "Couples and leisure travelers",
    atmosphere: "Intimate and sophisticated",
    perfect_location: "Market Square with medieval architecture"
  },
  {
    name: "Krakow Heritage Hotel",
    description: "An elegant hotel near Krakow's Main Market Square, blending traditional Polish hospitality with modern comfort.",
    country: "Poland",
    city: "Krakow",
    address: "ul. Floriańska 25, Krakow, Poland 31-019",
    postal_code: "31-019",
    latitude: 50.0647,
    longitude: 19.9450,
    price_per_month: 1700,
    property_type: "Hotel",
    style: "Classic Elegant",
    ideal_guests: "History lovers and cultural tourists",
    atmosphere: "Traditional and refined",
    perfect_location: "Steps from the Main Market Square"
  },

  // Hungary (3 hotels)
  {
    name: "Central Hotel Budapest Plaza",
    description: "A stylish urban hotel in Budapest's city center, perfect for exploring the Pearl of the Danube.",
    country: "Hungary",
    city: "Budapest",
    address: "Váci utca 20, Budapest, Hungary 1052",
    postal_code: "1052",
    latitude: 47.4979,
    longitude: 19.0402,
    price_per_month: 1750,
    property_type: "Hotel",
    style: "Urban",
    ideal_guests: "City explorers and business guests",
    atmosphere: "Dynamic and contemporary",
    perfect_location: "Pedestrian shopping street in city center"
  },
  {
    name: "Győr Business Hotel",
    description: "A modern hotel in Győr's business district, ideal for corporate travelers and those exploring western Hungary.",
    country: "Hungary",
    city: "Győr",
    address: "Baross Gábor út 7, Győr, Hungary 9021",
    postal_code: "9021",
    latitude: 47.6875,
    longitude: 17.6504,
    price_per_month: 1550,
    property_type: "Hotel",
    style: "Modern",
    ideal_guests: "Business travelers and professionals",
    atmosphere: "Professional and efficient",
    perfect_location: "Business district with good transport links"
  },
  {
    name: "Central Hotel Szeged Plaza",
    description: "A classic hotel in Szeged's university district, perfect for academic visitors and southern Hungary explorers.",
    country: "Hungary",
    city: "Szeged",
    address: "Kárász utca 8, Szeged, Hungary 6720",
    postal_code: "6720",
    latitude: 46.2530,
    longitude: 20.1414,
    price_per_month: 1450,
    property_type: "Hotel",
    style: "Classic",
    ideal_guests: "Academic visitors and researchers",
    atmosphere: "Scholarly and peaceful",
    perfect_location: "University district near the Tisza River"
  },

  // Romania (3 hotels)
  {
    name: "Bucharest Royal Hotel",
    description: "An elegant hotel in Romania's capital, combining royal heritage with modern luxury for discerning guests.",
    country: "Romania",
    city: "Bucharest",
    address: "Calea Victoriei 125, Bucharest, Romania 010071",
    postal_code: "010071",
    latitude: 44.4268,
    longitude: 26.1025,
    price_per_month: 1650,
    property_type: "Hotel",
    style: "Royal Classic",
    ideal_guests: "Luxury travelers and business executives",
    atmosphere: "Regal and sophisticated",
    perfect_location: "Historic avenue with shopping and culture"
  },
  {
    name: "Transilvania Heritage Inn",
    description: "A charming hotel in Cluj-Napoca, gateway to Transylvania, perfect for exploring Romania's medieval heritage.",
    country: "Romania",
    city: "Cluj-Napoca",
    address: "Piața Unirii 17, Cluj-Napoca, Romania 400020",
    postal_code: "400020",
    latitude: 46.7712,
    longitude: 23.6236,
    price_per_month: 1500,
    property_type: "Heritage Hotel",
    style: "Medieval Modern",
    ideal_guests: "History enthusiasts and cultural explorers",
    atmosphere: "Mystical and welcoming",
    perfect_location: "Historic center near Gothic cathedral"
  },
  {
    name: "Constanta Seaside Resort",
    description: "A coastal resort hotel in Constanta, offering Black Sea relaxation with Romanian coastal charm.",
    country: "Romania",
    city: "Constanta",
    address: "Bulevardul Mamaia 255, Constanta, Romania 900001",
    postal_code: "900001",
    latitude: 44.1598,
    longitude: 28.6348,
    price_per_month: 1600,
    property_type: "Resort",
    style: "Coastal Modern",
    ideal_guests: "Beach lovers and relaxation seekers",
    atmosphere: "Relaxed and breezy",
    perfect_location: "Black Sea coast with beach access"
  },

  // Canada (3 hotels)
  {
    name: "Toronto Metropolitan Hotel",
    description: "A sophisticated hotel in downtown Toronto, perfect for exploring Canada's largest city and business district.",
    country: "Canada",
    city: "Toronto",
    address: "108 Chestnut Street, Toronto, ON M5G 1R3, Canada",
    postal_code: "M5G 1R3",
    latitude: 43.6532,
    longitude: -79.3832,
    price_per_month: 2200,
    property_type: "Hotel",
    style: "Metropolitan",
    ideal_guests: "Business travelers and urban explorers",
    atmosphere: "Cosmopolitan and energetic",
    perfect_location: "Downtown core near CN Tower"
  },
  {
    name: "Vancouver Mountain View Lodge",
    description: "A scenic hotel in Vancouver with mountain and ocean views, ideal for nature lovers visiting British Columbia.",
    country: "Canada",
    city: "Vancouver",
    address: "1755 Davie Street, Vancouver, BC V6G 1W5, Canada",
    postal_code: "V6G 1W5",
    latitude: 49.2827,
    longitude: -123.1207,
    price_per_month: 2400,
    property_type: "Lodge",
    style: "Mountain Modern",
    ideal_guests: "Nature enthusiasts and outdoor adventurers",
    atmosphere: "Serene and inspiring",
    perfect_location: "West End with mountain and sea views"
  },
  {
    name: "Montreal Historic Inn",
    description: "A charming hotel in Old Montreal, blending French-Canadian heritage with modern comfort.",
    country: "Canada",
    city: "Montreal",
    address: "355 Rue McGill, Montreal, QC H2Y 2E8, Canada",
    postal_code: "H2Y 2E8",
    latitude: 45.5017,
    longitude: -73.5673,
    price_per_month: 2000,
    property_type: "Historic Inn",
    style: "French Colonial",
    ideal_guests: "Culture lovers and heritage enthusiasts",
    atmosphere: "Romantic and historic",
    perfect_location: "Old Port with cobblestone streets"
  },

  // Ireland (3 hotels)
  {
    name: "Dublin Castle View Hotel",
    description: "An elegant hotel near Dublin Castle, offering Irish hospitality in the heart of Ireland's capital.",
    country: "Ireland",
    city: "Dublin",
    address: "25 Dame Street, Dublin 2, D02 E447, Ireland",
    postal_code: "D02 E447",
    latitude: 53.3441,
    longitude: -6.2675,
    price_per_month: 2100,
    property_type: "Hotel",
    style: "Georgian Classic",
    ideal_guests: "History buffs and literary enthusiasts",
    atmosphere: "Traditional Irish charm",
    perfect_location: "Temple Bar district near Dublin Castle"
  },
  {
    name: "Cork Riverside Lodge",
    description: "A cozy hotel in Cork city alongside the River Lee, perfect for exploring southern Ireland.",
    country: "Ireland",
    city: "Cork",
    address: "Western Road, Cork, T12 XY34, Ireland",
    postal_code: "T12 XY34",
    latitude: 51.8985,
    longitude: -8.4756,
    price_per_month: 1800,
    property_type: "Lodge",
    style: "Riverside Rustic",
    ideal_guests: "Nature lovers and cultural explorers",
    atmosphere: "Cozy and welcoming",
    perfect_location: "River Lee with walking paths"
  },
  {
    name: "Galway Bay Hotel",
    description: "A scenic hotel overlooking Galway Bay, gateway to the wild Atlantic way and Irish coastal beauty.",
    country: "Ireland",
    city: "Galway",
    address: "1 Salthill Promenade, Galway, H91 C7D4, Ireland",
    postal_code: "H91 C7D4",
    latitude: 53.2707,
    longitude: -9.0568,
    price_per_month: 1900,
    property_type: "Hotel",
    style: "Coastal Contemporary",
    ideal_guests: "Coastal enthusiasts and music lovers",
    atmosphere: "Vibrant and artistic",
    perfect_location: "Salthill with Atlantic Ocean views"
  },

  // Germany (3 hotels)
  {
    name: "Berlin Brandenburg Hotel",
    description: "A modern hotel near Brandenburg Gate, perfect for exploring Germany's historic capital city.",
    country: "Germany",
    city: "Berlin",
    address: "Unter den Linden 45, 10117 Berlin, Germany",
    postal_code: "10117",
    latitude: 52.5200,
    longitude: 13.4050,
    price_per_month: 2000,
    property_type: "Hotel",
    style: "Contemporary",
    ideal_guests: "History enthusiasts and culture seekers",
    atmosphere: "Dynamic and cosmopolitan",
    perfect_location: "Historic center near Brandenburg Gate"
  },
  {
    name: "Munich Bavarian Inn",
    description: "A traditional Bavarian hotel in Munich's old town, offering authentic German hospitality and Alpine charm.",
    country: "Germany",
    city: "Munich",
    address: "Tal 15, 80331 München, Germany",
    postal_code: "80331",
    latitude: 48.1351,
    longitude: 11.5820,
    price_per_month: 2100,
    property_type: "Inn",
    style: "Bavarian Traditional",
    ideal_guests: "Culture enthusiasts and beer lovers",
    atmosphere: "Gemütlich and traditional",
    perfect_location: "Marienplatz area with historic charm"
  },
  {
    name: "Hamburg Harbor Hotel",
    description: "A maritime-themed hotel in Hamburg's harbor district, perfect for exploring Germany's gateway to the world.",
    country: "Germany",
    city: "Hamburg",
    address: "Bei den St. Pauli-Landungsbrücken 3, 20359 Hamburg, Germany",
    postal_code: "20359",
    latitude: 53.5511,
    longitude: 9.9937,
    price_per_month: 1900,
    property_type: "Hotel",
    style: "Maritime Modern",
    ideal_guests: "Maritime enthusiasts and port explorers",
    atmosphere: "Nautical and adventurous",
    perfect_location: "St. Pauli harbor with Elbe River views"
  },

  // Portugal (3 hotels)
  {
    name: "Lisbon Fado Hotel",
    description: "A soulful hotel in Lisbon's Alfama district, where traditional Fado music meets modern Portuguese hospitality.",
    country: "Portugal",
    city: "Lisbon",
    address: "Largo do Chafariz de Dentro 12, 1100-139 Lisboa, Portugal",
    postal_code: "1100-139",
    latitude: 38.7223,
    longitude: -9.1393,
    price_per_month: 1700,
    property_type: "Hotel",
    style: "Traditional Portuguese",
    ideal_guests: "Music lovers and cultural explorers",
    atmosphere: "Soulful and authentic",
    perfect_location: "Historic Alfama with Fado houses"
  },
  {
    name: "Porto Wine Cellar Inn",
    description: "A charming hotel in Porto's wine district, perfect for exploring Portugal's second city and famous port wine cellars.",
    country: "Portugal",
    city: "Porto",
    address: "Rua do Infante Dom Henrique 1, 4050-297 Porto, Portugal",
    postal_code: "4050-297",
    latitude: 41.1579,
    longitude: -8.6291,
    price_per_month: 1600,
    property_type: "Inn",
    style: "Wine Country",
    ideal_guests: "Wine enthusiasts and food lovers",
    atmosphere: "Warm and convivial",
    perfect_location: "Ribeira district near wine cellars"
  },
  {
    name: "Algarve Coastal Resort",
    description: "A beautiful coastal resort in Faro, gateway to Portugal's stunning Algarve beaches and Mediterranean lifestyle.",
    country: "Portugal",
    city: "Faro",
    address: "Praia de Quarteira, 8125-024 Quarteira, Portugal",
    postal_code: "8125-024",
    latitude: 37.0194,
    longitude: -8.0178,
    price_per_month: 1800,
    property_type: "Resort",
    style: "Mediterranean Coastal",
    ideal_guests: "Beach lovers and sun seekers",
    atmosphere: "Relaxed and sunny",
    perfect_location: "Golden beaches of the Algarve"
  },

  // Belgium (3 hotels)
  {
    name: "Brussels Grand Place Hotel",
    description: "An elegant hotel near Brussels' famous Grand Place, perfect for exploring the heart of Europe and Belgian culture.",
    country: "Belgium",
    city: "Brussels",
    address: "Rue de la Colline 1, 1000 Bruxelles, Belgium",
    postal_code: "1000",
    latitude: 50.8476,
    longitude: 4.3572,
    price_per_month: 1900,
    property_type: "Hotel",
    style: "European Classic",
    ideal_guests: "European culture enthusiasts",
    atmosphere: "Sophisticated and international",
    perfect_location: "Steps from Grand Place UNESCO site"
  },
  {
    name: "Bruges Canal House Hotel",
    description: "A romantic canal-side hotel in medieval Bruges, offering fairytale charm in Belgium's most beautiful city.",
    country: "Belgium",
    city: "Bruges",
    address: "Wollestraat 25, 8000 Brugge, Belgium",
    postal_code: "8000",
    latitude: 51.2093,
    longitude: 3.2247,
    price_per_month: 1750,
    property_type: "Boutique Hotel",
    style: "Medieval Romantic",
    ideal_guests: "Romantic couples and history lovers",
    atmosphere: "Enchanting and intimate",
    perfect_location: "Historic center with canal views"
  },
  {
    name: "Antwerp Diamond District Inn",
    description: "A stylish hotel in Antwerp's diamond district, perfect for exploring Belgium's port city and cultural heritage.",
    country: "Belgium",
    city: "Antwerp",
    address: "Pelikaanstraat 15, 2000 Antwerpen, Belgium",
    postal_code: "2000",
    latitude: 51.2194,
    longitude: 4.4025,
    price_per_month: 1650,
    property_type: "Inn",
    style: "Urban Chic",
    ideal_guests: "Art lovers and fashion enthusiasts",
    atmosphere: "Creative and vibrant",
    perfect_location: "Diamond district near fashion quarter"
  },

  // Netherlands (3 hotels)
  {
    name: "Amsterdam Canal Ring Hotel",
    description: "A charming hotel along Amsterdam's famous canal ring, perfect for exploring Dutch culture and historic waterways.",
    country: "Netherlands",
    city: "Amsterdam",
    address: "Prinsengracht 315, 1016 GZ Amsterdam, Netherlands",
    postal_code: "1016 GZ",
    latitude: 52.3676,
    longitude: 4.8852,
    price_per_month: 2200,
    property_type: "Canal House Hotel",
    style: "Dutch Golden Age",
    ideal_guests: "Culture enthusiasts and canal lovers",
    atmosphere: "Historic and picturesque",
    perfect_location: "UNESCO canal ring with museum access"
  },
  {
    name: "The Hague Diplomatic Hotel",
    description: "An elegant hotel in The Hague's diplomatic quarter, ideal for business travelers and international visitors.",
    country: "Netherlands",
    city: "The Hague",
    address: "Lange Voorhout 54, 2514 EG Den Haag, Netherlands",
    postal_code: "2514 EG",
    latitude: 52.0705,
    longitude: 4.3007,
    price_per_month: 2000,
    property_type: "Hotel",
    style: "Diplomatic Classic",
    ideal_guests: "Business travelers and diplomats",
    atmosphere: "Professional and refined",
    perfect_location: "Government district near palaces"
  },
  {
    name: "Rotterdam Modern Port Hotel",
    description: "A contemporary hotel in Rotterdam's innovative port district, perfect for architecture and design enthusiasts.",
    country: "Netherlands",
    city: "Rotterdam",
    address: "Wilhelminakade 137, 3072 AP Rotterdam, Netherlands",
    postal_code: "3072 AP",
    latitude: 51.9244,
    longitude: 4.4777,
    price_per_month: 1800,
    property_type: "Hotel",
    style: "Modern Industrial",
    ideal_guests: "Architecture fans and business visitors",
    atmosphere: "Innovative and forward-thinking",
    perfect_location: "Port area with modern skyline"
  },

  // Luxembourg (3 hotels)
  {
    name: "Luxembourg City Palace Hotel",
    description: "A luxurious hotel in Luxembourg City's financial district, perfect for exploring Europe's banking capital.",
    country: "Luxembourg",
    city: "Luxembourg City",
    address: "Place d'Armes 18, 1136 Luxembourg, Luxembourg",
    postal_code: "1136",
    latitude: 49.6116,
    longitude: 6.1319,
    price_per_month: 2300,
    property_type: "Palace Hotel",
    style: "Luxury Financial",
    ideal_guests: "Business executives and luxury travelers",
    atmosphere: "Opulent and exclusive",
    perfect_location: "Historic center near banking district"
  },
  {
    name: "Vianden Castle View Lodge",
    description: "A scenic lodge near Vianden Castle, offering fairy-tale views and access to Luxembourg's medieval heritage.",
    country: "Luxembourg",
    city: "Vianden",
    address: "Grand-Rue 55, 9410 Vianden, Luxembourg",
    postal_code: "9410",
    latitude: 49.9347,
    longitude: 6.2097,
    price_per_month: 1700,
    property_type: "Lodge",
    style: "Medieval Castle",
    ideal_guests: "History enthusiasts and castle lovers",
    atmosphere: "Fairy-tale and majestic",
    perfect_location: "Castle view with Our River valley"
  },
  {
    name: "Echternach Abbey Hotel",
    description: "A peaceful hotel near Echternach Abbey, perfect for exploring Luxembourg's spiritual heritage and Mullerthal region.",
    country: "Luxembourg",
    city: "Echternach",
    address: "Parvis de la Basilique 11, 6486 Echternach, Luxembourg",
    postal_code: "6486",
    latitude: 49.8106,
    longitude: 6.4167,
    price_per_month: 1600,
    property_type: "Abbey Hotel",
    style: "Monastic Peaceful",
    ideal_guests: "Spiritual seekers and nature lovers",
    atmosphere: "Serene and contemplative",
    perfect_location: "Abbey grounds in Little Switzerland"
  },

  // Switzerland (3 hotels)
  {
    name: "Zurich Alpine View Hotel",
    description: "A sophisticated hotel in Zurich with Alpine panoramas, perfect for exploring Switzerland's financial capital.",
    country: "Switzerland",
    city: "Zurich",
    address: "Bahnhofstrasse 75, 8001 Zürich, Switzerland",
    postal_code: "8001",
    latitude: 47.3769,
    longitude: 8.5417,
    price_per_month: 2800,
    property_type: "Hotel",
    style: "Alpine Luxury",
    ideal_guests: "Business travelers and luxury seekers",
    atmosphere: "Pristine and sophisticated",
    perfect_location: "Financial district with mountain views"
  },
  {
    name: "Geneva Lake Resort",
    description: "An elegant lakeside resort in Geneva, offering Swiss hospitality with stunning Lake Geneva views.",
    country: "Switzerland",
    city: "Geneva",
    address: "Quai du Mont-Blanc 17, 1201 Genève, Switzerland",
    postal_code: "1201",
    latitude: 46.2044,
    longitude: 6.1432,
    price_per_month: 2600,
    property_type: "Lake Resort",
    style: "Lakeside Elegant",
    ideal_guests: "International visitors and diplomats",
    atmosphere: "Refined and international",
    perfect_location: "Lake Geneva with jet d'eau views"
  },
  {
    name: "Lucerne Mountain Lodge",
    description: "A charming mountain lodge in Lucerne, gateway to the Swiss Alps with traditional hospitality.",
    country: "Switzerland",
    city: "Lucerne",
    address: "Schweizerhofquai 3, 6002 Luzern, Switzerland",
    postal_code: "6002",
    latitude: 47.0379,
    longitude: 8.3093,
    price_per_month: 2400,
    property_type: "Mountain Lodge",
    style: "Traditional Alpine",
    ideal_guests: "Mountain enthusiasts and nature lovers",
    atmosphere: "Cozy and mountainous",
    perfect_location: "Lake Lucerne with Alpine access"
  },

  // Austria (3 hotels)
  {
    name: "Vienna Imperial Hotel",
    description: "A grand imperial hotel in Vienna's historic center, offering Austrian elegance near the Hofburg Palace.",
    country: "Austria",
    city: "Vienna",
    address: "Kärntner Ring 16, 1015 Wien, Austria",
    postal_code: "1015",
    latitude: 48.2082,
    longitude: 16.3738,
    price_per_month: 2200,
    property_type: "Imperial Hotel",
    style: "Habsburg Imperial",
    ideal_guests: "Classical music lovers and history buffs",
    atmosphere: "Imperial and cultured",
    perfect_location: "Ring Road near State Opera"
  },
  {
    name: "Salzburg Mozart Inn",
    description: "A musical-themed hotel in Mozart's birthplace, perfect for classical music enthusiasts visiting Salzburg.",
    country: "Austria",
    city: "Salzburg",
    address: "Getreidegasse 37, 5020 Salzburg, Austria",
    postal_code: "5020",
    latitude: 47.8095,
    longitude: 13.0458,
    price_per_month: 1900,
    property_type: "Historic Inn",
    style: "Baroque Musical",
    ideal_guests: "Music lovers and cultural tourists",
    atmosphere: "Musical and baroque",
    perfect_location: "Old town near Mozart's birthplace"
  },
  {
    name: "Innsbruck Alpine Resort",
    description: "A mountain resort in Innsbruck, offering Austrian Alpine hospitality with spectacular mountain views.",
    country: "Austria",
    city: "Innsbruck",
    address: "Maria-Theresien-Straße 31, 6020 Innsbruck, Austria",
    postal_code: "6020",
    latitude: 47.2692,
    longitude: 11.4041,
    price_per_month: 2000,
    property_type: "Alpine Resort",
    style: "Tyrolean Alpine",
    ideal_guests: "Ski enthusiasts and mountain lovers",
    atmosphere: "Alpine and invigorating",
    perfect_location: "Inn Valley with mountain panorama"
  },

  // Denmark (3 hotels)
  {
    name: "Copenhagen Design Hotel",
    description: "A stylish design hotel in Copenhagen's trendy district, showcasing Danish modern design and hygge culture.",
    country: "Denmark",
    city: "Copenhagen",
    address: "Nyhavn 9, 1051 København K, Denmark",
    postal_code: "1051",
    latitude: 55.6761,
    longitude: 12.5683,
    price_per_month: 2100,
    property_type: "Design Hotel",
    style: "Danish Modern",
    ideal_guests: "Design enthusiasts and culture seekers",
    atmosphere: "Hygge and contemporary",
    perfect_location: "Nyhavn canal with colorful houses"
  },
  {
    name: "Aarhus University Lodge",
    description: "A modern lodge in Aarhus university district, perfect for academic visitors and cultural explorers.",
    country: "Denmark",
    city: "Aarhus",
    address: "Åboulevarden 37, 8000 Aarhus C, Denmark",
    postal_code: "8000",
    latitude: 56.1629,
    longitude: 10.2039,
    price_per_month: 1800,
    property_type: "University Lodge",
    style: "Academic Modern",
    ideal_guests: "Academics and cultural visitors",
    atmosphere: "Intellectual and welcoming",
    perfect_location: "University area with cultural venues"
  },
  {
    name: "Odense Fairy Tale Inn",
    description: "A charming inn in Hans Christian Andersen's birthplace, perfect for fairy tale enthusiasts visiting Odense.",
    country: "Denmark",
    city: "Odense",
    address: "Hans Jensens Stræde 11, 5000 Odense C, Denmark",
    postal_code: "5000",
    latitude: 55.4038,
    longitude: 10.4024,
    price_per_month: 1700,
    property_type: "Fairy Tale Inn",
    style: "Story Book Charm",
    ideal_guests: "Families and story lovers",
    atmosphere: "Whimsical and enchanting",
    perfect_location: "Old town near Andersen museum"
  },

  // Norway (3 hotels)
  {
    name: "Oslo Fjord Hotel",
    description: "A scenic hotel in Oslo with fjord views, perfect for exploring Norway's capital and natural beauty.",
    country: "Norway",
    city: "Oslo",
    address: "Akershusstranden 15, 0150 Oslo, Norway",
    postal_code: "0150",
    latitude: 59.9139,
    longitude: 10.7522,
    price_per_month: 2400,
    property_type: "Fjord Hotel",
    style: "Nordic Fjord",
    ideal_guests: "Nature lovers and fjord enthusiasts",
    atmosphere: "Nordic and pristine",
    perfect_location: "Akershus with Oslo fjord access"
  },
  {
    name: "Bergen Hanseatic Inn",
    description: "A historic inn in Bergen's Hanseatic quarter, gateway to Norway's spectacular fjord region.",
    country: "Norway",
    city: "Bergen",
    address: "Bryggen 15, 5003 Bergen, Norway",
    postal_code: "5003",
    latitude: 60.3975,
    longitude: 5.3244,
    price_per_month: 2200,
    property_type: "Historic Inn",
    style: "Hanseatic Heritage",
    ideal_guests: "Heritage enthusiasts and fjord explorers",
    atmosphere: "Historic and maritime",
    perfect_location: "UNESCO Bryggen wharf district"
  },
  {
    name: "Trondheim Cathedral Lodge",
    description: "A peaceful lodge near Trondheim's stunning cathedral, perfect for exploring Norway's historic capital.",
    country: "Norway",
    city: "Trondheim",
    address: "Munkegata 15, 7013 Trondheim, Norway",
    postal_code: "7013",
    latitude: 63.4305,
    longitude: 10.3951,
    price_per_month: 2000,
    property_type: "Cathedral Lodge",
    style: "Medieval Nordic",
    ideal_guests: "Pilgrims and history seekers",
    atmosphere: "Spiritual and historic",
    perfect_location: "Cathedral district with Nidelva River"
  },

  // Sweden (3 hotels)
  {
    name: "Stockholm Archipelago Hotel",
    description: "An elegant hotel in Stockholm's archipelago district, perfect for exploring Sweden's capital and island beauty.",
    country: "Sweden",
    city: "Stockholm",
    address: "Strandvägen 7C, 114 56 Stockholm, Sweden",
    postal_code: "114 56",
    latitude: 59.3293,
    longitude: 18.0686,
    price_per_month: 2300,
    property_type: "Archipelago Hotel",
    style: "Swedish Elegance",
    ideal_guests: "Island hoppers and culture enthusiasts",
    atmosphere: "Elegant and maritime",
    perfect_location: "Östermalm with archipelago access"
  },
  {
    name: "Gothenburg Maritime Inn",
    description: "A maritime-themed inn in Gothenburg's port district, perfect for exploring Sweden's west coast.",
    country: "Sweden",
    city: "Gothenburg",
    address: "Lilla Bommen 5, 411 04 Göteborg, Sweden",
    postal_code: "411 04",
    latitude: 57.7089,
    longitude: 11.9746,
    price_per_month: 2000,
    property_type: "Maritime Inn",
    style: "West Coast Maritime",
    ideal_guests: "Seafood lovers and coastal explorers",
    atmosphere: "Fresh and maritime",
    perfect_location: "Harbor area with Göta älv views"
  },
  {
    name: "Malmö Bridge View Hotel",
    description: "A modern hotel in Malmö with views of the Öresund Bridge, connecting Sweden and Denmark.",
    country: "Sweden",
    city: "Malmö",
    address: "Västra Hamnen 15, 211 19 Malmö, Sweden",
    postal_code: "211 19",
    latitude: 55.6050,
    longitude: 12.9940,
    price_per_month: 1900,
    property_type: "Bridge View Hotel",
    style: "Scandinavian Modern",
    ideal_guests: "Bridge enthusiasts and modern travelers",
    atmosphere: "Contemporary and connected",
    perfect_location: "Western Harbor with bridge views"
  },

  // Greece (3 hotels)
  {
    name: "Athens Acropolis Hotel",
    description: "A classic hotel with Acropolis views in Athens, perfect for exploring ancient Greek civilization and culture.",
    country: "Greece",
    city: "Athens",
    address: "Plaka 16, 105 58 Athina, Greece",
    postal_code: "105 58",
    latitude: 37.9755,
    longitude: 23.7348,
    price_per_month: 1800,
    property_type: "Heritage Hotel",
    style: "Ancient Greek Classic",
    ideal_guests: "History lovers and archaeology enthusiasts",
    atmosphere: "Classical and inspiring",
    perfect_location: "Plaka district with Acropolis views"
  },
  {
    name: "Thessaloniki Byzantine Inn",
    description: "A historic inn in Thessaloniki's Byzantine quarter, exploring Greece's northern cultural capital.",
    country: "Greece",
    city: "Thessaloniki",
    address: "Aristotelous Square 5, 546 24 Thessaloniki, Greece",
    postal_code: "546 24",
    latitude: 40.6401,
    longitude: 22.9444,
    price_per_month: 1600,
    property_type: "Byzantine Inn",
    style: "Byzantine Heritage",
    ideal_guests: "Byzantine history enthusiasts",
    atmosphere: "Historic and cultural",
    perfect_location: "Central square near Thermaic Gulf"
  },
  {
    name: "Santorini Cycladic Resort",
    description: "A stunning resort in Santorini with caldera views, offering Greek island paradise and sunset beauty.",
    country: "Greece",
    city: "Santorini",
    address: "Oia 847 02, Santorini, Greece",
    postal_code: "847 02",
    latitude: 36.4618,
    longitude: 25.3753,
    price_per_month: 2400,
    property_type: "Island Resort",
    style: "Cycladic White",
    ideal_guests: "Sunset lovers and island enthusiasts",
    atmosphere: "Romantic and breathtaking",
    perfect_location: "Oia village with caldera sunset views"
  },

  // Finland (3 hotels)
  {
    name: "Helsinki Design District Hotel",
    description: "A contemporary hotel in Helsinki's design district, showcasing Finnish design and Nordic culture.",
    country: "Finland",
    city: "Helsinki",
    address: "Punavuori 12, 00120 Helsinki, Finland",
    postal_code: "00120",
    latitude: 60.1699,
    longitude: 24.9384,
    price_per_month: 2100,
    property_type: "Design Hotel",
    style: "Finnish Modern",
    ideal_guests: "Design enthusiasts and Nordic culture lovers",
    atmosphere: "Clean and minimalist",
    perfect_location: "Design district near Market Square"
  },
  {
    name: "Rovaniemi Aurora Lodge",
    description: "A magical lodge in Rovaniemi, Lapland, perfect for Northern Lights viewing and Arctic adventures.",
    country: "Finland",
    city: "Rovaniemi",
    address: "Korkalonkatu 33, 96200 Rovaniemi, Finland",
    postal_code: "96200",
    latitude: 66.5039,
    longitude: 25.7294,
    price_per_month: 2200,
    property_type: "Aurora Lodge",
    style: "Arctic Adventure",
    ideal_guests: "Aurora hunters and Arctic explorers",
    atmosphere: "Magical and pristine",
    perfect_location: "Arctic Circle with aurora visibility"
  },
  {
    name: "Turku Archipelago Inn",
    description: "A coastal inn in Turku exploring Finland's archipelago region and maritime heritage.",
    country: "Finland",
    city: "Turku",
    address: "Linnankatu 32, 20100 Turku, Finland",
    postal_code: "20100",
    latitude: 60.4518,
    longitude: 22.2666,
    price_per_month: 1800,
    property_type: "Archipelago Inn",
    style: "Finnish Coastal",
    ideal_guests: "Island enthusiasts and maritime lovers",
    atmosphere: "Coastal and serene",
    perfect_location: "Aura River near archipelago"
  },

  // Iceland (3 hotels)
  {
    name: "Reykjavik Northern Lights Hotel",
    description: "A unique hotel in Reykjavik designed for Northern Lights viewing, perfect for experiencing Iceland's capital.",
    country: "Iceland",
    city: "Reykjavik",
    address: "Laugavegur 101, 101 Reykjavík, Iceland",
    postal_code: "101",
    latitude: 64.1466,
    longitude: -21.9426,
    price_per_month: 2300,
    property_type: "Aurora Hotel",
    style: "Nordic Volcanic",
    ideal_guests: "Aurora chasers and geothermal enthusiasts",
    atmosphere: "Otherworldly and energizing",
    perfect_location: "City center with aurora viewing deck"
  },
  {
    name: "Blue Lagoon Geothermal Resort",
    description: "A geothermal resort near the famous Blue Lagoon, offering Iceland's unique spa and volcanic experiences.",
    country: "Iceland",
    city: "Grindavik",
    address: "Nordurljosavegur 9, 240 Grindavík, Iceland",
    postal_code: "240",
    latitude: 63.8804,
    longitude: -22.4495,
    price_per_month: 2600,
    property_type: "Geothermal Resort",
    style: "Volcanic Luxury",
    ideal_guests: "Spa enthusiasts and geothermal lovers",
    atmosphere: "Therapeutic and unique",
    perfect_location: "Blue Lagoon area with lava fields"
  },
  {
    name: "Akureyri Whale Watching Lodge",
    description: "A cozy lodge in Akureyri, Iceland's northern capital, perfect for whale watching and Arctic Circle exploration.",
    country: "Iceland",
    city: "Akureyri",
    address: "Hafnarstræti 67, 600 Akureyri, Iceland",
    postal_code: "600",
    latitude: 65.6835,
    longitude: -18.1262,
    price_per_month: 2000,
    property_type: "Whale Lodge",
    style: "Arctic Coastal",
    ideal_guests: "Whale watchers and Arctic adventurers",
    atmosphere: "Wild and pristine",
    perfect_location: "Eyjafjörður fjord with whale routes"
  },

  // France (3 hotels)
  {
    name: "Paris Champs-Élysées Hotel",
    description: "An elegant hotel on the famous Champs-Élysées, perfect for exploring the City of Light and French culture.",
    country: "France",
    city: "Paris",
    address: "75 Avenue des Champs-Élysées, 75008 Paris, France",
    postal_code: "75008",
    latitude: 48.8706,
    longitude: 2.3081,
    price_per_month: 2800,
    property_type: "Boulevard Hotel",
    style: "Parisian Elegant",
    ideal_guests: "Fashion lovers and culture enthusiasts",
    atmosphere: "Chic and sophisticated",
    perfect_location: "Champs-Élysées near Arc de Triomphe"
  },
  {
    name: "Lyon Gastronomy Inn",
    description: "A culinary-focused inn in Lyon, France's gastronomic capital, perfect for food enthusiasts and gourmets.",
    country: "France",
    city: "Lyon",
    address: "Rue Mercière 28, 69002 Lyon, France",
    postal_code: "69002",
    latitude: 45.7640,
    longitude: 4.8357,
    price_per_month: 2000,
    property_type: "Gastronomy Inn",
    style: "French Culinary",
    ideal_guests: "Food lovers and gastronomy enthusiasts",
    atmosphere: "Delicious and convivial",
    perfect_location: "Presqu'île near bouchon restaurants"
  },
  {
    name: "Nice Riviera Resort",
    description: "A glamorous resort in Nice on the French Riviera, offering Mediterranean luxury and Côte d'Azur lifestyle.",
    country: "France",
    city: "Nice",
    address: "Promenade des Anglais 223, 06000 Nice, France",
    postal_code: "06000",
    latitude: 43.6947,
    longitude: 7.2656,
    price_per_month: 2500,
    property_type: "Riviera Resort",
    style: "French Riviera Glamour",
    ideal_guests: "Luxury seekers and Mediterranean lovers",
    atmosphere: "Glamorous and sunny",
    perfect_location: "Promenade des Anglais with sea views"
  },

  // United Kingdom (3 hotels)
  {
    name: "London Thames View Hotel",
    description: "A classic hotel with Thames views in London, perfect for exploring Britain's capital and royal heritage.",
    country: "United Kingdom",
    city: "London",
    address: "Westminster Bridge Road 85, London SE1 7HS, UK",
    postal_code: "SE1 7HS",
    latitude: 51.5007,
    longitude: -0.1246,
    price_per_month: 2600,
    property_type: "Thames Hotel",
    style: "British Classic",
    ideal_guests: "Royal heritage enthusiasts and theater lovers",
    atmosphere: "Traditional and prestigious",
    perfect_location: "South Bank with Big Ben views"
  },
  {
    name: "Edinburgh Castle View Inn",
    description: "A historic inn with Edinburgh Castle views, perfect for exploring Scotland's capital and Highland culture.",
    country: "United Kingdom",
    city: "Edinburgh",
    address: "Royal Mile 245, Edinburgh EH1 1PE, UK",
    postal_code: "EH1 1PE",
    latitude: 55.9533,
    longitude: -3.1883,
    price_per_month: 2200,
    property_type: "Castle Inn",
    style: "Scottish Highland",
    ideal_guests: "Highland enthusiasts and history buffs",
    atmosphere: "Historic and majestic",
    perfect_location: "Royal Mile with castle panorama"
  },
  {
    name: "Bath Roman Spa Hotel",
    description: "An elegant spa hotel in Bath's Roman district, offering ancient wellness traditions and Georgian architecture.",
    country: "United Kingdom",
    city: "Bath",
    address: "Abbey Green 12, Bath BA1 1NW, UK",
    postal_code: "BA1 1NW",
    latitude: 51.3811,
    longitude: -2.3590,
    price_per_month: 2100,
    property_type: "Roman Spa Hotel",
    style: "Roman Georgian",
    ideal_guests: "Spa enthusiasts and architecture lovers",
    atmosphere: "Elegant and therapeutic",
    perfect_location: "Roman Baths with Georgian terraces"
  },

  // Turkey (3 hotels)
  {
    name: "Istanbul Bosphorus Hotel",
    description: "A magnificent hotel overlooking the Bosphorus in Istanbul, bridging Europe and Asia with Ottoman heritage.",
    country: "Turkey",
    city: "Istanbul",
    address: "Galata Kulesi Sk. 15, 34421 Beyoğlu/İstanbul, Turkey",
    postal_code: "34421",
    latitude: 41.0258,
    longitude: 28.9744,
    price_per_month: 1900,
    property_type: "Bosphorus Hotel",
    style: "Ottoman Modern",
    ideal_guests: "History enthusiasts and cultural explorers",
    atmosphere: "Mystical and bridging",
    perfect_location: "Galata with Bosphorus and city views"
  },
  {
    name: "Cappadocia Cave Resort",
    description: "A unique cave resort in Cappadocia's fairy chimney landscape, offering hot air balloon views and geological wonders.",
    country: "Turkey",
    City: "Goreme",
    address: "Müze Cad. 42, 50180 Göreme/Nevşehir, Turkey",
    postal_code: "50180",
    latitude: 38.6424,
    longitude: 34.8287,
    price_per_month: 1700,
    property_type: "Cave Resort",
    style: "Fairy Chimney Cave",
    ideal_guests: "Adventure seekers and geological enthusiasts",
    atmosphere: "Surreal and ancient",
    perfect_location: "Göreme valley with balloon launch sites"
  },
  {
    name: "Antalya Mediterranean Resort",
    description: "A beautiful Mediterranean resort in Antalya's turquoise coast, offering Turkish Riviera luxury and ancient ruins.",
    country: "Turkey",
    city: "Antalya",
    address: "Kaleiçi Mah. Hesapçı Sk. 26, 07100 Muratpaşa/Antalya, Turkey",
    postal_code: "07100",
    latitude: 36.8969,
    longitude: 30.7133,
    price_per_month: 1800,
    property_type: "Mediterranean Resort",
    style: "Turkish Riviera",
    ideal_guests: "Beach lovers and ancient history fans",
    atmosphere: "Sunny and historical",
    perfect_location: "Old town with Mediterranean access"
  },

  // Thailand (3 hotels)
  {
    name: "Bangkok Royal Palace Hotel",
    description: "A luxurious hotel near Bangkok's Royal Palace, perfect for exploring Thailand's capital and royal Buddhist culture.",
    country: "Thailand",
    city: "Bangkok",
    address: "Thanon Maharaj 85, Bangkok 10200, Thailand",
    postal_code: "10200",
    latitude: 13.7563,
    longitude: 100.5018,
    price_per_month: 1600,
    property_type: "Royal Palace Hotel",
    style: "Thai Royal Buddhist",
    ideal_guests: "Cultural explorers and temple enthusiasts",
    atmosphere: "Spiritual and golden",
    perfect_location: "Rattanakosin with palace and temple access"
  },
  {
    name: "Chiang Mai Mountain Temple Lodge",
    description: "A serene lodge in Chiang Mai's mountain temple district, offering Thai northern culture and meditation retreats.",
    country: "Thailand",
    city: "Chiang Mai",
    address: "Nimmanhaemin Road 15, Chiang Mai 50200, Thailand",
    postal_code: "50200",
    latitude: 18.7883,
    longitude: 98.9853,
    price_per_month: 1400,
    property_type: "Mountain Temple Lodge",
    style: "Northern Thai Temple",
    ideal_guests: "Meditation seekers and mountain lovers",
    atmosphere: "Peaceful and mountainous",
    perfect_location: "Doi Suthep area with temple access"
  },
  {
    name: "Phuket Beach Paradise Resort",
    description: "A tropical beach resort in Phuket's paradise beaches, offering Thai island luxury and Andaman Sea beauty.",
    country: "Thailand",
    city: "Phuket",
    address: "Patong Beach 189, Phuket 83150, Thailand",
    postal_code: "83150",
    latitude: 7.8804,
    longitude: 98.2915,
    price_per_month: 1500,
    property_type: "Beach Paradise Resort",
    style: "Thai Tropical Paradise",
    ideal_guests: "Beach paradise seekers and island hoppers",
    atmosphere: "Tropical and paradisiacal",
    perfect_location: "Patong beach with Andaman Sea access"
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting batch creation of 66 hotels');
    
    // Validate hotel data array
    console.log(`Hotel data array contains ${hotelData.length} hotels`);
    
    if (hotelData.length !== 66) {
      throw new Error(`Expected 66 hotels, but hotel data contains ${hotelData.length} hotels`);
    }
    
    // Validate countries in hotel data
    const countriesInData = [...new Set(hotelData.map(hotel => hotel.country))];
    console.log(`Countries in hotel data: ${countriesInData.join(', ')}`);
    console.log(`Number of unique countries: ${countriesInData.length}`);
    
    // Check for unauthorized countries
    const unauthorizedCountries = countriesInData.filter(country => !AUTHORIZED_COUNTRIES.includes(country));
    if (unauthorizedCountries.length > 0) {
      throw new Error(`Unauthorized countries found in hotel data: ${unauthorizedCountries.join(', ')}`);
    }
    
    // Check for missing authorized countries
    const missingCountries = AUTHORIZED_COUNTRIES.filter(country => !countriesInData.includes(country));
    if (missingCountries.length > 0) {
      throw new Error(`Missing authorized countries in hotel data: ${missingCountries.join(', ')}`);
    }
    
    // Verify exactly 3 hotels per country
    const countryHotelCount = {};
    hotelData.forEach(hotel => {
      countryHotelCount[hotel.country] = (countryHotelCount[hotel.country] || 0) + 1;
    });
    
    const incorrectCounts = Object.entries(countryHotelCount).filter(([country, count]) => count !== 3);
    if (incorrectCounts.length > 0) {
      throw new Error(`Incorrect hotel count per country: ${incorrectCounts.map(([country, count]) => `${country}: ${count}`).join(', ')}`);
    }
    
    console.log('✅ Hotel data validation passed');
    console.log(`✅ All ${AUTHORIZED_COUNTRIES.length} authorized countries present`);
    console.log('✅ Exactly 3 hotels per country confirmed');
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const createdHotels = [];
    const errors = [];
    
    // Create hotels with detailed logging
    for (let i = 0; i < hotelData.length; i++) {
      const hotel = hotelData[i];
      
      try {
        console.log(`Creating hotel ${i + 1}/${hotelData.length}: ${hotel.name} in ${hotel.city}, ${hotel.country}`);
        console.log(`Address: ${hotel.address}`);
        console.log(`Coordinates: ${hotel.latitude}, ${hotel.longitude}`);
        console.log(`Property Type: ${hotel.property_type}, Style: ${hotel.style}`);
        
        // Validate required fields
        const requiredFields = ['name', 'country', 'city', 'address', 'latitude', 'longitude', 'price_per_month', 'property_type', 'style'];
        const missingFields = requiredFields.filter(field => !hotel[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Create hotel record
        const hotelRecord = {
          name: hotel.name,
          description: hotel.description,
          country: hotel.country,
          city: hotel.city,
          address: hotel.address,
          postal_code: hotel.postal_code,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
          price_per_month: hotel.price_per_month,
          property_type: hotel.property_type,
          style: hotel.style,
          ideal_guests: hotel.ideal_guests,
          atmosphere: hotel.atmosphere,
          perfect_location: hotel.perfect_location,
          status: 'approved',
          available_months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          meal_plans: ['Half Board'],
          stay_lengths: [32],
          owner_id: '786aefb8-bd6e-4955-8a0e-ec82efa0e608' // Default owner
        };
        
        const { data, error } = await supabase
          .from('hotels')
          .insert(hotelRecord)
          .select()
          .single();
        
        if (error) {
          console.error(`Error creating hotel ${hotel.name}:`, error);
          errors.push({ hotel: hotel.name, error: error.message });
        } else {
          console.log(`✅ Successfully created hotel: ${hotel.name} in ${hotel.city}, ${hotel.country}`);
          createdHotels.push(data);
        }
        
        // Small delay to prevent overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.error(`Exception creating hotel ${hotel.name}:`, err);
        errors.push({ hotel: hotel.name, error: err.message });
      }
    }
    
    console.log(`✅ Completed processing: ${createdHotels.length} hotels created successfully`);
    console.log(`❌ Errors encountered: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }
    
    // Verify final counts
    const countriesCreated = [...new Set(createdHotels.map(hotel => hotel.country))];
    console.log(`Countries with created hotels: ${countriesCreated.length}`);
    console.log(`Total hotels created: ${createdHotels.length}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Batch creation completed`,
        stats: {
          total_processed: hotelData.length,
          successful_creations: createdHotels.length,
          errors: errors.length,
          countries_processed: countriesCreated.length,
          expected_countries: AUTHORIZED_COUNTRIES.length
        },
        created_hotels: createdHotels.map(hotel => ({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          country: hotel.country
        })),
        errors: errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
    
  } catch (error) {
    console.error('Fatal error in batch creation:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: 'Check function logs for detailed error information'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
