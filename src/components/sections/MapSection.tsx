"use client";
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Script from 'next/script';
import { COMPANY_INFO } from '@/data/company';

interface YMapGeoObject {
  balloon: {
    open: () => void;
  };
}

interface YMapInstance {
  geoObjects: {
    add: (object: YMapGeoObject) => void;
  };
  behaviors: {
    disable: (behavior: string) => void;
  };
}

interface YMapSearchControl {
  search: (query: string) => Promise<void>;
  getResultsArray: () => YMapGeoObject[];
}

interface YMapsApi {
  ready: (callback: () => void) => void;
  Map: new (
    container: HTMLElement,
    state: {
      center: [number, number];
      zoom: number;
      controls: string[];
    },
    options: {
      suppressMapOpenBlock: boolean;
      yandexMapDisablePoiInteractivity: boolean;
    }
  ) => YMapInstance;
  Placemark: new (
    coordinates: [number, number],
    properties: Record<string, string>,
    options: Record<string, string>
  ) => YMapGeoObject;
  control: {
    SearchControl: new (params: {
      options: {
        provider: string;
        noPlacemark: boolean;
        results: number;
        useMapBounds: boolean;
      };
    }) => YMapSearchControl;
  };
}

declare global {
  interface Window {
    ymaps?: YMapsApi;
  }
}

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstance = useRef<YMapInstance | null>(null);

  const addFallbackPlacemark = useCallback((map: YMapInstance) => {
    if (!window.ymaps) return;
    const placemark = new window.ymaps.Placemark(
      [COMPANY_INFO.mapCoordinates.lat, COMPANY_INFO.mapCoordinates.lng],
      {
        balloonContentHeader: "БУКВА СВЕТ",
        balloonContentBody: COMPANY_INFO.requisites.legalAddress,
      },
      { preset: 'islands#blueIndustrialIcon' }
    );
    map.geoObjects.add(placemark);
    placemark.balloon.open();
  }, []);

  const initMap = useCallback(() => {
    if (typeof window === 'undefined' || !window.ymaps || !mapContainerRef.current || mapInstance.current) return;

    window.ymaps.ready(() => {
      const ymaps = window.ymaps;
      const mapContainer = mapContainerRef.current;
      if (!ymaps || !mapContainer) return;

      try {
        const map = new ymaps.Map(mapContainer, {
          center: [COMPANY_INFO.mapCoordinates.lat, COMPANY_INFO.mapCoordinates.lng],
          zoom: 14,
          controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
        }, {
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: false
        });

        map.behaviors.disable('scrollZoom');

        const searchControl = new ymaps.control.SearchControl({
          options: {
            provider: 'yandex#search',
            noPlacemark: false,
            results: 1,
            useMapBounds: true
          }
        });

        searchControl.search(COMPANY_INFO.requisites.legalAddress).then(() => {
          const results = searchControl.getResultsArray();
          if (results.length > 0) {
            const firstResult = results[0];
            map.geoObjects.add(firstResult);
            firstResult.balloon.open();
          } else {
            addFallbackPlacemark(map);
          }
        }).catch(() => {
          addFallbackPlacemark(map);
        });

        mapInstance.current = map;
        setIsLoaded(true);
      } catch (err) {
        console.error("Map initialization failed:", err);
      }
    });
  }, [addFallbackPlacemark]);

  // Handle case where script loads before component mounts or during hydration
  useEffect(() => {
    if (window.ymaps && !mapInstance.current) {
      initMap();
    }
  }, [initMap]);

  return (
    <section 
      ref={sectionRef} 
      id="map" 
      className="w-full h-[60vh] min-h-[500px] relative overflow-hidden bg-surface border-y border-outline"
    >
      <Script 
        src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" 
        onReady={initMap}
        strategy="afterInteractive"
      />
      
      {/* Skeleton / Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-surface flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="verge-mono-label text-on-surface-variant/50">Загрузка карты...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 z-0 bg-muted" 
      />

      {/* Brand Panel */}
      <div className="section-container relative h-full z-10 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 md:bottom-auto md:top-16 left-4 right-4 md:left-12 md:right-auto md:max-w-sm bg-black/85 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[var(--radius-12)] shadow-2xl pointer-events-auto"
        >
          <div className="flex flex-col gap-5">
            <div>
              <p className="verge-mono-label text-primary/80 mb-2 uppercase tracking-[0.2em] text-xs font-bold">Штаб-квартира</p>
              <h3 className="text-base md:text-lg font-sans font-black uppercase leading-[1.2] text-white tracking-tight">
                Москва,<br/>
                Полимерная 8
              </h3>
            </div>
            
            <div className="h-px w-full bg-white/10" />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]" />
                <span className="text-white/70 text-sm font-medium tracking-wide">Производственный хаб</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-white/50 text-sm font-medium tracking-wide">Инженерный центр</span>
              </div>
            </div>
            
            <button 
              onClick={() => window.open(`https://yandex.ru/maps/?text=${encodeURIComponent(COMPANY_INFO.requisites.legalAddress)}`, '_blank')}
              className="mt-2 w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[var(--radius-8)] text-white text-xs font-bold uppercase tracking-widest transition-all hover:border-white/20 flex items-center justify-center gap-2"
            >
              Открыть в Картах
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Depth Overlays */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background/30 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
    </section>
  );
}
