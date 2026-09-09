'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface CountryData {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  format: string;
  minLen: number;
  maxLen: number;
}

export const COUNTRIES: CountryData[] = [
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', format: '98765 43210', minLen: 10, maxLen: 10 },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', format: '(555) 000-0000', minLen: 10, maxLen: 10 },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', format: '7911 123456', minLen: 10, maxLen: 11 },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', format: '50 123 4567', minLen: 9, maxLen: 9 },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', format: '412 345 678', minLen: 9, maxLen: 9 },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', format: '(555) 000-0000', minLen: 10, maxLen: 10 },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', format: '151 23456789', minLen: 10, maxLen: 11 },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬', format: '8123 4567', minLen: 8, maxLen: 8 },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', format: '50 123 4567', minLen: 9, maxLen: 9 },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', format: '6 12 34 56 78', minLen: 9, maxLen: 9 },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵', format: '90 1234 5678', minLen: 10, maxLen: 10 },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱', format: '6 12345678', minLen: 9, maxLen: 9 },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: '🇨🇭', format: '78 123 45 67', minLen: 9, maxLen: 9 },
  { name: 'Qatar', code: 'QA', dialCode: '+974', flag: '🇶🇦', format: '3312 3456', minLen: 8, maxLen: 8 },
  { name: 'New Zealand', code: 'NZ', dialCode: '+64', flag: '🇳🇿', format: '21 123 4567', minLen: 9, maxLen: 10 },
  { name: 'Ireland', code: 'IE', dialCode: '+353', flag: '🇮🇪', format: '85 123 4567', minLen: 9, maxLen: 9 },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', format: '71 123 4567', minLen: 9, maxLen: 9 },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷', format: '11 91234-5678', minLen: 10, maxLen: 11 },
  { name: 'Malaysia', code: 'MY', dialCode: '+60', flag: '🇲🇾', format: '12-345 6789', minLen: 9, maxLen: 10 },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸', format: '612 34 56 78', minLen: 9, maxLen: 9 },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: '🇮🇹', format: '312 345 6789', minLen: 10, maxLen: 10 },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: '🇸🇪', format: '70 123 45 67', minLen: 9, maxLen: 9 },
  { name: 'Norway', code: 'NO', dialCode: '+47', flag: '🇳🇴', format: '412 34 567', minLen: 8, maxLen: 8 },
  { name: 'Denmark', code: 'DK', dialCode: '+45', flag: '🇩🇰', format: '21 23 45 67', minLen: 8, maxLen: 8 },
  { name: 'Finland', code: 'FI', dialCode: '+358', flag: '🇫🇮', format: '40 1234567', minLen: 9, maxLen: 10 },
];

export interface PhoneInputValue {
  countryCode: string;
  phoneNumber: string;
  phoneE164: string;
  isValid: boolean;
}

interface PhoneInputProps {
  value?: string;
  onChange: (val: PhoneInputValue) => void;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export function PhoneInput({
  value = '',
  onChange,
  required = false,
  id = 'phone-input',
  name = 'phone',
  className = ''
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(COUNTRIES[0]); // Default India +91
  const [localNumber, setLocalNumber] = useState<string>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.dialCode.includes(searchQuery) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');
    
    // Validate with new country rules
    const digitsOnly = localNumber.replace(/\D/g, '');
    const isValid = digitsOnly.length >= country.minLen && digitsOnly.length <= country.maxLen;
    const cleanDial = country.dialCode.replace('+', '');
    const e164 = digitsOnly ? `+${cleanDial}${digitsOnly}` : '';
    
    onChange({
      countryCode: country.dialCode,
      phoneNumber: localNumber,
      phoneE164: e164,
      isValid
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow digits, spaces, hyphens, and parentheses
    const sanitized = raw.replace(/[^\d\s\-()]/g, '');
    setLocalNumber(sanitized);

    const digitsOnly = sanitized.replace(/\D/g, '');
    const isValid = digitsOnly.length >= selectedCountry.minLen && digitsOnly.length <= selectedCountry.maxLen;
    const cleanDial = selectedCountry.dialCode.replace('+', '');
    const e164 = digitsOnly ? `+${cleanDial}${digitsOnly}` : '';

    onChange({
      countryCode: selectedCountry.dialCode,
      phoneNumber: sanitized,
      phoneE164: e164,
      isValid
    });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:ring-2 focus-within:ring-[#3B82F6] focus-within:border-transparent transition-all">
        {/* Country Selector Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select Country Code"
          className="flex items-center gap-1.5 px-3 py-3 rounded-l-xl hover:bg-white/10 border-r border-white/10 transition-colors text-xs font-mono text-slate-200 shrink-0"
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span className="font-semibold text-white">{selectedCountry.dialCode}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Local Number Input */}
        <input
          id={id}
          name={name}
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          required={required}
          placeholder={selectedCountry.format}
          className="w-full px-3 py-3 rounded-r-xl bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
        />
      </div>

      {/* Country Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-72 max-h-64 bg-[#121317] rounded-xl shadow-xl border border-white/10 z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search bar */}
          <div className="p-2 border-b border-white/10 flex items-center gap-2 bg-white/5">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto py-1 max-h-52 divide-y divide-white/5">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountrySelect(c)}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors hover:bg-white/5 ${
                      isSelected ? 'bg-blue-500/10 text-[#3B82F6]' : 'text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="font-mono text-[11px] text-slate-400">{c.dialCode}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#3B82F6]" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-xs text-slate-400">
                No matching countries
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
