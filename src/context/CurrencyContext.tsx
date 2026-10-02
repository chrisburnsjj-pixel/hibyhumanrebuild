import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SupportedCurrency = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'AED' | 'SAR' | 'CAD' | 'AUD';

export interface CurrencyMetadata {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  flag: string;
  country: string;
  locale: string;
  fractionDigits: number;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyMetadata> = {
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    country: 'United Kingdom',
    locale: 'en-GB',
    fractionDigits: 2,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    country: 'United States',
    locale: 'en-US',
    fractionDigits: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    country: 'European Union',
    locale: 'de-DE',
    fractionDigits: 2,
  },
  PKR: {
    code: 'PKR',
    symbol: '₨',
    name: 'Pakistani Rupee',
    flag: '🇵🇰',
    country: 'Pakistan',
    locale: 'en-PK',
    fractionDigits: 0,
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    locale: 'en-AE',
    fractionDigits: 2,
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR ',
    name: 'Saudi Riyal',
    flag: '🇸🇦',
    country: 'Saudi Arabia',
    locale: 'en-SA',
    fractionDigits: 2,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    flag: '🇨🇦',
    country: 'Canada',
    locale: 'en-CA',
    fractionDigits: 2,
  },
  AUD: {
    code: 'AUD',
    symbol: 'AU$',
    name: 'Australian Dollar',
    flag: '🇦🇺',
    country: 'Australia',
    locale: 'en-AU',
    fractionDigits: 2,
  },
};

// Emergency fallback exchange rates (Anchor: 1 GBP)
const FALLBACK_RATES: Record<SupportedCurrency, number> = {
  GBP: 1.0,
  USD: 1.31,
  EUR: 1.18,
  PKR: 366.5,
  AED: 4.81,
  SAR: 4.91,
  CAD: 1.78,
  AUD: 1.95,
};

// Map ISO country codes to SupportedCurrency
const COUNTRY_TO_CURRENCY_MAP: Record<string, SupportedCurrency> = {
  // Direct matches
  PK: 'PKR',
  US: 'USD',
  GB: 'GBP',
  AE: 'AED',
  SA: 'SAR',
  CA: 'CAD',
  AU: 'AUD',
  // Eurozone members
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  IE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  LT: 'EUR',
  LV: 'EUR',
  EE: 'EUR',
  CY: 'EUR',
  MT: 'EUR',
  LU: 'EUR',
  HR: 'EUR',
};

const STORAGE_KEY_USER_CURRENCY = 'hibyhuman_user_currency';
const STORAGE_KEY_DETECTED_COUNTRY = 'hibyhuman_detected_country';
const STORAGE_KEY_RATES_CACHE = 'hibyhuman_fx_rates_cache';
const RATES_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

