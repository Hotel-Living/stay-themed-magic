
import { createExcelFile } from './lazyExcel';

interface HotelData {
  NAME: string;
  CITY: string;
  CATEGORY: string;
  'ADDRESS (Street and number)': string;
  'Postal code': string;
  'Hotel Description': string;
  'Latitude/Longitude': string;
}

const categories = [
  'Boutique Hotel',
  'Business Hotel',
  'City Hotel',
  'Historic Hotel',
  'Design Hotel',
  'Comfort Hotel',
  'Urban Hotel',
  'Contemporary Hotel'
];

const cityData = {
  Budapest: {
    country: 'Hungary',
    hotels: [
      { name: 'Aria Hotel Budapest', address: 'Hercegprímás utca 5', postal: '1051', lat: 47.4979, lng: 19.0402 },
      { name: 'Casati Budapest Hotel', address: 'Paulay Ede utca 31', postal: '1061', lat: 47.5014, lng: 19.0620 },
      { name: 'Hotel Moments Budapest', address: 'Andrássy út 8', postal: '1061', lat: 47.5040, lng: 19.0580 },
      { name: 'Parlament Hotel', address: 'Kálmán Imre utca 19', postal: '1054', lat: 47.5080, lng: 19.0460 },
      { name: 'Hotel Pest-Buda', address: 'Fortuna utca 3', postal: '1014', lat: 47.5020, lng: 19.0340 },
      { name: 'Hotel Clark Budapest', address: 'Dob utca 26', postal: '1072', lat: 47.4990, lng: 19.0650 },
      { name: 'Hotel Palazzo Zichy', address: 'Lőrinc pap tér 2', postal: '1053', lat: 47.4950, lng: 19.0580 }
    ]
  },
  Paris: {
    country: 'France',
    hotels: [
      { name: 'Hotel des Grands Boulevards', address: '17 Boulevard Poissonnière', postal: '75002', lat: 48.8708, lng: 2.3430 },
      { name: 'Hotel Malte Opera', address: '63 Rue de Richelieu', postal: '75002', lat: 48.8687, lng: 2.3380 },
      { name: 'Hotel Therese', address: '5-7 Rue Thérèse', postal: '75001', lat: 48.8650, lng: 2.3350 },
      { name: 'Hotel Saint-Marc', address: '36 Rue Saint-Marc', postal: '75002', lat: 48.8695, lng: 2.3405 },
      { name: 'Hotel Chopin', address: '10 Boulevard Montmartre', postal: '75009', lat: 48.8715, lng: 2.3420 },
      { name: 'Hotel Jeanne d Arc', address: '3 Rue de Jarente', postal: '75004', lat: 48.8550, lng: 2.3610 },
      { name: 'Hotel des Deux Iles', address: '59 Rue Saint-Louis en l Île', postal: '75004', lat: 48.8520, lng: 2.3580 }
    ]
  },
  Hurghada: {
    country: 'Egypt',
    hotels: [
      { name: 'Steigenberger Aqua Magic', address: 'Safaga Road', postal: '84511', lat: 27.2579, lng: 33.8116 },
      { name: 'Coral Beach Hurghada Resort', address: 'Corniche Road', postal: '84511', lat: 27.2400, lng: 33.8200 },
      { name: 'Desert Rose Resort', address: 'Safaga Road Km 10', postal: '84511', lat: 27.2300, lng: 33.8300 },
      { name: 'Hurghada Marriott Beach Resort', address: 'Corniche Road', postal: '84511', lat: 27.2450, lng: 33.8150 },
      { name: 'Albatros Aqua Park Resort', address: 'Safaga Road Km 12', postal: '84511', lat: 27.2200, lng: 33.8400 },
      { name: 'Golden Beach Resort', address: 'El Corniche Road', postal: '84511', lat: 27.2380, lng: 33.8180 },
      { name: 'Sunset Beach Resort', address: 'Safaga Road Km 8', postal: '84511', lat: 27.2320, lng: 33.8250 }
    ]
  },
  Berlin: {
    country: 'Germany',
    hotels: [
      { name: 'Hackescher Hof', address: 'Große Präsidentenstraße 8', postal: '10178', lat: 52.5200, lng: 13.4050 },
      { name: 'Hotel Augustinenhof', address: 'Auguststraße 82', postal: '10117', lat: 52.5250, lng: 13.3950 },
      { name: 'Hotel Bleibtreu Berlin', address: 'Bleibtreustraße 31', postal: '10707', lat: 52.5030, lng: 13.3280 },
      { name: 'Hotel Hackischer Markt', address: 'Große Präsidentenstraße 6', postal: '10178', lat: 52.5210, lng: 13.4040 },
      { name: 'Hotel Pension Funk', address: 'Fasanenstraße 69', postal: '10719', lat: 52.4950, lng: 13.3200 },
      { name: 'Hotel Propeller Island City Lodge', address: 'Albrecht-Achilles-Straße 58', postal: '10709', lat: 52.4980, lng: 13.3150 },
      { name: 'Hotel Residenz Begaswinkel', address: 'Paretzer Straße 2', postal: '10713', lat: 52.4920, lng: 13.3080 }
    ]
  },
  'New York': {
    country: 'United States',
    hotels: [
      { name: 'Pod Brooklyn', address: '247 Metropolitan Avenue', postal: '11211', lat: 40.7150, lng: -73.9620 },
      { name: 'The High Line Hotel', address: '180 10th Avenue', postal: '10011', lat: 40.7420, lng: -74.0050 },
      { name: 'Hotel Americano', address: '518 W 27th Street', postal: '10001', lat: 40.7500, lng: -74.0020 },
      { name: 'The Jane Hotel', address: '113 Jane Street', postal: '10014', lat: 40.7380, lng: -74.0080 },
      { name: 'Hotel Gansevoort Meatpacking', address: '18 9th Avenue', postal: '10014', lat: 40.7400, lng: -74.0060 },
      { name: 'Pod Times Square', address: '400 W 42nd Street', postal: '10036', lat: 40.7580, lng: -73.9910 },
      { name: 'Hotel Hugo', address: '525 Greenwich Street', postal: '10013', lat: 40.7220, lng: -74.0090 }
    ]
  },
  Bucharest: {
    country: 'Romania',
    hotels: [
      { name: 'Hotel Cismigiu', address: 'Bulevardul Regina Elisabeta 38', postal: '030167', lat: 44.4378, lng: 26.0950 },
      { name: 'Hotel Capsa', address: 'Calea Victoriei 36', postal: '010061', lat: 44.4420, lng: 26.0970 },
      { name: 'Villa Frieda', address: 'Strada Polonă 15', postal: '010494', lat: 44.4450, lng: 26.0920 },
      { name: 'Hotel Berthelot', address: 'Strada Berthelot 60', postal: '010168', lat: 44.4200, lng: 26.1100 },
      { name: 'Hotel Amzei', address: 'Strada George Enescu 8-10', postal: '010301', lat: 44.4480, lng: 26.0980 },
      { name: 'Hotel Mozart', address: 'Strada Academiei 13', postal: '010011', lat: 44.4350, lng: 26.0960 },
      { name: 'Hotel Opera', address: 'Strada Ion Brezoianu 37', postal: '010131', lat: 44.4320, lng: 26.1020 }
    ]
  },
  London: {
    country: 'United Kingdom',
    hotels: [
      { name: 'The Zetter Townhouse Piccadilly', address: '3 Dover Street', postal: 'W1S 4LD', lat: 51.5080, lng: -0.1420 },
      { name: 'Artist Residence London', address: '52 Cambridge Street', postal: 'SW1V 4QQ', lat: 51.4920, lng: -0.1450 },
      { name: 'The Hoxton Southwark', address: '32 Southwark Street', postal: 'SE1 1TU', lat: 51.5040, lng: -0.0950 },
      { name: 'Hotel Amano London', address: '10 Argyle Street', postal: 'WC1H 8EG', lat: 51.5250, lng: -0.1300 },
      { name: 'The Resident Covent Garden', address: '51 Earlham Street', postal: 'WC2H 9LJ', lat: 51.5150, lng: -0.1280 },
      { name: 'Z Hotel Piccadilly', address: '2 Orange Street', postal: 'WC2H 7DF', lat: 51.5100, lng: -0.1320 },
      { name: 'Point A Hotel London Paddington', address: '23-24 Praed Street', postal: 'W2 1NP', lat: 51.5150, lng: -0.1750 }
    ]
  },
  Istanbul: {
    country: 'Turkey',
    hotels: [
      { name: 'Hotel Amira Istanbul', address: 'Küçük Ayasofya Caddesi 74', postal: '34122', lat: 41.0058, lng: 28.9731 },
      { name: 'Hotel Basileus', address: 'Barbaros Hayrettin Paşa Sk. 11', postal: '34122', lat: 41.0070, lng: 28.9720 },
      { name: 'Hotel Sultania', address: 'Ebusuud Caddesi 20', postal: '34110', lat: 41.0120, lng: 28.9680 },
      { name: 'Hotel Poem', address: 'Terzihane Sokak 12', postal: '34122', lat: 41.0080, lng: 28.9750 },
      { name: 'Hotel Nena', address: 'Binbirdirek Mahallesi Dizdariye Çeşmesi Sk. 8', postal: '34122', lat: 41.0060, lng: 28.9740 },
      { name: 'Hotel Arcadia Blue', address: 'Dr. Imran Ökem Caddesi 1', postal: '34122', lat: 41.0040, lng: 28.9760 },
      { name: 'Hotel Empress Zoe', address: 'Akbıyık Caddesi 10', postal: '34122', lat: 41.0050, lng: 28.9770 }
    ]
  }
};

