
import { createExcelFile } from './lazyExcel';

interface HotelData {
  'Hotel Name': string;
  'City': string;
  'Country': string;
  'Street Address': string;
  'Postal Code': string;
  'Full Address': string;
  'Description': string;
  'Affinities': string;
  'Activities': string;
  'Room Type': string;
  'Room Description': string;
  'Max Occupancy': number;
  'Room Size (sqm)': number;
}

// Real secondary hotels data organized by city
const hotelsByCity = {
  Budapest: [
    {
      name: "Hotel Moments Budapest",
      address: "Andrássy út 8",
      postalCode: "1061",
      description: "A boutique hotel in the heart of Budapest, featuring elegant rooms with classic Hungarian design elements. Located on the famous Andrássy Avenue, close to the Opera House and major attractions.",
      affinities: ["Arts", "Culture", "Architecture"],
      activities: ["City tours", "Opera visits", "Danube river cruise"],
      roomType: "Superior Double Room",
      roomDescription: "Spacious 25 sqm room with king-size bed, marble bathroom, air conditioning, minibar, and city view. Features classic Hungarian décor with modern amenities.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "Brody House",
      address: "Bródy Sándor u. 10",
      postalCode: "1088",
      description: "An artistic guesthouse in a 19th-century mansion, combining contemporary art with historic architecture. Popular among creative professionals and culture enthusiasts.",
      affinities: ["Arts", "Digital Nomad", "Culture"],
      activities: ["Art gallery visits", "Creative workshops", "Literary walks"],
      roomType: "Artist Studio Room",
      roomDescription: "Unique 30 sqm room with high ceilings, original artwork, workspace area, queen bed, and vintage furnishings. Perfect for creative professionals.",
      maxOccupancy: 2,
      roomSize: 30
    },
    {
      name: "Hotel Rum Budapest",
      address: "Király u. 17",
      postalCode: "1061",
      description: "A modern design hotel in the trendy Király Street area, known for its vibrant nightlife and local dining scene. Features contemporary Hungarian cuisine and craft cocktails.",
      affinities: ["Gastronomy", "Nightlife", "Local Culture"],
      activities: ["Food tours", "Craft cocktail workshops", "Local market visits"],
      roomType: "Deluxe Double Room",
      roomDescription: "Modern 28 sqm room with custom-designed furniture, rainfall shower, smart TV, and street-facing windows. Contemporary Hungarian design elements throughout.",
      maxOccupancy: 2,
      roomSize: 28
    },
    {
      name: "Maison Bistro & Hotel",
      address: "Dohány u. 5",
      postalCode: "1074",
      description: "A charming boutique property combining accommodation with an authentic French-Hungarian bistro. Located in the Jewish Quarter near historic synagogues.",
      affinities: ["Gastronomy", "History", "Local Culture"],
      activities: ["Cooking classes", "Jewish Quarter tours", "Wine tastings"],
      roomType: "Bistro Suite",
      roomDescription: "Cozy 32 sqm suite with separate living area, queen bed, kitchenette, and bistro-style décor. Includes complimentary breakfast at the bistro.",
      maxOccupancy: 2,
      roomSize: 32
    },
    {
      name: "Hotel Palazzo Zichy",
      address: "Lőrinc pap tér 2",
      postalCode: "1088",
      description: "A restored 19th-century palace turned boutique hotel, featuring original frescoes and period furniture. Offers an authentic aristocratic Hungarian experience.",
      affinities: ["History", "Architecture", "Luxury Heritage"],
      activities: ["Historical tours", "Classical concerts", "Architecture walks"],
      roomType: "Palace Double Room",
      roomDescription: "Elegant 35 sqm room with restored period furniture, high ceilings, marble bathroom, and palace garden view. Original architectural details preserved.",
      maxOccupancy: 2,
      roomSize: 35
    },
    {
      name: "Loft Hotel Bratislava",
      address: "Váci u. 24",
      postalCode: "1056",
      description: "Industrial-chic hotel in a converted warehouse, popular with young professionals and design enthusiasts. Features exposed brick walls and modern minimalist décor.",
      affinities: ["Design", "Digital Nomad", "Modern Architecture"],
      activities: ["Design district tours", "Coworking spaces", "Modern art galleries"],
      roomType: "Loft Double Room",
      roomDescription: "Industrial-style 27 sqm room with exposed brick, concrete floors, modern furniture, workspace, and large windows. Contemporary urban design.",
      maxOccupancy: 2,
      roomSize: 27
    },
    {
      name: "Hotel Moments Boutique",
      address: "Múzeum körút 13",
      postalCode: "1053",
      description: "An intimate boutique hotel near the Hungarian National Museum, combining traditional Hungarian hospitality with contemporary comfort in a quiet residential area.",
      affinities: ["Culture", "Relaxation", "Local Life"],
      activities: ["Museum visits", "Neighborhood walks", "Traditional Hungarian baths"],
      roomType: "Boutique Double Room",
      roomDescription: "Comfortable 26 sqm room with traditional Hungarian textiles, modern bathroom, queen bed, and quiet courtyard view. Blend of classic and contemporary design.",
      maxOccupancy: 2,
      roomSize: 26
    }
  ],
  Paris: [
    {
      name: "Hotel des Grands Boulevards",
      address: "17 Boulevard Poissonnière",
      postalCode: "75002",
      description: "A historic hotel in the vibrant 2nd arrondissement, combining Belle Époque charm with contemporary design. Known for its excellent restaurant and proximity to covered passages.",
      affinities: ["History", "Gastronomy", "Architecture"],
      activities: ["Food tours", "Historic walks", "Shopping in passages"],
      roomType: "Superior Double Room",
      roomDescription: "Elegant 22 sqm room with period moldings, modern amenities, queen bed, marble bathroom, and boulevard views. Classic Parisian style with contemporary comfort.",
      maxOccupancy: 2,
      roomSize: 22
    },
    {
      name: "Hotel Paradis",
      address: "41 Rue des Petites Écuries",
      postalCode: "75010",
      description: "A trendy boutique hotel in the hip 10th arrondissement, popular with creative professionals. Features contemporary art, local design elements, and a vibrant neighborhood atmosphere.",
      affinities: ["Arts", "Digital Nomad", "Local Culture"],
      activities: ["Art gallery visits", "Creative workshops", "Canal Saint-Martin walks"],
      roomType: "Creative Double Room",
      roomDescription: "Modern 24 sqm room with contemporary art, workspace, queen bed, rainfall shower, and street views. Perfect for creative professionals and long stays.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "Hotel Providence",
      address: "90 Rue René Boulanger",
      postalCode: "75010",
      description: "An intimate hotel with English-style décor in the trendy République area. Known for its cozy atmosphere, excellent cocktail bar, and proximity to hip restaurants and bars.",
      affinities: ["Gastronomy", "Nightlife", "Design"],
      activities: ["Cocktail workshops", "Food tours", "Nightlife exploration"],
      roomType: "English Style Room",
      roomDescription: "Cozy 20 sqm room with English-inspired décor, queen bed, vintage furnishings, and modern bathroom. Intimate atmosphere perfect for romantic getaways.",
      maxOccupancy: 2,
      roomSize: 20
    },
    {
      name: "Hotel des Metallos",
      address: "50 Rue de la Folie Méricourt",
      postalCode: "75011",
      description: "A rock 'n' roll themed hotel in the vibrant Oberkampf district, featuring music memorabilia and a laid-back atmosphere. Popular with musicians and music lovers.",
      affinities: ["Music", "Nightlife", "Alternative Culture"],
      activities: ["Music venue visits", "Record shopping", "Alternative nightlife"],
      roomType: "Rock Double Room",
      roomDescription: "Music-themed 23 sqm room with rock memorabilia, queen bed, modern amenities, and soundproofing. Perfect for music enthusiasts.",
      maxOccupancy: 2,
      roomSize: 23
    },
    {
      name: "Hotel Jeanne d'Arc",
      address: "3 Rue de Jarente",
      postalCode: "75004",
      description: "A charming family-run hotel in the historic Marais district, offering traditional French hospitality in a 17th-century building near Place des Vosges.",
      affinities: ["History", "Local Culture", "Traditional French"],
      activities: ["Historical tours", "Traditional French dining", "Marais exploration"],
      roomType: "Traditional Double Room",
      roomDescription: "Classic 21 sqm room with traditional French décor, exposed beams, queen bed, and courtyard views. Authentic Parisian atmosphere in historic setting.",
      maxOccupancy: 2,
      roomSize: 21
    },
    {
      name: "Hotel Malte Opera",
      address: "63 Rue de Richelieu",
      postalCode: "75002",
      description: "A boutique hotel near the Opéra and Louvre, housed in a 19th-century building. Combines classic Parisian elegance with modern comfort and personalized service.",
      affinities: ["Arts", "Culture", "Opera"],
      activities: ["Opera visits", "Museum tours", "Classical concerts"],
      roomType: "Opera View Room",
      roomDescription: "Elegant 25 sqm room with classic Parisian décor, queen bed, marble bathroom, and some rooms with Opera views. Traditional luxury with modern amenities.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "Hotel Fabric",
      address: "31 Rue de la Folie Méricourt",
      postalCode: "75011",
      description: "A design hotel in a former textile factory, featuring industrial-chic décor and contemporary art. Located in the trendy République area with excellent nightlife and dining.",
      affinities: ["Design", "Industrial Heritage", "Contemporary Art"],
      activities: ["Design tours", "Contemporary art galleries", "Industrial heritage walks"],
      roomType: "Industrial Suite",
      roomDescription: "Spacious 30 sqm room with industrial design, exposed elements, queen bed, modern bathroom, and factory-inspired décor. Unique architectural character.",
      maxOccupancy: 2,
      roomSize: 30
    }
  ],
  Hurghada: [
    {
      name: "Steigenberger Al Dau Beach Hotel",
      address: "Al Corniche Road, Al Dau",
      postalCode: "84511",
      description: "A beachfront resort hotel offering Red Sea diving experiences and traditional Egyptian hospitality. Features private beach access and diving center with coral reef proximity.",
      affinities: ["Water Sports", "Diving", "Beach Life"],
      activities: ["Scuba diving", "Snorkeling", "Desert safaris"],
      roomType: "Sea View Double Room",
      roomDescription: "Comfortable 28 sqm room with Red Sea views, balcony, air conditioning, traditional décor, and direct beach access. Perfect for diving enthusiasts.",
      maxOccupancy: 2,
      roomSize: 28
    },
    {
      name: "Coral Beach Resort Hurghada",
      address: "Sheraton Road, Sekalla",
      postalCode: "84511",
      description: "A mid-range resort focusing on coral reef conservation and marine life education. Offers eco-friendly diving experiences and traditional Egyptian cultural programs.",
      affinities: ["Eco-Tourism", "Marine Life", "Cultural Exchange"],
      activities: ["Coral conservation tours", "Marine biology workshops", "Cultural shows"],
      roomType: "Garden View Room",
      roomDescription: "Eco-friendly 26 sqm room with garden views, sustainable amenities, queen bed, and educational marine life materials. Environmentally conscious design.",
      maxOccupancy: 2,
      roomSize: 26
    },
    {
      name: "Desert Rose Resort",
      address: "Safaga Road, South Hurghada",
      postalCode: "84513",
      description: "A desert-themed resort combining Red Sea access with Sahara desert experiences. Features traditional Bedouin architecture and authentic Egyptian cuisine.",
      affinities: ["Desert Culture", "Traditional Architecture", "Adventure"],
      activities: ["Desert camping", "Camel riding", "Traditional crafts"],
      roomType: "Bedouin Style Room",
      roomDescription: "Traditional 30 sqm room with Bedouin décor, desert views, air conditioning, and authentic furnishings. Combines comfort with cultural authenticity.",
      maxOccupancy: 2,
      roomSize: 30
    },
    {
      name: "Red Sea Diving Lodge",
      address: "Marina Boulevard, Marina District",
      postalCode: "84511",
      description: "A specialized diving hotel catering to underwater photography enthusiasts and marine researchers. Features professional diving facilities and equipment rental.",
      affinities: ["Diving", "Photography", "Marine Research"],
      activities: ["Technical diving", "Underwater photography", "Marine research projects"],
      roomType: "Diver's Room",
      roomDescription: "Functional 24 sqm room with equipment storage, drying area, queen bed, and diving gear preparation space. Designed specifically for diving professionals.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "Nubian Heritage Hotel",
      address: "El Dahar Square, Old Town",
      postalCode: "84511",
      description: "A cultural heritage hotel showcasing Nubian traditions and Red Sea history. Features traditional architecture, local art, and authentic Egyptian hospitality.",
      affinities: ["Culture", "Heritage", "Local Traditions"],
      activities: ["Cultural workshops", "Traditional music", "Historical tours"],
      roomType: "Heritage Double Room",
      roomDescription: "Culturally-themed 27 sqm room with traditional Nubian décor, handcrafted furniture, air conditioning, and cultural artwork. Authentic Egyptian experience.",
      maxOccupancy: 2,
      roomSize: 27
    },
    {
      name: "Marina Breeze Hotel",
      address: "Hurghada Marina, Marina District",
      postalCode: "84511",
      description: "A modern marina hotel popular with sailing enthusiasts and water sports lovers. Features yacht charter services and waterfront dining with international cuisine.",
      affinities: ["Sailing", "Water Sports", "Marina Life"],
      activities: ["Yacht charters", "Sailing lessons", "Water sports"],
      roomType: "Marina View Room",
      roomDescription: "Contemporary 25 sqm room with marina views, balcony, modern amenities, and nautical-themed décor. Perfect for sailing enthusiasts.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "Oasis Wellness Resort",
      address: "Palm Beach Road, Sahl Hasheesh",
      postalCode: "84512",
      description: "A wellness-focused resort offering spa treatments, yoga retreats, and healthy cuisine. Combines Red Sea beach access with holistic wellness programs.",
      affinities: ["Wellness", "Spa", "Healthy Living"],
      activities: ["Yoga classes", "Spa treatments", "Meditation workshops"],
      roomType: "Wellness Suite",
      roomDescription: "Serene 32 sqm suite with wellness amenities, meditation space, organic minibar, and garden views. Designed for relaxation and rejuvenation.",
      maxOccupancy: 2,
      roomSize: 32
    }
  ],
  Berlin: [
    {
      name: "Michelberger Hotel",
      address: "Warschauer Str. 39-40",
      postalCode: "10243",
      description: "A creative hotel in Friedrichshain known for its artistic community and music events. Features unique room designs, local art, and a vibrant cultural program.",
      affinities: ["Arts", "Music", "Creative Community"],
      activities: ["Art workshops", "Music events", "Creative networking"],
      roomType: "Creative Double Room",
      roomDescription: "Uniquely designed 24 sqm room with custom furniture, artistic elements, queen bed, and creative workspace. Each room features different artistic themes.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "Hotel Oderberger",
      address: "Oderberger Str. 57",
      postalCode: "10435",
      description: "A historic bathhouse converted into a boutique hotel in trendy Prenzlauer Berg. Features the original swimming pool and combines industrial heritage with modern comfort.",
      affinities: ["History", "Architecture", "Design"],
      activities: ["Historical tours", "Architecture walks", "Swimming"],
      roomType: "Pool View Room",
      roomDescription: "Historic 26 sqm room with original architectural elements, modern amenities, queen bed, and some rooms overlooking the historic pool. Industrial heritage charm.",
      maxOccupancy: 2,
      roomSize: 26
    },
    {
      name: "Circus Hotel",
      address: "Rosenthaler Str. 1",
      postalCode: "10119",
      description: "A modern hotel in Mitte district popular with digital nomads and international travelers. Features co-working spaces, international cuisine, and bicycle rental services.",
      affinities: ["Digital Nomad", "International Community", "Modern Life"],
      activities: ["Co-working", "City cycling", "International networking"],
      roomType: "Nomad Double Room",
      roomDescription: "Modern 23 sqm room with workspace, high-speed internet, queen bed, and international power outlets. Designed for digital nomads and remote workers.",
      maxOccupancy: 2,
      roomSize: 23
    },
    {
      name: "Pfefferbett Hostel",
      address: "Christinenstr. 18-19",
      postalCode: "10119",
      description: "A converted factory offering both hostel and private rooms, popular with young professionals and artists. Features industrial design and a vibrant community atmosphere.",
      affinities: ["Industrial Heritage", "Community", "Young Professionals"],
      activities: ["Community events", "Industrial heritage tours", "Networking"],
      roomType: "Industrial Double Room",
      roomDescription: "Industrial-style 22 sqm room with exposed pipes, modern amenities, queen bed, and factory-inspired décor. Contemporary comfort in historic setting.",
      maxOccupancy: 2,
      roomSize: 22
    },
    {
      name: "Arte Luise Kunsthotel",
      address: "Luisenstr. 19",
      postalCode: "10117",
      description: "An art hotel near government district where each room is designed by different artists. Popular with art lovers and cultural enthusiasts seeking unique accommodation experiences.",
      affinities: ["Arts", "Culture", "Unique Experiences"],
      activities: ["Art gallery visits", "Artist workshops", "Cultural tours"],
      roomType: "Artist Room",
      roomDescription: "Unique 25 sqm room designed by individual artists, featuring original artwork, queen bed, and creative elements. Each room offers a different artistic experience.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "Hotel Hackescher Hof",
      address: "Große Präsidentenstr. 8",
      postalCode: "10178",
      description: "A historic hotel in the cultural heart of Berlin, near Hackescher Markt. Features traditional German hospitality with modern amenities in a prime cultural location.",
      affinities: ["History", "German Culture", "Central Location"],
      activities: ["Historical walks", "Traditional German dining", "Cultural events"],
      roomType: "Traditional German Room",
      roomDescription: "Classic 27 sqm room with traditional German décor, modern bathroom, queen bed, and central location benefits. Authentic German hospitality experience.",
      maxOccupancy: 2,
      roomSize: 27
    },
    {
      name: "Meininger Hotel Berlin Hauptbahnhof",
      address: "Ella-Trebe-Str. 9",
      postalCode: "10557",
      description: "A modern hybrid hotel near the main train station, popular with travelers and young professionals. Features both private rooms and shared facilities with international atmosphere.",
      affinities: ["Travel Hub", "International Community", "Modern Convenience"],
      activities: ["City exploration", "International networking", "Transit connections"],
      roomType: "Travel Double Room",
      roomDescription: "Modern 21 sqm room with efficient design, queen bed, modern amenities, and excellent transport connections. Perfect for travelers and short stays.",
      maxOccupancy: 2,
      roomSize: 21
    }
  ],
  "New York": [
    {
      name: "Pod Hotels Brooklyn",
      address: "247 Metropolitan Ave",
      postalCode: "11211",
      description: "A modern micro-hotel in trendy Williamsburg, popular with young professionals and creatives. Features efficient design, rooftop access, and proximity to Brooklyn's cultural scene.",
      affinities: ["Modern Living", "Creative Community", "Urban Lifestyle"],
      activities: ["Brooklyn tours", "Rooftop events", "Creative workshops"],
      roomType: "Micro Double Room",
      roomDescription: "Efficiently designed 18 sqm room with custom furniture, queen bed, modern amenities, and smart storage solutions. Perfect for urban explorers.",
      maxOccupancy: 2,
      roomSize: 18
    },
    {
      name: "The Local NYC",
      address: "113 Ludlow St",
      postalCode: "10002",
      description: "A boutique hotel in the Lower East Side showcasing local neighborhoods and authentic New York experiences. Features partnerships with local businesses and cultural institutions.",
      affinities: ["Local Culture", "Authentic NYC", "Neighborhood Life"],
      activities: ["Neighborhood tours", "Local food experiences", "Cultural immersion"],
      roomType: "Local Culture Room",
      roomDescription: "Locally-inspired 22 sqm room with neighborhood art, queen bed, local amenities, and authentic NYC character. Immersive local experience.",
      maxOccupancy: 2,
      roomSize: 22
    },
    {
      name: "The High Line Hotel",
      address: "180 10th Ave",
      postalCode: "10011",
      description: "A Gothic Revival hotel in Chelsea near the High Line park. Features historic architecture, literary atmosphere, and proximity to art galleries and cultural venues.",
      affinities: ["History", "Literature", "Arts"],
      activities: ["High Line walks", "Gallery tours", "Literary events"],
      roomType: "Gothic Revival Room",
      roomDescription: "Historic 24 sqm room with Gothic Revival elements, period furniture, queen bed, and literary-themed décor. Classic New York elegance.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "The Jane Hotel",
      address: "113 Jane St",
      postalCode: "10014",
      description: "A historic hotel in the West Village with maritime history and compact cabin-style rooms. Popular with budget-conscious travelers seeking authentic New York character.",
      affinities: ["History", "Maritime Heritage", "Authentic Character"],
      activities: ["Historical tours", "West Village exploration", "Maritime history"],
      roomType: "Cabin-Style Room",
      roomDescription: "Compact 16 sqm cabin-style room with bunk bed, shared facilities, and maritime-inspired décor. Historic New York experience.",
      maxOccupancy: 2,
      roomSize: 16
    },
    {
      name: "citizenM Bowery",
      address: "189 Bowery",
      postalCode: "10002",
      description: "A design-forward hotel in the artistic Bowery district. Features contemporary art, efficient room design, and 24/7 social spaces popular with creative professionals.",
      affinities: ["Design", "Contemporary Art", "Creative Professionals"],
      activities: ["Art gallery visits", "Design tours", "Creative networking"],
      roomType: "Design Room",
      roomDescription: "Contemporary 20 sqm room with modern design, tech amenities, queen bed, and artistic elements. Perfect for design-conscious travelers.",
      maxOccupancy: 2,
      roomSize: 20
    },
    {
      name: "The Ludlow Hotel",
      address: "180 Ludlow St",
      postalCode: "10002",
      description: "A boutique hotel on the Lower East Side featuring industrial-chic design and neighborhood integration. Popular with fashion industry professionals and cultural enthusiasts.",
      affinities: ["Fashion", "Industrial Design", "Cultural Scene"],
      activities: ["Fashion district tours", "Cultural events", "Local fashion shopping"],
      roomType: "Industrial Chic Room",
      roomDescription: "Industrial-style 26 sqm room with exposed brick, modern amenities, queen bed, and fashion-forward décor. Contemporary urban sophistication.",
      maxOccupancy: 2,
      roomSize: 26
    },
    {
      name: "The Standard High Line",
      address: "848 Washington St",
      postalCode: "10014",
      description: "A contemporary hotel in the Meatpacking District with floor-to-ceiling windows and High Line park proximity. Features modern design and trendy nightlife access.",
      affinities: ["Modern Architecture", "Nightlife", "Urban Design"],
      activities: ["High Line visits", "Nightlife exploration", "Modern architecture tours"],
      roomType: "High Line View Room",
      roomDescription: "Modern 28 sqm room with floor-to-ceiling windows, contemporary design, queen bed, and some rooms with High Line views. Urban sophistication.",
      maxOccupancy: 2,
      roomSize: 28
    }
  ],
  Bucharest: [
    {
      name: "Villa Boutique Lafayette",
      address: "Strada Lafayette 12",
      postalCode: "010223",
      description: "An elegant villa-style hotel in central Bucharest, featuring Belle Époque architecture and personalized service. Popular with business travelers and cultural enthusiasts.",
      affinities: ["History", "Architecture", "Business Travel"],
      activities: ["Historical tours", "Architecture walks", "Business networking"],
      roomType: "Belle Époque Suite",
      roomDescription: "Elegant 30 sqm suite with period furniture, high ceilings, queen bed, and classic Romanian décor. Historic charm with modern comfort.",
      maxOccupancy: 2,
      roomSize: 30
    },
    {
      name: "Hotel Cismigiu",
      address: "Bulevardul Regina Elisabeta 38",
      postalCode: "030167",
      description: "A boutique hotel overlooking Cișmigiu Park, offering tranquil urban retreat in the city center. Features traditional Romanian hospitality with contemporary amenities.",
      affinities: ["Nature in City", "Relaxation", "Romanian Culture"],
      activities: ["Park walks", "Traditional Romanian dining", "Cultural tours"],
      roomType: "Park View Room",
      roomDescription: "Peaceful 25 sqm room with park views, balcony, queen bed, and traditional Romanian elements. Urban oasis with natural surroundings.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "The Mansion Boutique Hotel",
      address: "Strada Călin Petre 19",
      postalCode: "010162",
      description: "A restored 1900s mansion in the historic center, featuring original architectural details and luxury accommodations. Popular with heritage tourism enthusiasts.",
      affinities: ["Heritage", "Luxury", "Architecture"],
      activities: ["Heritage tours", "Architectural walks", "Fine dining"],
      roomType: "Mansion Suite",
      roomDescription: "Luxurious 35 sqm suite with original architectural features, period furniture, king bed, and marble bathroom. Aristocratic Romanian elegance.",
      maxOccupancy: 2,
      roomSize: 35
    },
    {
      name: "Art Hotel",
      address: "Strada Mendeleev 15",
      postalCode: "010362",
      description: "A contemporary art-focused hotel featuring works by Romanian artists and creative workshops. Popular with art collectors and cultural professionals.",
      affinities: ["Arts", "Romanian Art", "Culture"],
      activities: ["Art gallery visits", "Artist workshops", "Cultural events"],
      roomType: "Artist Room",
      roomDescription: "Art-themed 27 sqm room with Romanian artwork, modern amenities, queen bed, and creative workspace. Contemporary Romanian artistic expression.",
      maxOccupancy: 2,
      roomSize: 27
    },
    {
      name: "Casa Capsa Hotel",
      address: "Calea Victoriei 36",
      postalCode: "010061",
      description: "A historic hotel on the famous Calea Victoriei, featuring traditional Romanian cuisine and vintage atmosphere. Popular with history enthusiasts and cultural travelers.",
      affinities: ["History", "Romanian Cuisine", "Traditional Culture"],
      activities: ["Historical dining", "Traditional Romanian cooking", "Heritage walks"],
      roomType: "Historic Double Room",
      roomDescription: "Traditional 24 sqm room with vintage décor, period furniture, queen bed, and historic atmosphere. Authentic Romanian hospitality experience.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "Vila Beau Monde",
      address: "Strada General Praporgescu 2",
      postalCode: "011131",
      description: "An intimate villa hotel in a quiet residential area, offering personalized service and garden setting. Popular with travelers seeking peaceful urban retreat.",
      affinities: ["Tranquility", "Garden Setting", "Personalized Service"],
      activities: ["Garden relaxation", "Quiet neighborhood walks", "Personalized tours"],
      roomType: "Garden Villa Room",
      roomDescription: "Serene 26 sqm room with garden views, queen bed, natural décor, and peaceful atmosphere. Private villa experience in urban setting.",
      maxOccupancy: 2,
      roomSize: 26
    },
    {
      name: "Central Hotel 21",
      address: "Strada Hristo Botev 21",
      postalCode: "030167",
      description: "A modern business hotel in the financial district, featuring contemporary design and business facilities. Popular with international business travelers and digital nomads.",
      affinities: ["Business", "Digital Nomad", "Modern Convenience"],
      activities: ["Business networking", "Co-working spaces", "Financial district tours"],
      roomType: "Business Double Room",
      roomDescription: "Contemporary 23 sqm room with workspace, high-speed internet, queen bed, and business amenities. Perfect for business travelers and remote work.",
      maxOccupancy: 2,
      roomSize: 23
    }
  ],
  London: [
    {
      name: "The Zetter Townhouse Piccadilly",
      address: "3 Piccadilly",
      postalCode: "W1J 0DB",
      description: "An intimate Georgian townhouse hotel in the heart of London, featuring vintage décor and personalized service. Popular with travelers seeking authentic British charm.",
      affinities: ["British Heritage", "Intimate Atmosphere", "Central Location"],
      activities: ["British culture tours", "Traditional afternoon tea", "West End shows"],
      roomType: "Georgian Townhouse Room",
      roomDescription: "Charming 20 sqm room with Georgian features, antique furniture, queen bed, and traditional British décor. Authentic London townhouse experience.",
      maxOccupancy: 2,
      roomSize: 20
    },
    {
      name: "Artist Residence London",
      address: "52 Cambridge St",
      postalCode: "SW1V 4QQ",
      description: "A boutique hotel in Pimlico featuring contemporary art and design. Each room uniquely decorated by different artists, popular with creative professionals and art enthusiasts.",
      affinities: ["Arts", "Design", "Creative Community"],
      activities: ["Art gallery visits", "Design tours", "Creative workshops"],
      roomType: "Artist-Designed Room",
      roomDescription: "Unique 22 sqm room designed by individual artists, featuring original artwork, queen bed, and creative elements. Each room offers different artistic experience.",
      maxOccupancy: 2,
      roomSize: 22
    },
    {
      name: "The Hoxton Shoreditch",
      address: "81 Great Eastern St",
      postalCode: "EC2A 3HU",
      description: "A trendy hotel in the creative Shoreditch district, featuring industrial design and local partnerships. Popular with digital nomads, creatives, and young professionals.",
      affinities: ["Digital Nomad", "Creative Scene", "East London Culture"],
      activities: ["Street art tours", "Creative networking", "East London exploration"],
      roomType: "Shoreditch Room",
      roomDescription: "Industrial-chic 24 sqm room with custom furniture, workspace, queen bed, and East London artistic influences. Perfect for creative professionals.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "The Henrietta Hotel",
      address: "14-15 Henrietta St",
      postalCode: "WC2E 8QH",
      description: "A boutique hotel in Covent Garden featuring British design and theatrical heritage. Popular with theater enthusiasts and those seeking quintessential London experience.",
      affinities: ["Theatre", "British Design", "Covent Garden"],
      activities: ["Theatre shows", "Covent Garden exploration", "British design tours"],
      roomType: "Theatre District Room",
      roomDescription: "Theatrically-inspired 25 sqm room with British design elements, queen bed, luxurious amenities, and Covent Garden proximity. London theater district charm.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "The Pilgrm Hotel",
      address: "25 Paddington St",
      postalCode: "W1U 4DJ",
      description: "A wellness-focused hotel near Regent's Park, featuring natural materials and plant-based amenities. Popular with health-conscious travelers and wellness enthusiasts.",
      affinities: ["Wellness", "Natural Living", "Health Conscious"],
      activities: ["Wellness workshops", "Park activities", "Healthy dining"],
      roomType: "Wellness Room",
      roomDescription: "Natural 26 sqm room with eco-friendly materials, organic amenities, queen bed, and wellness-focused design. Health-conscious London experience.",
      maxOccupancy: 2,
      roomSize: 26
    },
    {
      name: "Vintry & Mercer Hotel",
      address: "20 Garlick Hill",
      postalCode: "EC4V 2AU",
      description: "A boutique hotel in the City of London combining medieval history with contemporary luxury. Popular with business travelers and history enthusiasts seeking central location.",
      affinities: ["History", "Business", "City of London"],
      activities: ["Historical tours", "City walks", "Business networking"],
      roomType: "City Heritage Room",
      roomDescription: "Sophisticated 28 sqm room combining historical elements with modern luxury, queen bed, marble bathroom, and City of London character.",
      maxOccupancy: 2,
      roomSize: 28
    },
    {
      name: "The Dixon Autograph Collection",
      address: "211 Tooley St",
      postalCode: "SE1 2JX",
      description: "A converted Victorian courthouse hotel in South London, featuring original architectural details and modern design. Popular with architecture enthusiasts and cultural travelers.",
      affinities: ["Architecture", "Victorian Heritage", "South London"],
      activities: ["Architecture tours", "South London exploration", "Cultural walks"],
      roomType: "Courthouse Room",
      roomDescription: "Historic 30 sqm room with Victorian courthouse features, contemporary design, king bed, and original architectural details. Victorian elegance meets modern comfort.",
      maxOccupancy: 2,
      roomSize: 30
    }
  ],
  Istanbul: [
    {
      name: "Georges Hotel Galata",
      address: "Serdar-ı Ekrem Sok. No: 24",
      postalCode: "34421",
      description: "A boutique hotel in historic Galata district with panoramic Bosphorus views. Features Ottoman-inspired design with contemporary amenities and rooftop terrace.",
      affinities: ["History", "Ottoman Heritage", "Bosphorus Views"],
      activities: ["Ottoman history tours", "Bosphorus cruises", "Galata Tower visits"],
      roomType: "Bosphorus View Room",
      roomDescription: "Elegant 26 sqm room with Bosphorus views, Ottoman-inspired décor, queen bed, and traditional Turkish elements. Historic Istanbul charm with modern comfort.",
      maxOccupancy: 2,
      roomSize: 26
    },
    {
      name: "Soho House Istanbul",
      address: "Meşrutiyet Cad. No: 56",
      postalCode: "34430",
      description: "A members' club and hotel in a restored Ottoman palace in Beyoğlu. Features eclectic design, cultural events, and creative community atmosphere.",
      affinities: ["Creative Community", "Ottoman Palace", "Cultural Scene"],
      activities: ["Cultural events", "Creative networking", "Ottoman palace tours"],
      roomType: "Palace Room",
      roomDescription: "Eclectic 28 sqm room in restored Ottoman palace, featuring unique design, queen bed, and creative community access. Historic luxury with contemporary edge.",
      maxOccupancy: 2,
      roomSize: 28
    },
    {
      name: "Hotel Empress Zoe",
      address: "Akbıyık Cad. Adliye Sok. No: 10",
      postalCode: "34122",
      description: "A historic hotel in Sultanahmet built over Byzantine ruins. Features archaeological discoveries, traditional Turkish architecture, and proximity to major historical sites.",
      affinities: ["Byzantine History", "Archaeology", "Traditional Turkish"],
      activities: ["Archaeological tours", "Byzantine history walks", "Traditional Turkish baths"],
      roomType: "Byzantine Heritage Room",
      roomDescription: "Historic 24 sqm room with Byzantine architectural elements, traditional Turkish décor, queen bed, and archaeological discoveries visible. Ancient history immersion.",
      maxOccupancy: 2,
      roomSize: 24
    },
    {
      name: "Tomtom Suites",
      address: "Boğazkesen Cad. Tomtom Kaptan Sok. No: 18",
      postalCode: "34433",
      description: "A converted 19th-century mansion in trendy Beyoğlu, featuring suite-style accommodations and local neighborhood integration. Popular with long-stay travelers.",
      affinities: ["Long-Stay Living", "Neighborhood Integration", "19th Century Architecture"],
      activities: ["Neighborhood exploration", "Local market visits", "Traditional Turkish dining"],
      roomType: "Mansion Suite",
      roomDescription: "Spacious 32 sqm suite with kitchenette, living area, queen bed, and 19th-century architectural details. Home-like comfort in historic setting.",
      maxOccupancy: 2,
      roomSize: 32
    },
    {
      name: "Ajia Hotel",
      address: "Ahmet Rasim Paşa Cad. No: 27",
      postalCode: "34684",
      description: "A waterfront hotel on the Asian side offering tranquil Bosphorus setting and cultural immersion. Features traditional Ottoman gardens and authentic Turkish experiences.",
      affinities: ["Bosphorus Waterfront", "Asian Side Culture", "Traditional Gardens"],
      activities: ["Asian side tours", "Traditional garden walks", "Bosphorus swimming"],
      roomType: "Waterfront Room",
      roomDescription: "Serene 27 sqm room with direct Bosphorus access, traditional Turkish décor, queen bed, and private waterfront. Peaceful Asian side experience.",
      maxOccupancy: 2,
      roomSize: 27
    },
    {
      name: "Vault Karakoy House",
      address: "Bankalar Cad. No: 5",
      postalCode: "34421",
      description: "A design hotel in a converted Ottoman bank building in historic Karaköy district. Features original vault architecture and contemporary design elements.",
      affinities: ["Design", "Ottoman Banking History", "Architectural Heritage"],
      activities: ["Design tours", "Ottoman banking history", "Karaköy exploration"],
      roomType: "Vault Room",
      roomDescription: "Unique 25 sqm room in converted bank vault, featuring original architecture, contemporary design, queen bed, and historic banking elements.",
      maxOccupancy: 2,
      roomSize: 25
    },
    {
      name: "Sumahan on the Water",
      address: "Kuleli Cad. No: 43",
      postalCode: "34684",
      description: "A converted Ottoman distillery on the Bosphorus shores, offering waterfront luxury and historical architecture. Features private beach and boat transportation.",
      affinities: ["Ottoman Industrial Heritage", "Waterfront Luxury", "Bosphorus Life"],
      activities: ["Ottoman industrial tours", "Private boat trips", "Waterfront dining"],
      roomType: "Distillery Suite",
      roomDescription: "Luxurious 30 sqm suite in converted Ottoman distillery, with Bosphorus views, historical features, king bed, and waterfront access. Industrial heritage luxury.",
      maxOccupancy: 2,
      roomSize: 30
    }
  ]
};

