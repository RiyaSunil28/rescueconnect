import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

function LiveMap() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get("https://rescueconnect-a8ug.onrender.com/api/rescue")
      .then(res => {
        console.log("MAP DATA:", res.data);
        setCases(res.data);
      });
  }, []);

  return (
    <MapContainer
      center={[8.5241, 76.9366]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {cases.map((c) => {
        if (!c.lat || !c.lng) return null;

        const lat = parseFloat(c.lat);
        const lng = parseFloat(c.lng);

        return (
          <Marker key={c._id} position={[lat, lng]}>
            <Popup>
              <b>{c.animalType}</b><br />
              {c.location}<br />
              {c.email}
            </Popup>
          </Marker>
        );
      })}

    </MapContainer>
  );
}

export default LiveMap;