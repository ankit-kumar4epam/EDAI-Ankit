import axios from "axios";
import { useEffect, useState } from "react";
import { LocationItem } from "../../atoms/Homepage/LocationItem";
import "./css/Location.css";

const Location = () => {
  const [location, setLocation] = useState<any[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );

  const [mapUrl, setMapUrl] = useState<string>(
    "https://maps.google.com/maps?q=India&output=embed"
  );

  const handleLocationClick = (placeName: string, locationId: string) => {
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(
      placeName
    )}&output=embed`;
    setMapUrl(url);
    setSelectedLocationId(locationId);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8080/api/v1/home/locations"
        );
        // console.log(resp);

        if (resp.data.content) {
          setLocation(resp.data.content);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocation();
  }, []);
  return (
    <section id="map">
      <div className="subheadings">(OUR LOCATIONS)</div>
      <div className="map-container">
        <div className="map-locations">
          {location.map((elem) => (
            <LocationItem
              key={elem.locationId}
              locationPlace={elem.locationName}
              locationDesc={elem.locationAddress}
              onClick={() =>
                handleLocationClick(elem.locationName, elem.locationId)
              }
              isActive={selectedLocationId === elem.locationId} // 🔥
            />
          ))}
        </div>
        <div className="map-box">
          <div id="map-view">
            <iframe
              className="map-main"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
