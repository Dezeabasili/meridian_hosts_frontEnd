import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { baseURL } from "../../context/authContext";

const Logout = () => {
  const runOnce = useRef(false);
  const [loading, setLoading] = useState(true);
  const { setAuth, setProfilePhoto } = useAuthContext();

  useEffect(() => {
    if (runOnce.current === false) {
      const signout = async () => {
        try {
          setLoading(true);
          // clear the access token from memory
          setAuth({});
          // clear the cookie
          await axios.get(baseURL + "api/v1/auth/logout", { withCredentials: true });
          localStorage.clear();
          setProfilePhoto('')
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };

      signout();
    }

    return () => {
        runOnce.current = true
      }
  }, []);

  return (
    <div>
      {loading ? <p>You are logged out</p> : <Navigate to={"/login"} replace />}
    </div>
  );
};

export default Logout;