interface CurrencyContextType {
  currency: SupportedCurrency;
  metadata: CurrencyMetadata;
  rates: Record<SupportedCurrency, number>;
  isAutoDetected: boolean;
  detectedCountry: string | null;
  setCurrency: (code: SupportedCurrency) => void;
  convertPrice: (baseGbpAmount: number | string) => number;
  formatConvertedPrice: (
    baseGbpAmount: number | string,
    options?: { showCode?: boolean; customDiscount?: number }
  ) => string;
  getFormattedParts: (
    baseGbpAmount: number | string,
    options?: { customDiscount?: number }
  ) => {
    symbol: string;
    amount: string;
    code: SupportedCurrency;
    full: string;
  };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // 1. Initialize currency with strict hierarchy:
  // User manual selection -> Cached detected country -> Default to USD
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    if (typeof window !== 'undefined') {
      const savedUserChoice = localStorage.getItem(STORAGE_KEY_USER_CURRENCY) as SupportedCurrency;
      if (savedUserChoice && SUPPORTED_CURRENCIES[savedUserChoice]) {
        return savedUserChoice;
      }
      const cachedCountry = localStorage.getItem(STORAGE_KEY_DETECTED_COUNTRY);
      if (cachedCountry && COUNTRY_TO_CURRENCY_MAP[cachedCountry]) {
        return COUNTRY_TO_CURRENCY_MAP[cachedCountry];
      }
    }
    return 'USD';
  });

  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem(STORAGE_KEY_USER_CURRENCY);
    }
    return true;
  });

  const [detectedCountry, setDetectedCountry] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY_DETECTED_COUNTRY);
    }
    return null;
  });

  // 2. Exchange Rates with 24-Hour localStorage cache
  const [rates, setRates] = useState<Record<SupportedCurrency, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY_RATES_CACHE);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.timestamp && Date.now() - parsed.timestamp < RATES_CACHE_TTL_MS && parsed.rates) {
            return { ...FALLBACK_RATES, ...parsed.rates };
          }
        }
      } catch (e) {
        console.warn('Could not read FX rates cache from localStorage', e);
      }
    }
    return FALLBACK_RATES;
  });

  // 3. User manual selection handler (persists permanently until changed)
  const setCurrency = useCallback((newCode: SupportedCurrency) => {
    if (!SUPPORTED_CURRENCIES[newCode]) return;
    setCurrencyState(newCode);
    setIsAutoDetected(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_USER_CURRENCY, newCode);
      } catch (e) {
        console.warn('Could not save user currency preference', e);
      }
    }
  }, []);

  // 4. Fetch Live FX Rates (Updates cache once every 24h)
  useEffect(() => {
    let isMounted = true;

    async function fetchLatestRates() {
      try {
        // Check if cache is still fresh
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_KEY_RATES_CACHE);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.timestamp && Date.now() - parsed.timestamp < RATES_CACHE_TTL_MS && parsed.rates) {
              return; // Cache is still fresh, no network call needed
            }
          }
        }

        const res = await fetch('https://open.er-api.com/v6/latest/GBP');
        if (!res.ok) throw new Error(`FX HTTP error ${res.status}`);
        const data = await res.json();

        if (data && data.rates && isMounted) {
          const newRates: Record<SupportedCurrency, number> = {
            GBP: 1.0,
            USD: Number(data.rates.USD) || FALLBACK_RATES.USD,
            EUR: Number(data.rates.EUR) || FALLBACK_RATES.EUR,
            PKR: Number(data.rates.PKR) || FALLBACK_RATES.PKR,
            AED: Number(data.rates.AED) || FALLBACK_RATES.AED,
            SAR: Number(data.rates.SAR) || FALLBACK_RATES.SAR,
            CAD: Number(data.rates.CAD) || FALLBACK_RATES.CAD,
            AUD: Number(data.rates.AUD) || FALLBACK_RATES.AUD,
          };

          setRates(newRates);

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(
                STORAGE_KEY_RATES_CACHE,
                JSON.stringify({
                  timestamp: Date.now(),
                  rates: newRates,
                })
              );
            } catch (err) {
              console.warn('Could not cache FX rates', err);
            }
          }
        }
      } catch (err) {
        console.warn('Exchange rates update notice: using fallback/cached exchange rates', err);
      }
    }

    // 4. Fetch Live FX Rates (Deferred to avoid competing with initial LCP/FCP)
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => fetchLatestRates(), { timeout: 3000 });
      } else {
        fetchLatestRates();
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // 5. Automatic Geo-IP Country Detection (only if user hasn't manually set currency)
  useEffect(() => {
    let isMounted = true;

    async function detectCountry() {
      if (typeof window === 'undefined') return;

      const hasManualChoice = localStorage.getItem(STORAGE_KEY_USER_CURRENCY);
      if (hasManualChoice) {
        // User explicitly set their currency; do not overwrite
        return;
      }

      const cachedCountry = localStorage.getItem(STORAGE_KEY_DETECTED_COUNTRY);
      if (cachedCountry) {
        setDetectedCountry(cachedCountry);
        const mappedCurrency = COUNTRY_TO_CURRENCY_MAP[cachedCountry] || 'USD';
        setCurrencyState(mappedCurrency);
        return;
      }

      // Query Geo-IP service
      try {
        let countryCode: string | null = null;

        // Primary Geo-IP provider: ipwho.is (fast, HTTPS, CORS open)
        try {
          const res = await fetch('https://ipwho.is/');
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.country_code) {
              countryCode = data.country_code.toUpperCase();
            }
          }
        } catch {
          // Secondary fallback Geo-IP provider
          try {
            const res2 = await fetch('https://ipapi.co/json/');
            if (res2.ok) {
              const data2 = await res2.json();
              if (data2.country_code) {
                countryCode = data2.country_code.toUpperCase();
              }
            }
          } catch {
            // Both providers failed
          }
        }

        if (countryCode && isMounted) {
          setDetectedCountry(countryCode);
          try {
            localStorage.setItem(STORAGE_KEY_DETECTED_COUNTRY, countryCode);
          } catch {
            // Ignore storage quota
          }

          // Double check user didn't select something while request was in-flight
          const lateManualChoice = localStorage.getItem(STORAGE_KEY_USER_CURRENCY);
          if (!lateManualChoice) {
            const targetCurrency = COUNTRY_TO_CURRENCY_MAP[countryCode] || 'USD';
            setCurrencyState(targetCurrency);
          }
        } else if (isMounted) {
          // Geo-IP failed: fallback to USD
          const lateManualChoice = localStorage.getItem(STORAGE_KEY_USER_CURRENCY);
          if (!lateManualChoice) {
            setCurrencyState('USD');
          }
        }
      } catch (err) {
        console.warn('Geo-IP country detection notice: defaulted to USD', err);
      }
    }

    const geoTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => detectCountry(), { timeout: 4000 });
      } else {
        detectCountry();
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(geoTimer);
    };
  }, []);

  // 6. Converter Helper: Converts base GBP price to active currency amount
  const convertPrice = useCallback(
    (baseGbpAmount: number | string): number => {
      const num = typeof baseGbpAmount === 'number' ? baseGbpAmount : parseFloat(String(baseGbpAmount).replace(/,/g, ''));
      if (isNaN(num)) return 0;
      const rate = rates[currency] || FALLBACK_RATES[currency] || 1;
      return num * rate;
    },
    [currency, rates]
  );

  // 7. Format with Intl.NumberFormat according to currency metadata
  const getFormattedParts = useCallback(
    (baseGbpAmount: number | string, options?: { customDiscount?: number }) => {
      let converted = convertPrice(baseGbpAmount);
      if (options?.customDiscount) {
        converted = converted * options.customDiscount;
      }

      const meta = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
      const fractionDigits = meta.fractionDigits;

      // Format numeric value using Intl.NumberFormat
      const numberFormatter = new Intl.NumberFormat(meta.locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });

      const formattedNumber = numberFormatter.format(converted);

      return {
        symbol: meta.symbol,
        amount: formattedNumber,
        code: currency,
        full: `${meta.symbol}${formattedNumber}`,
      };
    },
    [convertPrice, currency]
  );

  const formatConvertedPrice = useCallback(
    (baseGbpAmount: number | string, options?: { showCode?: boolean; customDiscount?: number }): string => {
      const parts = getFormattedParts(baseGbpAmount, options);
      if (options?.showCode) {
        return `${parts.full} ${parts.code}`;
      }
      return parts.full;
    },
    [getFormattedParts]
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        metadata: SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD,
        rates,
        isAutoDetected,
        detectedCountry,
        setCurrency,
        convertPrice,
        formatConvertedPrice,
        getFormattedParts,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

const DEFAULT_FALLBACK_CURRENCY_CONTEXT: CurrencyContextType = {
  currency: 'GBP',
  metadata: SUPPORTED_CURRENCIES.GBP,
  rates: FALLBACK_RATES,
  isAutoDetected: false,
  detectedCountry: 'GB',
  setCurrency: () => {},
  convertPrice: (amt) => Number(amt) || 0,
  formatConvertedPrice: (amt) => `£${Number(amt) || 0}`,
  getFormattedParts: (amt) => ({
    symbol: '£',
    amount: String(Number(amt) || 0),
    code: 'GBP',
    full: `£${Number(amt) || 0}`,
  }),
};

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    return DEFAULT_FALLBACK_CURRENCY_CONTEXT;
  }
  return context;
}
