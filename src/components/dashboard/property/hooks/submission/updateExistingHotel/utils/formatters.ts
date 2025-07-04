
import { format, parseISO } from "date-fns";

export const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currency,
    maximumFractionDigits: 0 
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString;
  }
};
