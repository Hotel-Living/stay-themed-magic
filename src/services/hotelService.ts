import { Hotel } from '@/components/hotels/HotelTypes';
import { FilterState } from '@/components/filters/FilterTypes';

export const filterHotels = (hotels: Hotel[], filters: FilterState): Hotel[] => {
  return hotels.filter(hotel => {
    // Country filter
    if (filters.country && hotel.country !== filters.country) {
      return false;
    }

    // Location filter
    if (filters.location && hotel.city !== filters.location) {
      return false;
    }

    // Property type filter
    if (filters.propertyType && hotel.property_type !== filters.propertyType) {
      return false;
    }

    // Property style filter
    if (filters.propertyStyle && hotel.property_style !== filters.propertyStyle) {
      return false;
    }

    // Theme filter
    if (filters.theme && typeof filters.theme === 'object' && filters.theme.id && hotel.theme_id !== filters.theme.id) {
      return false;
    }

    // Price range filter
    if (filters.priceRange && hotel.price_per_month) {
      const price = hotel.price_per_month;
      switch (filters.priceRange) {
        case 1000:
          if (price > 1000) return false;
          break;
        case 1500:
          if (price < 1000 || price > 1500) return false;
          break;
        case 2000:
          if (price < 1500 || price > 2000) return false;
          break;
        case 999999:
          if (price <= 2000) return false;
          break;
        default:
          break;
      }
    }

    // Max price filter (legacy)
    if (filters.maxPrice && hotel.price_per_month && hotel.price_per_month > filters.maxPrice) {
      return false;
    }

    // Min price filter (legacy)
    if (filters.minPrice && hotel.price_per_month && hotel.price_per_month < filters.minPrice) {
      return false;
    }

    // Stay lengths filter - handle as number, not string
    if (filters.stayLengths && hotel.min_stay_length) {
      const filterStayLength = filters.stayLengths;
      const hotelMinStay = hotel.min_stay_length;
      
      if (hotelMinStay > filterStayLength) return false;
    }

    // Activities filter
    if (filters.activities && filters.activities.length > 0) {
      const hotelActivities = hotel.activities ? hotel.activities.split(',') : [];
      if (!filters.activities.every(activity => hotelActivities.includes(activity))) {
        return false;
      }
    }

    // Stars filter
    if (filters.stars && filters.stars.length > 0) {
      if (!filters.stars.includes(String(hotel.stars))) {
        return false;
      }
    }

    // Month filter
    if (filters.month && hotel.available_months && !hotel.available_months.includes(filters.month)) {
      return false;
    }

    // Day range filter
    if (filters.dayRange && hotel.available_days && !hotel.available_days.includes(String(filters.dayRange))) {
      return false;
    }

    // Meal plan filter
    if (filters.mealPlan && hotel.meal_plan !== filters.mealPlan) {
      return false;
    }

    // Room types filter
    if (filters.roomTypes && filters.roomTypes.length > 0) {
      const hotelRoomTypes = hotel.room_types ? hotel.room_types.split(',') : [];
      if (!filters.roomTypes.every(roomType => hotelRoomTypes.includes(roomType))) {
        return false;
      }
    }

    // Hotel services filter
    if (filters.hotelServices && filters.hotelServices.length > 0) {
      const hotelServices = hotel.hotel_services ? hotel.hotel_services.split(',') : [];
      if (!filters.hotelServices.every(service => hotelServices.includes(service))) {
        return false;
      }
    }

    // Room services filter
    if (filters.roomServices && filters.roomServices.length > 0) {
      const roomServices = hotel.room_services ? hotel.room_services.split(',') : [];
      if (!filters.roomServices.every(service => roomServices.includes(service))) {
        return false;
      }
    }

    // Search term filter
    if (filters.searchTerm && filters.searchTerm.trim()) {
      const searchTerm = filters.searchTerm.toLowerCase().trim();
      const searchableText = `${hotel.name} ${hotel.description || ''} ${hotel.city || ''} ${hotel.country || ''}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }

    return true;
  });
};
