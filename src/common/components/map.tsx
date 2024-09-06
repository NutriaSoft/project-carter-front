"use client";
import {
  APIProvider,
  Map as GoolgeMaps,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
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

  const [currentLocation, setCurrentLocation] = useState<{
    latitude?: number, longitude?: number
  }>({})




  useEffect(() => {

    if (geoLocation.loading) return

    console.log(geoLocation)

    setCurrentLocation({
      latitude: geoLocation.latitude ?? 0,
      longitude: geoLocation.latitude ?? 0
    })

  }, [geoLocation])

  // console.log(state);

  useEffect(() => {
    if (!map) return;
    map.setOptions({
      // zoom: 12,
      // center: { lng: -2.1991458, lat: -79.9304523 },
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
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
      ],
    })


  }, [map]);

  if (geoLocation.loading) {
    return <p>loading... (you may need to enable permissions)</p>;
  }

  if (geoLocation.error) {
    return <p>Enable permissions to access your location data</p>;
  }

  return (
    <>
      <GoolgeMaps
        reuseMaps
        defaultZoom={12}
        center={{ lng: currentLocation.longitude ?? geoLocation.latitude ?? 0, lat: currentLocation.latitude ?? geoLocation.longitude ?? 0 }}
        onCenterChanged={(e) => {
          const position = e.map.getCenter();
          setCurrentLocation((current) => ({
            latitude: position?.lat() ?? current.latitude,
            longitude: position?.lng() ?? current.longitude,
          }));


        }}
        style={{ width: "100dvw", height: "100dvh" }}
        // gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {!geoLocation.loading && <Marker position={{
          lat: geoLocation.latitude!,
          lng: geoLocation.latitude!
        }}

        />}
      </GoolgeMaps>
    </>
  );
};

