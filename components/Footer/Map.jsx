import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const customIcon = L.icon({
  iconUrl: "/icons/pin.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function Map() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <MapContainer
      center={[44.812, 20.462]} // između dve lokacije
      zoom={13}
      style={{ width: "100%" }}
      className="h-full max-lg:h-[500px]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[44.802615, 20.4712]} icon={customIcon}>
        <Popup>Prirodnjački muzej</Popup>
      </Marker>

      <Marker position={[44.822444, 20.452861]} icon={customIcon}>
        <Popup>Galerija Prirodnjačkog muzeja</Popup>
      </Marker>
    </MapContainer>
  );
}
