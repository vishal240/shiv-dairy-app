import notification from "../assets/notification.png";
import { useNavigate, useLocation } from "react-router-dom";
import { initPushNotifications } from "../components/pushNotifications";
import { Capacitor } from "@capacitor/core";
import { useAuth } from "../contexts/AuthContext";
import { PushNotifications } from "@capacitor/push-notifications";
const Notification = () => {
  const navigate = useNavigate();
  const locationData = useLocation();
  const token = locationData.state?.token;
  const phone_number = locationData.state?.phone_number;
  const country_code = locationData.state?.country_code;
  const user_type = locationData.state?.user_type;
  const { login } = useAuth();
  const handleEnableNotifications = () => {
    if (Capacitor.getPlatform() === "web") return;
    // initPushNotifications();
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        PushNotifications.register();
        handleSkipForNow();
      } else if (result.receive === "denied") {
        handleSkipForNow();
      } else {
        alert("Please enable notifications");
      }
    });
  };
  const handleSkipForNow = () => {
    login(token);
    navigate("/", {
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
        <div className="cont">
          <div></div>
          <div className="logo_con">
            <div className="">
              <div className="">
                <img src={notification}></img>
              </div>
            </div>
            <h5 className="text-center pt-4">
              Lastly, please enable notification
            </h5>
            <p className="text-center pt-2 color-grey">
              Enable your notifications for more update and important messages
              about your grocery needs
            </p>
          </div>
          <div className="padding_15">
            <button className="fill" onClick={handleEnableNotifications}>
              Enable Notifications
            </button>
            <button className="outline" onClick={handleSkipForNow}>
              Skip For Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
