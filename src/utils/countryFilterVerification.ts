import { supabase } from '@/integrations/supabase/client';

// Verification function for country filters
export const verifyCountryFilters = async () => {
  console.log('🔍 COUNTRY FILTER VERIFICATION LOG');
  console.log('==================================');
  
  // List of all 47 countries with their ISO codes
  const countries = [
    { code: 'AR', name: 'Argentina' },
    { code: 'DE', name: 'Germany' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'HR', name: 'Croatia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EG', name: 'Egypt' },
    { code: 'ES', name: 'Spain' },
    { code: 'US', name: 'United States' },
    { code: 'EE', name: 'Estonia' },
    { code: 'PH', name: 'Philippines' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GR', name: 'Greece' },
    { code: 'HU', name: 'Hungary' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MT', name: 'Malta' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NO', name: 'Norway' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'RO', name: 'Romania' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TR', name: 'Turkey' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'KR', name: 'South Korea' }
  ];

  const countryCodeToValues: Record<string, string[]> = {
    'AR': ['Argentina', 'ar'],
    'DE': ['Germany', 'Alemania', 'de'],
    'AU': ['Australia', 'au'],
    'AT': ['Austria', 'at'],
    'BE': ['Belgium', 'Bélgica', 'be'],
    'BR': ['Brazil', 'Brasil', 'br'],
    'CA': ['Canada', 'Canadá', 'ca'],
    'CO': ['Colombia', 'co'],
    'CR': ['Costa Rica', 'cr'],
    'HR': ['Croatia', 'Croacia', 'hr'],
    'DK': ['Denmark', 'Dinamarca', 'dk'],
    'EG': ['Egypt', 'Egipto', 'eg'],
    'ES': ['Spain', 'España', 'es'],
    'US': ['United States', 'Estados Unidos', 'USA', 'us'],
    'EE': ['Estonia', 'ee'],
    'PH': ['Philippines', 'Filipinas', 'ph'],
    'FI': ['Finland', 'Finlandia', 'fi'],
    'FR': ['France', 'Francia', 'FR', 'fr'],
    'GR': ['Greece', 'Grecia', 'GR', 'gr'],
    'HU': ['Hungary', 'Hungría', 'hu'],
    'ID': ['Indonesia', 'id'],
    'IE': ['Ireland', 'Irlanda', 'ie'],
    'IS': ['Iceland', 'Islandia', 'is'],
    'IT': ['Italy', 'Italia', 'it'],
    'JP': ['Japan', 'Japón', 'jp'],
    'LU': ['Luxembourg', 'Luxemburgo', 'lu'],
    'MY': ['Malaysia', 'my'],
    'MT': ['Malta', 'mt'],
    'MA': ['Morocco', 'Marruecos', 'ma'],
    'MX': ['Mexico', 'México', 'mx'],
    'NO': ['Norway', 'Noruega', 'no'],
    'NZ': ['New Zealand', 'Nueva Zelanda', 'nz'],
    'NL': ['Netherlands', 'Países Bajos', 'nl'],
    'PL': ['Poland', 'Polonia', 'pl'],
    'PT': ['Portugal', 'PT', 'pt'],
    'GB': ['United Kingdom', 'Reino Unido', 'gb'],
    'CZ': ['Czech Republic', 'República Checa', 'cz'],
    'RO': ['Romania', 'Rumanía', 'ro'],
    'LK': ['Sri Lanka', 'lk'],
    'ZA': ['South Africa', 'Sudáfrica', 'za'],
    'SE': ['Sweden', 'Suecia', 'se'],
    'CH': ['Switzerland', 'Suiza', 'ch'],
    'TH': ['Thailand', 'Tailandia', 'th'],
    'TR': ['Turkey', 'Turquía', 'TR', 'tr'],
    'UY': ['Uruguay', 'uy'],
    'VN': ['Vietnam', 'vn'],
    'KR': ['South Korea', 'Corea del Sur', 'kr']
  };

  for (const country of countries) {
    try {
      const possibleValues = countryCodeToValues[country.code] || [country.code];
      
      // Build the query with OR conditions for each possible value
      let query = supabase
        .from('hotels')
        .select('id, name, country')
        .eq('status', 'approved');
        
      query = query.or(possibleValues.map(value => `country.eq.${value}`).join(','));
      
      const { data: hotels, error } = await query;
      
      if (error) {
        console.log(`❌ ${country.name} (${country.code}) - ERROR: ${error.message}`);
      } else {
        const count = hotels?.length || 0;
        const status = count > 0 ? '✅ OK' : '⚠️  NO HOTELS';
        console.log(`${status} ${country.name} (${country.code}) - ${count} hotels`);
        
        if (count > 0) {
          // Show which database values were found
          const foundValues = [...new Set(hotels.map(h => h.country))];
          console.log(`   Found DB values: [${foundValues.join(', ')}]`);
        }
      }
    } catch (err) {
      console.log(`❌ ${country.name} (${country.code}) - EXCEPTION: ${err}`);
    }
  }
  
  console.log('==================================');
  console.log('✅ Country filter verification complete');
}