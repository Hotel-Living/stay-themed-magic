
import React, { createContext, useContext, useState, useEffect } from "react";

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
  // Get currency from localStorage or default to USD
  const getInitialCurrency = (): Currency => {
    const savedCurrency = localStorage.getItem("userCurrency") as CurrencyCode;
    return CURRENCIES[savedCurrency] || CURRENCIES.USD;
  };

  const [currency, setCurrencyState] = useState<Currency>(getInitialCurrency);

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
