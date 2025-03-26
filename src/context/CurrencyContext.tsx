import React, { createContext, useContext, useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";

// Available currencies
export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "CHF" | "INR";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

// Currency context type
type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amount: number) => string;
  currencies: Currency[];
};

// Available currencies data
export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", name: "Euro" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound" },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  CHF: { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee" },
};

// Map country codes to currency codes
const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  // Euro countries
  "AT": "EUR", "BE": "EUR", "CY": "EUR", "EE": "EUR", "FI": "EUR",
  "FR": "EUR", "DE": "EUR", "GR": "EUR", "IE": "EUR", "IT": "EUR",
  "LV": "EUR", "LT": "EUR", "LU": "EUR", "MT": "EUR", "NL": "EUR",
  "PT": "EUR", "SK": "EUR", "SI": "EUR", "ES": "EUR",
  // Other currencies
  "GB": "GBP", "UK": "GBP",
  "JP": "JPY",
  "CH": "CHF",
  "IN": "INR",
  // Default
  "US": "USD"
};

// Exchange rates (approximate, would be replaced by an API in production)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.41,
  CHF: 0.89,
  INR: 83.36,
};

// Default context
const defaultContext: CurrencyContextType = {
  currency: CURRENCIES.USD,
  setCurrency: () => {},
  formatPrice: () => "",
  currencies: Object.values(CURRENCIES),
};

// Create context
const CurrencyContext = createContext<CurrencyContextType>(defaultContext);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { countryCode: geoCountryCode, loading: geoLoading } = useGeolocation();
  
  // Get currency from localStorage, geolocation, or default to USD
  const getInitialCurrency = (): Currency => {
    // First check localStorage
    const savedCurrency = localStorage.getItem("userCurrency") as CurrencyCode;
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      return CURRENCIES[savedCurrency];
    }
    
    // Then check geolocation if available
    if (!geoLoading && geoCountryCode) {
      const geoCurrency = COUNTRY_TO_CURRENCY[geoCountryCode] || "USD";
      if (CURRENCIES[geoCurrency]) {
        return CURRENCIES[geoCurrency];
      }
    }
    
    // Default to USD
    return CURRENCIES.USD;
  };

  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES.USD); // Default, will be updated

  // Update currency once geolocation is loaded
  useEffect(() => {
    if (!geoLoading) {
      setCurrencyState(getInitialCurrency());
    }
  }, [geoLoading, geoCountryCode]);

  // Set currency and save to localStorage
  const setCurrency = (code: CurrencyCode) => {
    localStorage.setItem("userCurrency", code);
    setCurrencyState(CURRENCIES[code]);
  };

  // Format price based on current currency
  const formatPrice = (amountInUSD: number): string => {
    const currencyCode = currency.code;
    const exchangeRate = EXCHANGE_RATES[currencyCode];
    const convertedAmount = amountInUSD * exchangeRate;

    // Format based on currency-specific rules
    if (currencyCode === "JPY") {
      // JPY doesn't typically use decimal places
      return `${currency.symbol}${Math.round(convertedAmount)}`;
    }

    // For other currencies, format with two decimal places
    return `${currency.symbol}${convertedAmount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        formatPrice,
        currencies: Object.values(CURRENCIES)
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook for using the currency context
export const useCurrency = () => useContext(CurrencyContext);
