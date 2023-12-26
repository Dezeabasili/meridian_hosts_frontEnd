import "./trustDevice.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

const TrustDevice = () => {
  const [loading, setLoading] = useState(true);
  const runOnce = useRef(false)
  const { auth, setAuth, trustThisDevice } = useAuthContext();

  useEffect(() => {
    if (runOnce.current === false) {
      const getNewAccessToken = async () => {
        setLoading(true);
        try {
          if (trustThisDevice) {
            const res = await axios.get("/auth/renew_access_token", {
              withCredentials: true,
            });
            const accessToken = res.data.accessToken;
            const assignedRoles = res.data.assignedRoles;
            setAuth((prev) => {
              return {
                ...prev,
                accessToken,
                assignedRoles,
              };
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
  
      auth.accessToken ? setLoading(false) : getNewAccessToken();
    }

    return () => {
      runOnce.current = true
    }

  }, []);

  return (
    <>
      {trustThisDevice ? (
        <div className="trustDevice">
          {loading ? <p>Loading !!!</p> : <Outlet />}
        </div>
      ) : (
        <div className="trustDevice">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default TrustDevice;
