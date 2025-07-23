import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../config";
type Props = {
  location: { lat: number; lng: number } | null;
  setLocation: (loc: { lat: number; lng: number }) => void;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent: React.FC<Props> = ({ location, setLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY, // 🔑 Use environment variable ideally
  });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || { lat: 0, lng: 0 }}
      zoom={15}
      onClick={handleMapClick}
    >
      <Marker position={location || { lat: 0, lng: 0 }} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
