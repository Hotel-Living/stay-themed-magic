
import { mockActivities, mockCountries, mockCities, mockPropertyTypes, mockPropertyStyles, mockThemes } from "@/components/simulation/MockFilterData";

export const useMockFilterData = () => {
  return {
    activities: mockActivities,
    countries: mockCountries,
    cities: mockCities,
    propertyTypes: mockPropertyTypes,
    propertyStyles: mockPropertyStyles,
    themes: mockThemes,
    loading: false,
    error: null
  };
};