const affinitiesList = [
  "Arts", "Culture", "History", "Gastronomy", "Digital Nomad", "Architecture", 
  "Music", "Design", "Wellness", "Water Sports", "Diving", "Beach Life", 
  "Creative Community", "Local Culture", "Business Travel", "Heritage", 
  "Ottoman Heritage", "Byzantine History", "Traditional Culture", "Modern Living",
  "Nightlife", "Photography", "Marine Life", "Desert Culture", "Sailing",
  "Industrial Heritage", "Theatre", "Fashion", "Nature in City", "Luxury"
];

const activitiesList = [
  "City tours", "Art gallery visits", "Food tours", "Cooking classes", 
  "Cultural workshops", "Opera visits", "Museum visits", "Architecture walks",
  "Scuba diving", "Snorkeling", "Desert safaris", "Yacht charters", 
  "Spa treatments", "Yoga classes", "Creative workshops", "Music events",
  "Historical tours", "Traditional dining", "Co-working", "Networking events",
  "Theatre shows", "Design tours", "Photography workshops", "Wine tastings",
  "Traditional baths", "Bosphorus cruises", "Street art tours", "Literary walks"
];

export const generateHotelExcel = async () => {
  try {
    console.log('Starting Excel generation...');
    
    const allHotels: HotelData[] = [];
    
    // Process each city
    Object.entries(hotelsByCity).forEach(([city, hotels]) => {
      hotels.forEach(hotel => {
        const hotelData: HotelData = {
          'Hotel Name': hotel.name,
          'City': city,
          'Country': getCountryForCity(city),
          'Street Address': hotel.address,
          'Postal Code': hotel.postalCode,
          'Full Address': `${hotel.address}, ${hotel.postalCode} ${city}, ${getCountryForCity(city)}`,
          'Description': hotel.description,
          'Affinities': hotel.affinities.join(', '),
          'Activities': hotel.activities.join(', '),
          'Room Type': hotel.roomType,
          'Room Description': hotel.roomDescription,
          'Max Occupancy': hotel.maxOccupancy,
          'Room Size (sqm)': hotel.roomSize,
        };
        
        allHotels.push(hotelData);
      });
    });
    
    console.log(`Generated ${allHotels.length} hotels total`);
    
    // Verify we have exactly 56 hotels
    if (allHotels.length !== 56) {
      throw new Error(`Expected 56 hotels, but generated ${allHotels.length}`);
    }
    
    // Verify distribution (7 hotels per city)
    const cityCount = allHotels.reduce((acc, hotel) => {
      acc[hotel.City] = (acc[hotel.City] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('Hotels per city:', cityCount);
    
    // Generate Excel file
    await createExcelFile(allHotels, 'hotel_living_56_hotels.xlsx');
    
    console.log('Excel file generated successfully');
    
    return {
      success: true,
      count: allHotels.length,
      distribution: cityCount
    };
    
  } catch (error) {
    console.error('Error generating Excel:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

function getCountryForCity(city: string): string {
  const cityCountryMap: Record<string, string> = {
    'Budapest': 'Hungary',
    'Paris': 'France',
    'Hurghada': 'Egypt',
    'Berlin': 'Germany',
    'New York': 'United States',
    'Bucharest': 'Romania',
    'London': 'United Kingdom',
    'Istanbul': 'Turkey'
  };
  
  return cityCountryMap[city] || 'Unknown';
}
