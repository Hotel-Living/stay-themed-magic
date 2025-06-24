
import { createExcelFile } from './lazyExcel';

interface HotelData {
  hotelName: string;
  city: string;
  fullAddress: string;
  description: string;
  affinities: string;
  activities: string;
  roomDescription: string;
}

// Available affinities from your system
const availableAffinities = [
  'Gastronomy', 'Arts', 'Digital Nomad', 'Wellness', 'Culture', 'Nature', 
  'Photography', 'Music', 'Literature', 'Yoga', 'Business', 'Language Learning',
  'Cooking', 'Wine Tasting', 'Architecture', 'History', 'Outdoor Activities'
];

// Available activities from your system
const availableActivities = [
  'Cooking classes', 'City tours', 'Wine tasting', 'Art workshops', 'Yoga sessions',
  'Business networking', 'Language exchange', 'Photography walks', 'Cultural visits',
  'Wellness treatments', 'Music sessions', 'Outdoor excursions', 'Historical tours',
  'Culinary experiences', 'Creative workshops', 'Nature walks'
];

const hotelData: HotelData[] = [
  // Budapest Hotels (7)
  {
    hotelName: "Aria Hotel Budapest",
    city: "Budapest",
    fullAddress: "Hercegprímás u. 5, 1051 Budapest, Hungary",
    description: "A boutique music-themed hotel in the heart of Budapest's historic Castle District. Features elegantly designed rooms inspired by classical and contemporary music, with a rooftop terrace offering panoramic views of the city. The hotel combines luxury with artistic flair, perfect for culturally minded travelers.",
    affinities: "Music, Arts, Culture",
    activities: "Music sessions, Cultural visits, City tours",
    roomDescription: "Superior Double Room: 25 sqm elegant room with king-size bed, marble bathroom, music-themed decor, city views, complimentary WiFi, minibar, and premium amenities."
  },
  {
    hotelName: "Casati Budapest Hotel",
    city: "Budapest",
    fullAddress: "Paulay Ede u. 31, 1061 Budapest, Hungary",
    description: "A stylish boutique hotel located in the vibrant Pest side, featuring contemporary design with Hungarian artistic elements. Close to the Opera House and main shopping areas, offering a perfect blend of modern comfort and local culture.",
    affinities: "Arts, Culture, Business",
    activities: "Art workshops, Cultural visits, Business networking",
    roomDescription: "Deluxe Double Room: 28 sqm modern room with double bed, designer furnishings, marble bathroom, city views, work desk, and high-speed internet access."
  },
  {
    hotelName: "Hotel Moments Budapest",
    city: "Budapest",
    fullAddress: "Andrássy út 8, 1061 Budapest, Hungary",
    description: "An intimate luxury hotel on the famous Andrássy Avenue, featuring individually designed rooms with vintage and contemporary elements. Perfect for guests seeking personalized service and unique design in a historic setting.",
    affinities: "Design, History, Luxury",
    activities: "Historical tours, Architecture walks, Cultural visits",
    roomDescription: "Premium Double Room: 30 sqm uniquely designed room with queen bed, antique furnishings, marble bathroom, street views, and premium amenities."
  },
  {
    hotelName: "Pest-Buda Hotel",
    city: "Budapest",
    fullAddress: "Fortuna u. 3, 1014 Budapest, Hungary",
    description: "A charming family-run hotel in the Castle District, offering traditional Hungarian hospitality with modern amenities. Features authentic local architecture and personalized service in a quiet, historic neighborhood.",
    affinities: "Culture, History, Gastronomy",
    activities: "Culinary experiences, Historical tours, Cooking classes",
    roomDescription: "Traditional Double Room: 24 sqm cozy room with double bed, traditional Hungarian decor, private bathroom, castle views, and complimentary breakfast."
  },
  {
    hotelName: "Brody House",
    city: "Budapest",
    fullAddress: "Bródy Sándor u. 10, 1088 Budapest, Hungary",
    description: "A creative hub and boutique hotel that doubles as an art gallery and cultural center. Features eclectic design, hosts regular cultural events, and attracts artists and creative professionals from around the world.",
    affinities: "Arts, Culture, Creative",
    activities: "Art workshops, Creative workshops, Cultural events",
    roomDescription: "Artist Double Room: 26 sqm creative space with double bed, artist-designed interiors, private bathroom, and access to gallery spaces."
  },
  {
    hotelName: "Hotel Palazzo Zichy",
    city: "Budapest",
    fullAddress: "Lőrinc pap tér 2, 1088 Budapest, Hungary",
    description: "A renovated 19th-century palace turned boutique hotel, featuring baroque architecture with modern amenities. Located in a quiet square near the National Museum, offering elegance and tranquility in the city center.",
    affinities: "History, Architecture, Culture",
    activities: "Historical tours, Architecture walks, Cultural visits",
    roomDescription: "Palace Double Room: 32 sqm elegant room with king bed, period furnishings, marble bathroom, courtyard views, and luxury amenities."
  },
  {
    hotelName: "Baltazár Budapest",
    city: "Budapest",
    fullAddress: "Országház u. 31, 1014 Budapest, Hungary",
    description: "A stylish guesthouse in the Castle District, featuring modern design with traditional elements. Offers intimate accommodation with personalized service, perfect for travelers seeking authentic Budapest experience.",
    affinities: "Design, Culture, Gastronomy",
    activities: "Culinary experiences, City tours, Wine tasting",
    roomDescription: "Design Double Room: 27 sqm contemporary room with double bed, designer furnishings, modern bathroom, and castle district views."
  },

  // Paris Hotels (7)
  {
    hotelName: "Hotel des Grands Boulevards",
    city: "Paris",
    fullAddress: "17 Boulevard Poissonnière, 75002 Paris, France",
    description: "A charming boutique hotel in the historic Grands Boulevards district, featuring elegant Parisian style with modern comforts. Located near the Opéra and major department stores, perfect for exploring authentic Paris.",
    affinities: "Culture, Design, Gastronomy",
    activities: "Cultural visits, Culinary experiences, City tours",
    roomDescription: "Superior Double Room: 22 sqm elegantly appointed room with double bed, Parisian-style furnishings, marble bathroom, and city views."
  },
  {
    hotelName: "Hotel Malte Opera",
    city: "Paris",
    fullAddress: "63 Rue de Richelieu, 75002 Paris, France",
    description: "A refined boutique hotel near the Opéra Garnier, offering classic Parisian elegance with contemporary amenities. Features beautiful common areas and personalized service in a prestigious location.",
    affinities: "Culture, Arts, Music",
    activities: "Cultural visits, Music sessions, Art workshops",
    roomDescription: "Classic Double Room: 25 sqm traditional Parisian room with queen bed, antique furnishings, marble bathroom, and opera district views."
  },
  {
    hotelName: "Hotel Bachaumont",
    city: "Paris",
    fullAddress: "18 Rue Bachaumont, 75002 Paris, France",
    description: "A trendy boutique hotel in the vibrant Sentier district, combining vintage charm with modern design. Popular with creative professionals and design enthusiasts, featuring a stylish bar and restaurant.",
    affinities: "Design, Creative, Digital Nomad",
    activities: "Creative workshops, Business networking, City tours",
    roomDescription: "Design Double Room: 24 sqm creatively designed room with double bed, vintage-modern furnishings, stylish bathroom, and neighborhood views."
  },
  {
    hotelName: "Hotel Jeanne d'Arc",
    city: "Paris",
    fullAddress: "3 Rue de Jarente, 75004 Paris, France",
    description: "A cozy family-run hotel in the historic Marais district, offering authentic Parisian hospitality with traditional charm. Perfect for guests seeking intimate accommodation in one of Paris's most beautiful neighborhoods.",
    affinities: "Culture, History, Gastronomy",
    activities: "Historical tours, Culinary experiences, Cultural visits",
    roomDescription: "Traditional Double Room: 20 sqm charming room with double bed, traditional French decor, private bathroom, and Marais district ambiance."
  },
  {
    hotelName: "Hotel des Académies et des Arts",
    city: "Paris",
    fullAddress: "15 Rue de la Grande Chaumière, 75006 Paris, France",
    description: "An artistic boutique hotel in Montparnasse, celebrating Parisian artistic heritage. Features art-themed rooms and common areas, attracting artists and art lovers from around the world.",
    affinities: "Arts, Culture, Creative",
    activities: "Art workshops, Creative workshops, Cultural visits",
    roomDescription: "Artist Double Room: 23 sqm art-inspired room with double bed, artist-designed elements, modern bathroom, and Montparnasse views."
  },
  {
    hotelName: "Hotel Particulier Montmartre",
    city: "Paris",
    fullAddress: "23 Avenue Junot, 75018 Paris, France",
    description: "A hidden gem in Montmartre, featuring five individually designed suites in a private mansion. Offers exclusive, intimate accommodation with garden views and personalized service in the artistic heart of Paris.",
    affinities: "Arts, Design, Culture",
    activities: "Art workshops, Cultural visits, Photography walks",
    roomDescription: "Suite Double Room: 35 sqm luxurious suite with king bed, unique artistic design, marble bathroom, garden views, and private terrace access."
  },
  {
    hotelName: "Hotel National Des Arts et Métiers",
    city: "Paris",
    fullAddress: "243 Rue Saint-Martin, 75003 Paris, France",
    description: "A modern boutique hotel celebrating French craftsmanship and innovation. Located in the trendy République area, featuring contemporary design with references to French industrial heritage.",
    affinities: "Design, Business, Innovation",
    activities: "Business networking, Design workshops, City tours",
    roomDescription: "Contemporary Double Room: 26 sqm modern room with double bed, industrial-chic design, high-tech amenities, and urban views."
  },

  // Hurghada Hotels (7)
  {
    hotelName: "Steigenberger Al Dau Beach Hotel",
    city: "Hurghada",
    fullAddress: "Al Ahyaa Road, Hurghada, Red Sea Governorate, Egypt",
    description: "A beachfront resort hotel offering Red Sea diving experiences and water sports. Features traditional Egyptian architecture with modern amenities, perfect for underwater enthusiasts and beach lovers.",
    affinities: "Diving, Water Sports, Nature",
    activities: "Diving courses, Water sports, Beach activities",
    roomDescription: "Sea View Double Room: 30 sqm comfortable room with double bed, sea views, private balcony, air conditioning, and beach access."
  },
  {
    hotelName: "Coral Beach Resort Hurghada",
    city: "Hurghada",
    fullAddress: "Safaga Road, Hurghada, Red Sea Governorate, Egypt",
    description: "A mid-range resort focusing on diving and snorkeling activities. Features dive center, multiple pools, and direct access to coral reefs, ideal for underwater photography and marine life enthusiasts.",
    affinities: "Diving, Photography, Marine Life",
    activities: "Diving courses, Snorkeling trips, Photography workshops",
    roomDescription: "Standard Double Room: 28 sqm room with twin beds, garden or pool views, private bathroom, air conditioning, and diving equipment storage."
  },
  {
    hotelName: "Mercure Hurghada Hotel",
    city: "Hurghada",
    fullAddress: "Corniche Road, Hurghada, Red Sea Governorate, Egypt",
    description: "A modern hotel in Hurghada's downtown area, offering easy access to local markets, restaurants, and marina. Perfect for travelers wanting to experience local culture while enjoying Red Sea activities.",
    affinities: "Culture, Water Sports, Business",
    activities: "Cultural visits, Water sports, Business facilities",
    roomDescription: "Superior Double Room: 32 sqm modern room with king bed, city or sea views, work desk, mini-fridge, and contemporary amenities."
  },
  {
    hotelName: "Hilton Hurghada Plaza",
    city: "Hurghada",
    fullAddress: "Corniche Road, Hurghada, Red Sea Governorate, Egypt",
    description: "A centrally located hotel offering Red Sea adventures with urban convenience. Features multiple restaurants, diving center, and easy access to Hurghada's nightlife and shopping areas.",
    affinities: "Water Sports, Nightlife, Shopping",
    activities: "Water sports, City tours, Shopping excursions",
    roomDescription: "Deluxe Double Room: 35 sqm spacious room with double bed, Red Sea views, marble bathroom, balcony, and luxury amenities."
  },
  {
    hotelName: "Sheraton Miramar Resort El Gouna",
    city: "Hurghada",
    fullAddress: "El Gouna, Hurghada, Red Sea Governorate, Egypt",
    description: "A lagoon-style resort in the planned town of El Gouna, featuring Nubian-inspired architecture and water sports facilities. Perfect for kitesurfing, windsurfing, and relaxation in a unique desert oasis setting.",
    affinities: "Water Sports, Desert, Relaxation",
    activities: "Kitesurfing, Windsurfing, Desert tours",
    roomDescription: "Lagoon View Double Room: 40 sqm room with king bed, lagoon views, private terrace, Egyptian-style decor, and water sports equipment rental."
  },
  {
    hotelName: "Jaz Aquamarine Resort",
    city: "Hurghada",
    fullAddress: "Safaga Road, Hurghada, Red Sea Governorate, Egypt",
    description: "A beachfront resort specializing in wellness and water activities. Features spa facilities, multiple pools, and direct beach access with coral reef snorkeling opportunities.",
    affinities: "Wellness, Water Sports, Relaxation",
    activities: "Spa treatments, Snorkeling, Yoga sessions",
    roomDescription: "Premium Double Room: 33 sqm room with double bed, sea or garden views, marble bathroom, private balcony, and wellness amenities."
  },
  {
    hotelName: "Bel Air Azur Resort",
    city: "Hurghada",
    fullAddress: "Safaga Road, Hurghada, Red Sea Governorate, Egypt",
    description: "A family-friendly resort with extensive diving facilities and cultural programs. Offers traditional Egyptian entertainment, multiple dining options, and professional dive center with PADI courses.",
    affinities: "Diving, Culture, Family",
    activities: "Diving courses, Cultural shows, Family activities",
    roomDescription: "Family Double Room: 36 sqm room with double bed, additional sofa bed, pool views, private balcony, and family-friendly amenities."
  },

  // Berlin Hotels (7)
  {
    hotelName: "Michelberger Hotel",
    city: "Berlin",
    fullAddress: "Warschauer Str. 39-40, 10243 Berlin, Germany",
    description: "A creative boutique hotel in trendy Friedrichshain, featuring eclectic design and artistic atmosphere. Popular with musicians, artists, and creative professionals, offering unique rooms and vibrant common spaces.",
    affinities: "Arts, Music, Creative",
    activities: "Music sessions, Art workshops, Creative events",
    roomDescription: "Creative Double Room: 25 sqm uniquely designed room with double bed, artistic furnishings, shared or private bathroom, and creative workspace."
  },
  {
    hotelName: "Circus Hotel",
    city: "Berlin",
    fullAddress: "Rosenthaler Str. 1, 10119 Berlin, Germany",
    description: "A modern boutique hotel in Mitte district, combining Scandinavian design with Berlin's urban energy. Features minimalist rooms, rooftop terrace, and easy access to galleries, cafes, and nightlife.",
    affinities: "Design, Urban Culture, Nightlife",
    activities: "City tours, Gallery visits, Nightlife experiences",
    roomDescription: "Design Double Room: 28 sqm minimalist room with queen bed, Scandinavian furnishings, modern bathroom, and city views."
  },
  {
    hotelName: "Hackescher Hof",
    city: "Berlin",
    fullAddress: "Große Präsidentenstr. 8, 10178 Berlin, Germany",
    description: "A historic hotel near Hackescher Markt, featuring traditional German hospitality with modern comfort. Perfect for exploring Berlin's cultural attractions, museums, and historic sites.",
    affinities: "History, Culture, Architecture",
    activities: "Historical tours, Cultural visits, Architecture walks",
    roomDescription: "Traditional Double Room: 26 sqm classic room with double bed, traditional German decor, modern bathroom, and historic district views."
  },
  {
    hotelName: "Honigmond Garden Hotel",
    city: "Berlin",
    fullAddress: "Invalidenstr. 122, 10115 Berlin, Germany",
    description: "A charming garden hotel in a quiet area near the government district, featuring peaceful courtyard and traditional architecture. Perfect for business travelers and those seeking tranquility in the city.",
    affinities: "Business, Tranquility, Gardens",
    activities: "Business facilities, Garden walks, Relaxation",
    roomDescription: "Garden Double Room: 30 sqm peaceful room with king bed, garden views, work desk, and modern amenities in quiet setting."
  },
  {
    hotelName: "Hotel Oderberger",
    city: "Berlin",
    fullAddress: "Oderberger Str. 57, 10435 Berlin, Germany",
    description: "A converted historic bathhouse in Prenzlauer Berg, featuring original 1900s architecture with contemporary design. Offers unique accommodation with pool, sauna, and artistic atmosphere.",
    affinities: "Architecture, Wellness, History",
    activities: "Swimming, Sauna sessions, Historical tours",
    roomDescription: "Historic Double Room: 32 sqm room with double bed, period features, modern bathroom, and access to historic pool facilities."
  },
  {
    hotelName: "Lux 11",
    city: "Berlin",
    fullAddress: "Rosa-Luxemburg-Str. 9-13, 10178 Berlin, Germany",
    description: "A modern apartment-style hotel in Mitte, offering spacious suites with kitchenettes. Perfect for longer stays and digital nomads seeking flexible accommodation with home-like amenities.",
    affinities: "Digital Nomad, Business, Urban Living",
    activities: "Business networking, City exploration, Flexible workspace",
    roomDescription: "Studio Double Room: 35 sqm apartment-style room with double bed, kitchenette, living area, work space, and modern furnishings."
  },
  {
    hotelName: "Ackselhaus",
    city: "Berlin",
    fullAddress: "Belforter Str. 21, 10405 Berlin, Germany",
    description: "A boutique hotel in a converted 19th-century building in Prenzlauer Berg, featuring individual room designs and artistic details. Offers intimate accommodation with personalized service and local neighborhood charm.",
    affinities: "Arts, Design, Local Culture",
    activities: "Art galleries, Local tours, Cultural experiences",
    roomDescription: "Boutique Double Room: 27 sqm individually designed room with double bed, artistic furnishings, unique bathroom, and neighborhood character."
  },

  // New York Hotels (7)
  {
    hotelName: "Pod Hotels Brooklyn",
    city: "New York",
    fullAddress: "247 Metropolitan Ave, Brooklyn, NY 11211, USA",
    description: "A modern micro-hotel in trendy Williamsburg, featuring efficient design and tech-forward amenities. Perfect for urban explorers and digital nomads seeking affordable luxury in Brooklyn's hippest neighborhood.",
    affinities: "Digital Nomad, Urban Culture, Technology",
    activities: "City tours, Tech meetups, Urban exploration",
    roomDescription: "Pod Double Room: 18 sqm efficiently designed room with queen bed, modern tech amenities, compact bathroom, and Manhattan skyline views."
  },
  {
    hotelName: "The High Line Hotel",
    city: "New York",
    fullAddress: "180 10th Ave, New York, NY 10011, USA",
    description: "A boutique hotel in Chelsea near the High Line park, featuring Gothic Revival architecture with modern amenities. Offers intimate luxury with personalized service and easy access to galleries and restaurants.",
    affinities: "Arts, Architecture, Culture",
    activities: "Gallery visits, Architecture tours, Cultural experiences",
    roomDescription: "Classic Double Room: 30 sqm elegantly appointed room with king bed, period details, marble bathroom, and garden or city views."
  },
  {
    hotelName: "The Jane Hotel",
    city: "New York",
    fullAddress: "113 Jane St, New York, NY 10014, USA",
    description: "A historic hotel in the West Village, featuring original 1908 architecture with cabin-style rooms. Rich in maritime history and bohemian culture, perfect for budget-conscious travelers seeking character.",
    affinities: "History, Culture, Maritime",
    activities: "Historical tours, Cultural walks, Maritime history",
    roomDescription: "Historic Cabin Room: 15 sqm compact room with double bed, original ship-cabin design, shared bathroom facilities, and historic charm."
  },
  {
    hotelName: "The Bowery Hotel",
    city: "New York",
    fullAddress: "335 Bowery, New York, NY 10003, USA",
    description: "A luxury boutique hotel in NoHo, featuring rich textures and warm colors in a sophisticated setting. Attracts artists, writers, and creative professionals with its literary atmosphere and elegant design.",
    affinities: "Literature, Arts, Creative",
    activities: "Literary events, Art workshops, Creative networking",
    roomDescription: "Superior Double Room: 35 sqm luxurious room with king bed, rich fabrics, marble bathroom, and downtown Manhattan views."
  },
  {
    hotelName: "The Standard East Village",
    city: "New York",
    fullAddress: "25 Cooper Square, New York, NY 10003, USA",
    description: "A modern hotel in the East Village, featuring contemporary design and vibrant nightlife. Popular with young professionals and creatives, offering rooftop bar and easy access to the city's music scene.",
    affinities: "Music, Nightlife, Modern Culture",
    activities: "Music venues, Nightlife tours, Cultural events",
    roomDescription: "Modern Double Room: 28 sqm contemporary room with queen bed, floor-to-ceiling windows, modern bathroom, and East Village views."
  },
  {
    hotelName: "The William Vale",
    city: "New York",
    fullAddress: "111 N 12th St, Brooklyn, NY 11249, USA",
    description: "A contemporary hotel in Williamsburg with stunning Manhattan views, featuring modern design and cutting-edge amenities. Perfect for business travelers and design enthusiasts seeking luxury in Brooklyn.",
    affinities: "Business, Design, Urban Luxury",
    activities: "Business networking, Design events, Urban exploration",
    roomDescription: "Deluxe Double Room: 40 sqm modern room with king bed, floor-to-ceiling windows, marble bathroom, and spectacular Manhattan skyline views."
  },
  {
    hotelName: "The Ludlow Hotel",
    city: "New York",
    fullAddress: "180 Ludlow St, New York, NY 10002, USA",
    description: "A boutique hotel on the Lower East Side, featuring neo-Gothic architecture with contemporary interiors. Attracts musicians, artists, and cultural enthusiasts with its edgy neighborhood location and artistic atmosphere.",
    affinities: "Music, Arts, Alternative Culture",
    activities: "Music venues, Art galleries, Alternative culture tours",
    roomDescription: "Boutique Double Room: 32 sqm stylish room with king bed, custom furnishings, marble bathroom, and Lower East Side character."
  },

  // Bucharest Hotels (7)
  {
    hotelName: "The Marmorosch Bucharest",
    city: "Bucharest",
    fullAddress: "Calea Victoriei 2-4, 030026 Bucharest, Romania",
    description: "A restored 1920s bank building turned luxury hotel in the historic center, featuring art deco design with contemporary amenities. Perfect for travelers seeking historical elegance with modern luxury.",
    affinities: "History, Architecture, Luxury",
    activities: "Historical tours, Architecture walks, Cultural visits",
    roomDescription: "Heritage Double Room: 35 sqm elegantly restored room with king bed, art deco furnishings, marble bathroom, and historic city views."
  },
  {
    hotelName: "Hotel Cismigiu",
    city: "Bucharest",
    fullAddress: "Bd. Regina Elisabeta 38, 030018 Bucharest, Romania",
    description: "A boutique hotel overlooking Cismigiu Gardens, featuring contemporary Romanian design with traditional elements. Offers peaceful accommodation with easy access to cultural attractions and business district.",
    affinities: "Culture, Business, Gardens",
    activities: "Cultural visits, Business facilities, Garden walks",
    roomDescription: "Garden View Double Room: 28 sqm modern room with double bed, Romanian design elements, park views, and contemporary amenities."
  },
  {
    hotelName: "Vila Arte",
    city: "Bucharest",
    fullAddress: "Str. C. Esarcu 40, 020165 Bucharest, Romania",
    description: "An art-focused boutique hotel in a restored villa, featuring contemporary Romanian art and design. Perfect for art enthusiasts and creative professionals seeking unique accommodation with cultural immersion.",
    affinities: "Arts, Culture, Design",
    activities: "Art workshops, Gallery visits, Cultural experiences",
    roomDescription: "Art Suite Double Room: 32 sqm artistic room with king bed, original artwork, designer bathroom, and creative atmosphere."
  },
  {
    hotelName: "Hotel Amzei",
    city: "Bucharest",
    fullAddress: "Str. G. Magheru 8-10, 010336 Bucharest, Romania",
    description: "A modern business hotel in the city center, featuring contemporary design and efficient service. Ideal for business travelers and those exploring Bucharest's cultural attractions and nightlife.",
    affinities: "Business, Urban Culture, Efficiency",
    activities: "Business networking, City tours, Cultural visits",
    roomDescription: "Executive Double Room: 30 sqm business-oriented room with king bed, work desk, modern amenities, and city center views."
  },
  {
    hotelName: "Hotel Berthelot",
    city: "Bucharest",
    fullAddress: "Str. Berthelot 30, 010168 Bucharest, Romania",
    description: "A renovated early 20th-century building featuring classic Romanian hospitality with modern comfort. Located in a quiet residential area with easy access to museums and cultural sites.",
    affinities: "History, Culture, Tranquility",
    activities: "Historical tours, Cultural visits, Museum tours",
    roomDescription: "Classic Double Room: 26 sqm traditional room with double bed, period furnishings, modern bathroom, and quiet neighborhood setting."
  },
  {
    hotelName: "Rembrandt Hotel",
    city: "Bucharest",
    fullAddress: "Str. Smardan 11, 030167 Bucharest, Romania",
    description: "A boutique hotel in the old town, featuring Dutch-inspired design with Romanian cultural elements. Perfect for exploring Bucharest's historic center, restaurants, and nightlife.",
    affinities: "Culture, Gastronomy, Historic Center",
    activities: "Culinary experiences, Historical tours, Nightlife",
    roomDescription: "Historic Double Room: 24 sqm charming room with double bed, Dutch-Romanian design, modern bathroom, and old town ambiance."
  },
  {
    hotelName: "Casa Capsa",
    city: "Bucharest",
    fullAddress: "Calea Victoriei 36, 010061 Bucharest, Romania",
    description: "A historic hotel and restaurant dating back to 1852, featuring Belle Époque architecture with modern renovations. Famous for its literary connections and traditional Romanian cuisine.",
    affinities: "Literature, History, Gastronomy",
    activities: "Literary tours, Culinary experiences, Historical visits",
    roomDescription: "Literary Double Room: 29 sqm elegantly appointed room with king bed, period furnishings, marble bathroom, and literary heritage atmosphere."
  },

  // London Hotels (7)
  {
    hotelName: "The Zetter Townhouse",
    city: "London",
    fullAddress: "49-50 Seymour St, London W1H 7JG, UK",
    description: "A Georgian townhouse hotel in Marylebone, featuring quirky British design with Victorian curiosities. Perfect for travelers seeking intimate luxury with eccentric charm and traditional afternoon tea service.",
    affinities: "Culture, Design, British Heritage",
    activities: "Cultural visits, Design tours, Traditional experiences",
    roomDescription: "Townhouse Double Room: 25 sqm individually designed room with king bed, Victorian antiques, modern bathroom, and Georgian architecture details."
  },
  {
    hotelName: "Artist Residence London",
    city: "London",
    fullAddress: "52 Cambridge St, London SW1V 4QQ, UK",
    description: "A boutique hotel in Pimlico featuring contemporary art and design, with individually decorated rooms by local artists. Attracts creative professionals and art enthusiasts seeking unique accommodation.",
    affinities: "Arts, Creative, Design",
    activities: "Art workshops, Gallery visits, Creative networking",
    roomDescription: "Artist Double Room: 22 sqm creatively designed room with double bed, original artwork, unique bathroom, and artistic atmosphere."
  },
  {
    hotelName: "The Hoxton Shoreditch",
    city: "London",
    fullAddress: "81 Great Eastern St, London EC2A 3HU, UK",
    description: "A trendy hotel in East London's creative quarter, featuring industrial chic design with warm hospitality. Popular with digital nomads, creatives, and young professionals exploring London's tech scene.",
    affinities: "Digital Nomad, Creative, Tech",
    activities: "Tech meetups, Creative workshops, Urban exploration",
    roomDescription: "Cosy Double Room: 20 sqm stylishly designed room with king bed, industrial-chic decor, custom bathroom, and Shoreditch neighborhood views."
  },
  {
    hotelName: "The Culpeper",
    city: "London",
    fullAddress: "40 Commercial St, London E1 6LP, UK",
    description: "A gastropub with rooms in Spitalfields, featuring British culinary focus with sustainable practices. Perfect for food enthusiasts and those seeking authentic London pub culture with modern comfort.",
    affinities: "Gastronomy, Sustainability, Local Culture",
    activities: "Culinary experiences, Local tours, Sustainable practices",
    roomDescription: "Gastropub Double Room: 24 sqm British-style room with double bed, pub-inspired decor, modern bathroom, and access to award-winning restaurant."
  },
  {
    hotelName: "The Henrietta Hotel",
    city: "London",
    fullAddress: "14-15 Henrietta St, London WC2E 8QG, UK",
    description: "A boutique hotel in Covent Garden, featuring contemporary design with theatrical influences. Located in the heart of London's theatre district, perfect for culture enthusiasts and West End explorers.",
    affinities: "Theatre, Culture, Arts",
    activities: "Theatre visits, Cultural tours, Arts experiences",
    roomDescription: "Theatre Double Room: 26 sqm elegantly designed room with king bed, theatrical design elements, luxury bathroom, and Covent Garden location."
  },
  {
    hotelName: "The Ned",
    city: "London",
    fullAddress: "27 Poultry, London EC2R 8AJ, UK",
    description: "A grand hotel in a former banking hall in the City, featuring 1920s design with multiple restaurants and bars. Attracts business travelers and design enthusiasts with its impressive architecture and amenities.",
    affinities: "Business, Architecture, Finance",
    activities: "Business networking, Architecture tours, Financial district tours",
    roomDescription: "Banking Hall Double Room: 30 sqm luxuriously appointed room with king bed, 1920s-inspired design, marble bathroom, and City of London views."
  },
  {
    hotelName: "The Pilgrm",
    city: "London",
    fullAddress: "25 Bones Ln, London SW20 0SU, UK",
    description: "A neighborhood hotel in Wimbledon, featuring sustainable design and local community focus. Perfect for travelers seeking eco-friendly accommodation with easy access to central London and Wimbledon attractions.",
    affinities: "Sustainability, Local Community, Wellness",
    activities: "Sustainable tours, Community events, Wellness activities",
    roomDescription: "Sustainable Double Room: 28 sqm eco-friendly room with king bed, sustainable materials, modern bathroom, and garden views."
  },

  // Istanbul Hotels (7)
  {
    hotelName: "Georges Hotel Galata",
    city: "Istanbul",
    fullAddress: "Serdar-ı Ekrem Cd. No:24, 34430 Galata, Istanbul, Turkey",
    description: "A boutique hotel in the historic Galata district, featuring Ottoman-inspired design with contemporary luxury. Offers stunning views of the Golden Horn and easy access to cultural attractions.",
    affinities: "History, Culture, Ottoman Heritage",
    activities: "Historical tours, Cultural visits, Ottoman experiences",
    roomDescription: "Galata Double Room: 30 sqm elegantly designed room with king bed, Ottoman-inspired furnishings, marble bathroom, and Golden Horn views."
  },
  {
    hotelName: "Vault Karakoy",
    city: "Istanbul",
    fullAddress: "Bankalar Cd. No:5, 34425 Karaköy, Istanbul, Turkey",
    description: "A converted Ottoman bank building in trendy Karakoy, featuring industrial chic design with Turkish elements. Popular with artists and design enthusiasts seeking unique accommodation in a historic setting.",
    affinities: "Design, Arts, Industrial Heritage",
    activities: "Design tours, Art galleries, Industrial heritage tours",
    roomDescription: "Vault Double Room: 32 sqm uniquely designed room with king bed, industrial-Ottoman fusion decor, modern bathroom, and Bosphorus views."
  },
  {
    hotelName: "Soho House Istanbul",
    city: "Istanbul",
    fullAddress: "Meşrutiyet Cd. No:56, 34430 Beyoğlu, Istanbul, Turkey",
    description: "A members' club and hotel in a 19th-century Palazzo, featuring eclectic design with Turkish influences. Attracts creative professionals and offers exclusive access to club facilities and events.",
    affinities: "Creative, Design, Exclusive",
    activities: "Creative networking, Design events, Exclusive experiences",
    roomDescription: "Club Double Room: 35 sqm stylishly designed room with king bed, eclectic furnishings, luxury bathroom, and exclusive club access."
  },
  {
    hotelName: "Pera Palace Hotel",
    city: "Istanbul",
    fullAddress: "Meşrutiyet Cd. No:52, 34430 Tepebaşı, Istanbul, Turkey",
    description: "A historic luxury hotel from 1892, featuring Belle Époque architecture with modern amenities. Famous for hosting Agatha Christie and other notable guests, offering timeless elegance and Ottoman hospitality.",
    affinities: "History, Literature, Luxury",
    activities: "Literary tours, Historical visits, Luxury experiences",
    roomDescription: "Historic Double Room: 38 sqm elegantly restored room with king bed, period furnishings, marble bathroom, and historic Istanbul atmosphere."
  },
  {
    hotelName: "10 Karakoy Istanbul",
    city: "Istanbul",
    fullAddress: "Kemankeş Karamustafa Paşa Mh., Gümrük Sk. No:10, 34425 Karaköy, Istanbul, Turkey",
    description: "A contemporary boutique hotel in the Karakoy district, featuring minimalist design with Turkish cultural elements. Perfect for modern travelers seeking stylish accommodation with easy access to both European and Asian sides.",
    affinities: "Modern Design, Culture, Urban",
    activities: "Cultural tours, Urban exploration, Design experiences",
    roomDescription: "Contemporary Double Room: 28 sqm modern room with king bed, minimalist Turkish design, sleek bathroom, and city or sea views."
  },
  {
    hotelName: "Ajia Hotel",
    city: "Istanbul",
    fullAddress: "Ahmet Rasim Paşa Cd. No:27, 34684 Kandilli, Istanbul, Turkey",
    description: "A restored Ottoman mansion on the Asian shore of the Bosphorus, featuring traditional Turkish architecture with luxury amenities. Offers tranquil accommodation away from the city center with spectacular water views.",
    affinities: "Ottoman Heritage, Tranquility, Luxury",
    activities: "Bosphorus tours, Ottoman heritage, Luxury experiences",
    roomDescription: "Bosphorus Double Room: 40 sqm luxurious room with king bed, Ottoman-style furnishings, marble bathroom, and private Bosphorus views."
  },
  {
    hotelName: "Tomtom Suites",
    city: "Istanbul",
    fullAddress: "Boğazkesen Cd. No:45, 34433 Beyoğlu, Istanbul, Turkey",
    description: "A boutique hotel in a converted 19th-century building in Beyoğlu, featuring apartment-style suites with modern amenities. Perfect for longer stays and travelers seeking home-like comfort in Istanbul's cultural heart.",
    affinities: "Culture, Long-term Stays, Comfort",
    activities: "Cultural immersion, Local experiences, Comfort amenities",
    roomDescription: "Suite Double Room: 42 sqm spacious suite with king bed, living area, kitchenette, modern bathroom, and Beyoğlu district charm."
  }
];

export const generateHotelExcel = async () => {
  try {
    const excelData = hotelData.map(hotel => ({
      'Hotel Name': hotel.hotelName,
      'City': hotel.city,
      'Full Address': hotel.fullAddress,
      'Description': hotel.description,
      'Affinities': hotel.affinities,
      'Activities': hotel.activities,
      'Room Description': hotel.roomDescription
    }));

    await createExcelFile(excelData, 'hotel_living_56_hotels.xlsx');
    console.log('Excel file generated successfully with 56 hotels');
    return { success: true, count: hotelData.length };
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return { success: false, error: error.message };
  }
};