const generateRandomDescription = (): string => {
  const descriptions = [
    'A charming boutique hotel offering modern comfort in a historic setting. Features elegantly appointed rooms with premium amenities and personalized service.',
    'Contemporary urban retreat with stylish accommodations and exceptional hospitality. Perfect for both business and leisure travelers seeking quality and convenience.',
    'Intimate hotel combining traditional charm with modern luxury. Offers comfortable rooms, excellent dining options, and prime location near major attractions.',
    'Sophisticated hotel featuring well-designed rooms and suites with modern amenities. Provides exceptional service and convenient access to city highlights.',
    'Comfortable and elegant hotel with attention to detail and warm hospitality. Features spacious rooms, quality furnishings, and excellent location.',
    'Modern hotel offering contemporary comfort and style. Well-appointed rooms with premium amenities and convenient access to local attractions and business districts.',
    'Charming property with character and modern conveniences. Provides comfortable accommodations, attentive service, and prime location for exploring the city.',
    'Stylish hotel combining comfort and sophistication. Features modern rooms with quality amenities and convenient location near shopping, dining, and cultural sites.'
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateRandomCategory = (): string => {
  return categories[Math.floor(Math.random() * categories.length)];
};

export const generateHotelExcel = async (): Promise<{ success: boolean; count?: number; error?: string }> => {
  try {
    const hotels: HotelData[] = [];
    
    // Generate 7 hotels for each city
    Object.entries(cityData).forEach(([cityName, cityInfo]) => {
      cityInfo.hotels.forEach(hotel => {
        hotels.push({
          NAME: hotel.name,
          CITY: cityName,
          CATEGORY: generateRandomCategory(),
          'ADDRESS (Street and number)': hotel.address,
          'Postal code': hotel.postal,
          'Hotel Description': generateRandomDescription(),
          'Latitude/Longitude': hotel.lat && hotel.lng ? `${hotel.lat}, ${hotel.lng}` : 'Not available'
        });
      });
    });

    // Create Excel file with the specified filename
    await createExcelFile(hotels, 'hotel_living_56_hotels.xlsx');
    
    return { success: true, count: hotels.length };
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
