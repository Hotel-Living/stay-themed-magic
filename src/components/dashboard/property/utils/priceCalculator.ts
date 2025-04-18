
export const calculateAveragePrice = (roomTypes: any[]): number => {
  if (roomTypes.length === 0) return 0;
  
  let totalPrice = 0;
  let rateCount = 0;
  
  roomTypes.forEach(room => {
    if (room.rates) {
      Object.values(room.rates).forEach((rate: any) => {
        if (typeof rate === 'number' && rate > 0) {
          totalPrice += rate;
          rateCount++;
        }
      });
    }
  });
  
  return rateCount > 0 ? Math.round(totalPrice / rateCount) : 0;
};
