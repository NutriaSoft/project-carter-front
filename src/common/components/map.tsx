"use client";
import {
  APIProvider,
  ColorScheme,
  Map as GoolgeMaps,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useGeolocation } from "@uidotdev/usehooks";

export const Map = () => {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "token"}
    >
      <MapContent />
    </APIProvider>
  );
};

const MapContent = () => {
  const map = useMap();
  const geoLocation = useGeolocation();


  useEffect(() => {
    if (!map) return;
    map.setOptions({
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })

  }, [map, geoLocation]);

  if (geoLocation.loading) {
    return <p>loading... (you may need to enable permissions)</p>;
  }

  if (geoLocation.error) {
    return <p>Enable permissions to access your location data:{geoLocation.error.message} </p>;
  }

  if (geoLocation.longitude && geoLocation.latitude) {

    return (
      <GoolgeMaps
        disableDefaultUI
        reuseMaps
        colorScheme={ColorScheme.DARK}
        // mapTypeId="189a515824ccea5f"
        // renderingType={RenderingType.VECTOR}
        defaultZoom={16}
        minZoom={15}
        maxZoom={17}
        defaultCenter={{ lng: geoLocation.longitude, lat: geoLocation.latitude }}
        className="w-dvw h-dvh absolute z-0"
      >
        <Marker optimized position={{ lng: geoLocation.longitude, lat: geoLocation.latitude }} ></Marker>
      </GoolgeMaps>)
  }
};


