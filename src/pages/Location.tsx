import notification from "../assets/location.png";
import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { useLocation, useNavigate } from "react-router-dom";
const Location = () => {
  const navigate = useNavigate();
  const locationData = useLocation();
  const token = locationData.state?.token;
  const phone_number = locationData.state?.phone_number;
  const country_code = locationData.state?.country_code;
  const user_type = locationData.state?.user_type;
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleAllowGoogleMaps = async () => {
    const permission = await Geolocation.requestPermissions();
    if (permission.location === "granted") {
      const coordinates = await Geolocation.getCurrentPosition();
      setLocation({
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      });
      setShowMap(true);
    } else {
      alert("Location permission not granted");
    }
  };

  const handleSetManually = () => {
    navigate("/address", {
      state: {
        phone_number,
        country_code,
        user_type,
        token,
      },
    });
  };
  return (
    <>
      <div className="">
        {!showMap ? (
          <div className="cont">
            <div></div>
            <div className="logo_con">
              <div className="">
                <div className="">
                  <img src={notification}></img>
                </div>
              </div>
              <h5 className="text-center pt-4">Set your location</h5>
              <p className="text-center pt-2 color-grey">
                This let us know your location for best shipping experience
              </p>
            </div>
            <div className="padding_15">
              <button className="fill" onClick={handleAllowGoogleMaps}>
                Allow Google Maps
              </button>
              <button className="outline" onClick={handleSetManually}>
                Set Manually
              </button>
            </div>
          </div>
        ) : (
          <GoogleMapComponent location={location} setLocation={setLocation} />
        )}
      </div>
    </>
  );
};

export default Location;
