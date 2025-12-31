import React, { useState } from 'react';
import { MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { findNearestStore } from '../services/geminiService';
import { StoreLocation } from '../types';

export const JanAushadhiLocator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState<StoreLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleLocate = () => {
    setLoading(true);
    setError(null);
    setPermissionDenied(false);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await findNearestStore(
            position.coords.latitude,
            position.coords.longitude
          );
          
          if (result) {
            setStore(result);
          } else {
            setError("Unable to find a store nearby using the available data. Please try again or search on Google Maps.");
          }
        } catch (e) {
          console.error(e);
          setError("Something went wrong while finding the store.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setPermissionDenied(true);
        setError("Location access is required to find the nearest store.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (store) {
     return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6">
            <div className="p-4 bg-green-50 border-b border-green-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2E7D32]" />
                <h3 className="font-semibold text-green-900">Nearest Jan Aushadhi Kendra</h3>
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800">{store.name}</h4>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed whitespace-pre-line">{store.address}</p>
                </div>
                <a 
                    href={store.mapUri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#2E7D32] text-white rounded-lg font-medium hover:bg-[#256628] transition-colors shadow-sm whitespace-nowrap"
                >
                    <Navigation className="w-4 h-4" />
                    Navigate
                </a>
            </div>
        </div>
     );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="bg-green-50 p-4 rounded-full">
                <MapPin className="w-8 h-8 text-[#2E7D32]" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800">Find Your Nearest Jan Aushadhi Kendra</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2 text-xs leading-relaxed">
                    Locate the closest Pradhan Mantri Bhartiya Janaushadhi Kendra to purchase these medicines at affordable prices.
                </p>
            </div>
            
            {error && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-4 py-2 rounded-lg text-xs mt-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <button
                onClick={handleLocate}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-[#2E7D32] hover:border-[#2E7D32] transition-all flex items-center gap-2 disabled:opacity-70 shadow-sm"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                {loading ? 'Locating Nearby Store...' : 'Use Current Location'}
            </button>
            {permissionDenied && (
                <p className="text-[10px] text-gray-400">Please allow location access when prompted.</p>
            )}
        </div>
    </div>
  );
};