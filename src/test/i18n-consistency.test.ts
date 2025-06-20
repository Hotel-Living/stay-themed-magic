
import { describe, it, expect } from 'vitest';

// Import dashboard translation files
import enDashboardGeneral from '../i18n/locales/en/dashboard/general.json';
import esDashboardGeneral from '../i18n/locales/es/dashboard/general.json';
import ptDashboardGeneral from '../i18n/locales/pt/dashboard/general.json';

import enDashboardRatesCalculator from '../i18n/locales/en/dashboard/rates-calculator.json';
import esDashboardRatesCalculator from '../i18n/locales/es/dashboard/rates-calculator.json';
import ptDashboardRatesCalculator from '../i18n/locales/pt/dashboard/rates-calculator.json';

import enDashboardCommon from '../i18n/locales/en/dashboard/common.json';
import esDashboardCommon from '../i18n/locales/es/dashboard/common.json';
import ptDashboardCommon from '../i18n/locales/pt/dashboard/common.json';

import enDashboardWelcomeContent from '../i18n/locales/en/dashboard/welcome-content.json';
import esDashboardWelcomeContent from '../i18n/locales/es/dashboard/welcome-content.json';
import ptDashboardWelcomeContent from '../i18n/locales/pt/dashboard/welcome-content.json';

import enDashboardFaqTerms from '../i18n/locales/en/dashboard/faq-terms.json';
import esDashboardFaqTerms from '../i18n/locales/es/dashboard/faq-terms.json';
import ptDashboardFaqTerms from '../i18n/locales/pt/dashboard/faq-terms.json';

/**
 * Recursively flattens a nested object into dot-notation keys
 * Example: { a: { b: "value" } } becomes { "a.b": "value" }
 */
