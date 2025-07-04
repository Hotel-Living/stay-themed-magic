
// Top 10 most important cities by country
export const countryCities: Record<string, string[]> = {
  "Spain": [
    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", 
    "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"
  ],
  "France": [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", 
    "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille"
  ],
  "Italy": [
    "Rome", "Milan", "Naples", "Turin", "Palermo", 
    "Genoa", "Bologna", "Florence", "Bari", "Catania"
  ],
  "United States": [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", 
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
  ],
  "Egypt": [
    "Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", 
    "Suez", "Luxor", "Aswan", "Mansoura", "Tanta"
  ],
  "Turkey": [
    "Istanbul", "Ankara", "Izmir", "Bursa", "Adana", 
    "Gaziantep", "Konya", "Antalya", "Kayseri", "Mersin"
  ],
  "United Kingdom": [
    "London", "Birmingham", "Manchester", "Glasgow", "Liverpool", 
    "Leeds", "Sheffield", "Edinburgh", "Bristol", "Cardiff"
  ],
  "Germany": [
    "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", 
    "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen"
  ],
  "Portugal": [
    "Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", 
    "Funchal", "Coimbra", "Setúbal", "Almada", "Agualva-Cacém"
  ],
  "Greece": [
    "Athens", "Thessaloniki", "Patras", "Piraeus", "Larissa", 
    "Heraklion", "Peristeri", "Kallithea", "Acharnes", "Kalamaria"
  ]
};

export const getCitiesForCountry = (countryName: string): string[] => {
  return countryCities[countryName] || [];
};
