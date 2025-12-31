export interface Medication {
  prescribed_brand: string;
  active_salt: string;
  jan_aushadhi_generic: string;
  brand_price_est: string;
  jan_aushadhi_price_est: string;
  savings_est: string;
}

export interface AnalysisMetadata {
  doctor: string;
  date: string;
  currency: string;
}

export interface BhashiniSummary {
  en: string; // English
  hi: string; // Hindi
  te: string; // Telugu
  ta: string; // Tamil
  kn: string; // Kannada
  bn: string; // Bengali
  mr: string; // Marathi
}

export interface AnalysisResult {
  metadata: AnalysisMetadata;
  medications: Medication[];
  bhashini_summary: BhashiniSummary;
  disclaimer: string;
}

export interface StoreLocation {
  name: string;
  address: string;
  mapUri: string;
}

export type AppStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';