function flattenTranslationObject(obj: any, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenTranslationObject(obj[key], path));
    } else {
      acc[path] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * Extracts keys from a flattened translation object
 */
function extractKeys(obj: any): string[] {
  return Object.keys(flattenTranslationObject(obj)).sort();
}

/**
 * Checks if any translation values contain hardcoded keys (starting with lowercase letter followed by dot)
 */
function checkForHardcodedKeys(obj: any, language: string): string[] {
  const flattened = flattenTranslationObject(obj);
  const hardcodedKeys: string[] = [];
  
  Object.entries(flattened).forEach(([key, value]) => {
    if (typeof value === 'string' && /^[a-z][a-zA-Z]*\./.test(value)) {
      hardcodedKeys.push(`${language}: ${key} = "${value}"`);
    }
  });
  
  return hardcodedKeys;
}

describe('i18n Translation Consistency Tests', () => {
  describe('Dashboard General translations', () => {
    it('should have identical key structures across all languages', () => {
      const enKeys = extractKeys(enDashboardGeneral);
      const esKeys = extractKeys(esDashboardGeneral);
      const ptKeys = extractKeys(ptDashboardGeneral);

      expect(enKeys).toEqual(esKeys);
      expect(esKeys).toEqual(ptKeys);
      expect(enKeys.length).toBeGreaterThan(0);
    });

    it('should not contain hardcoded translation keys', () => {
      const enHardcoded = checkForHardcodedKeys(enDashboardGeneral, 'EN');
      const esHardcoded = checkForHardcodedKeys(esDashboardGeneral, 'ES');
      const ptHardcoded = checkForHardcodedKeys(ptDashboardGeneral, 'PT');

      const allHardcoded = [...enHardcoded, ...esHardcoded, ...ptHardcoded];
      expect(allHardcoded).toEqual([]);
    });
  });

  describe('Dashboard Rates Calculator translations', () => {
    it('should have identical key structures across all languages', () => {
      const enKeys = extractKeys(enDashboardRatesCalculator);
      const esKeys = extractKeys(esDashboardRatesCalculator);
      const ptKeys = extractKeys(ptDashboardRatesCalculator);

      expect(enKeys).toEqual(esKeys);
      expect(esKeys).toEqual(ptKeys);
      expect(enKeys.length).toBeGreaterThan(0);
    });

    it('should not contain hardcoded translation keys', () => {
      const enHardcoded = checkForHardcodedKeys(enDashboardRatesCalculator, 'EN');
      const esHardcoded = checkForHardcodedKeys(esDashboardRatesCalculator, 'ES');
      const ptHardcoded = checkForHardcodedKeys(ptDashboardRatesCalculator, 'PT');

      const allHardcoded = [...enHardcoded, ...esHardcoded, ...ptHardcoded];
      expect(allHardcoded).toEqual([]);
    });

    it('should contain expected critical keys', () => {
      const enKeys = extractKeys(enDashboardRatesCalculator);
      const criticalKeys = [
        'ratesCalculator.utilities',
        'ratesCalculator.cleaning',
        'ratesCalculator.meals',
        'ratesCalculator.totalCost',
        'ratesCalculator.disclaimer'
      ];

      criticalKeys.forEach(key => {
        expect(enKeys).toContain(key);
      });
    });
  });

  describe('Dashboard Common translations', () => {
    it('should have identical key structures across all languages', () => {
      const enKeys = extractKeys(enDashboardCommon);
      const esKeys = extractKeys(esDashboardCommon);
      const ptKeys = extractKeys(ptDashboardCommon);

      expect(enKeys).toEqual(esKeys);
      expect(esKeys).toEqual(ptKeys);
      expect(enKeys.length).toBeGreaterThan(0);
    });

    it('should not contain hardcoded translation keys', () => {
      const enHardcoded = checkForHardcodedKeys(enDashboardCommon, 'EN');
      const esHardcoded = checkForHardcodedKeys(esDashboardCommon, 'ES');
      const ptHardcoded = checkForHardcodedKeys(ptDashboardCommon, 'PT');

      const allHardcoded = [...enHardcoded, ...esHardcoded, ...ptHardcoded];
      expect(allHardcoded).toEqual([]);
    });
  });

  describe('Dashboard Welcome Content translations', () => {
    it('should have identical key structures across all languages', () => {
      const enKeys = extractKeys(enDashboardWelcomeContent);
      const esKeys = extractKeys(esDashboardWelcomeContent);
      const ptKeys = extractKeys(ptDashboardWelcomeContent);

      expect(enKeys).toEqual(esKeys);
      expect(esKeys).toEqual(ptKeys);
      expect(enKeys.length).toBeGreaterThan(0);
    });

    it('should not contain hardcoded translation keys', () => {
      const enHardcoded = checkForHardcodedKeys(enDashboardWelcomeContent, 'EN');
      const esHardcoded = checkForHardcodedKeys(esDashboardWelcomeContent, 'ES');
      const ptHardcoded = checkForHardcodedKeys(ptDashboardWelcomeContent, 'PT');

      const allHardcoded = [...enHardcoded, ...esHardcoded, ...ptHardcoded];
      expect(allHardcoded).toEqual([]);
    });
  });

  describe('Dashboard FAQ Terms translations', () => {
    it('should have identical key structures across all languages', () => {
      const enKeys = extractKeys(enDashboardFaqTerms);
      const esKeys = extractKeys(esDashboardFaqTerms);
      const ptKeys = extractKeys(ptDashboardFaqTerms);

      expect(enKeys).toEqual(esKeys);
      expect(esKeys).toEqual(ptKeys);
      expect(enKeys.length).toBeGreaterThan(0);
    });

    it('should not contain hardcoded translation keys', () => {
      const enHardcoded = checkForHardcodedKeys(enDashboardFaqTerms, 'EN');
      const esHardcoded = checkForHardcodedKeys(esDashboardFaqTerms, 'ES');
      const ptHardcoded = checkForHardcodedKeys(ptDashboardFaqTerms, 'PT');

      const allHardcoded = [...enHardcoded, ...esHardcoded, ...ptHardcoded];
      expect(allHardcoded).toEqual([]);
    });
  });

  describe('Overall translation file integrity', () => {
    it('should have all translation files properly structured', () => {
      // Test that all files export the expected structure
      expect(enDashboardGeneral.dashboard).toBeDefined();
      expect(esDashboardGeneral.dashboard).toBeDefined();
      expect(ptDashboardGeneral.dashboard).toBeDefined();

      expect(enDashboardRatesCalculator.ratesCalculator).toBeDefined();
      expect(esDashboardRatesCalculator.ratesCalculator).toBeDefined();
      expect(ptDashboardRatesCalculator.ratesCalculator).toBeDefined();

      expect(enDashboardCommon.dashboard).toBeDefined();
      expect(esDashboardCommon.dashboard).toBeDefined();
      expect(ptDashboardCommon.dashboard).toBeDefined();
    });

    it('should not have empty translation values', () => {
      const checkEmptyValues = (obj: any, language: string): string[] => {
        const flattened = flattenTranslationObject(obj);
        const emptyKeys: string[] = [];
        
        Object.entries(flattened).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            emptyKeys.push(`${language}: ${key}`);
          }
        });
        
        return emptyKeys;
      };

      const allEmptyKeys = [
        ...checkEmptyValues(enDashboardGeneral, 'EN-General'),
        ...checkEmptyValues(esDashboardGeneral, 'ES-General'),
        ...checkEmptyValues(ptDashboardGeneral, 'PT-General'),
        ...checkEmptyValues(enDashboardRatesCalculator, 'EN-RatesCalc'),
        ...checkEmptyValues(esDashboardRatesCalculator, 'ES-RatesCalc'),
        ...checkEmptyValues(ptDashboardRatesCalculator, 'PT-RatesCalc')
      ];

      expect(allEmptyKeys).toEqual([]);
    });
  });
});
