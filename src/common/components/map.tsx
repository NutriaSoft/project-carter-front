"use client";
import { useGeolocation } from "@uidotdev/usehooks";
import {
	APIProvider,
	ColorScheme,
	Map as GoolgeMaps,
	Marker,
	RenderingType,
	useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import points from "./output_val.json";

import coordinates from "./coordinates.json";

export const MapMain = () => {
	return (
		<>
			<APIProvider
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "token"}
			>
				<MapContent />
			</APIProvider>
		</>
	);
};

const MapContent = () => {
	const map = useMap();
	const geoLocation = useGeolocation();

	const [currentLocation, setCurrentLocation] = useState<
		google.maps.LatLngLiteral | undefined
	>({
		lat: 11.2399,
		lng: -74.1951,
	});

	const [zoom, setZoom] = useState<number | undefined>(12);

	useEffect(() => {
		if (geoLocation.loading) return;

		setCurrentLocation({
			lat: geoLocation.latitude ?? 0,
			lng: geoLocation.longitude ?? 0,
		});
	}, [geoLocation]);

	// console.log(state);

	// useEffect(() => {
	// 	if (!map) return;
	// 	console.log("dasdas");

	// 	// Añadir el círculo al mapa

	// 	const circles = coordinates.map((val) => {
	// 		return new google.maps.Circle({
	// 			map: map,
	// 			center: {
	// 				lat: val.lat,
	// 				lng: val.lng,
	// 			},
	// 			radius: 499 * 1000, // Radio en metros
	// 			strokeColor: "#FF0000",
	// 			strokeOpacity: 0.8,
	// 			strokeWeight: 2,
	// 			fillColor: "#FF0000",
	// 			fillOpacity: 0.35,
	// 		});
	// 	});

	// 	return () => {
	// 		for (const circle of circles) {
	// 			circle?.setMap(null);
	// 		}
	// 	};
	// }, [map]);

	return (
		<>
			<GoolgeMaps
				styles={[]}
				renderingType={RenderingType.RASTER}
				reuseMaps
				zoom={zoom}
				onZoomChanged={(e) => {
					setZoom(undefined);
				}}
				colorScheme={ColorScheme.DARK}
				center={currentLocation}
				onCenterChanged={(e) => {
					setCurrentLocation((current) => undefined);
				}}
				style={{ width: "100dvw", height: "100dvh" }}
				// gestureHandling={"greedy"}
				disableDefaultUI={true}
				defaultBounds={{
					east: 12,
					north: 12,
					south: 12,
					west: 12,
				}}
			>
				{points.map((val, i) => {
					return (
						<Marker
							key={`${val.address.address}-${i}`}
							onClick={(e) => {
								console.log(val.address);
							}}
							position={{
								lat: val.latitude ?? 0,
								lng: val.longitude ?? 0,
							}}
							optimized
						/>
					);
				})}
				<Marker
					onClick={(e) => {
						console.log("dasdsada");
					}}
					position={{
						lat: geoLocation.latitude ?? 0,
						lng: geoLocation.longitude ?? 0,
					}}
					optimized
				/>
			</GoolgeMaps>
		</>
	);
};
