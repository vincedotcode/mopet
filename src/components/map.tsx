// src/components/Map.tsx
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";

export default function MyMap({ setLocation }: { setLocation: (location: [number, number]) => void }) {
  const [position, setPosition] = useState<[number, number]>([-20.165582, 57.504723]); // Default location in Mauritius

  // Update position when the map is clicked
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position ? <Marker position={position}></Marker> : null;
  };

  return (
    <MapContainer center={position} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
