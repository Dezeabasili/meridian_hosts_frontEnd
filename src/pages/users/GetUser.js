import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";


const GetUser = () => {
  const runOnce = useRef(false)
  const [loading, setLoading] = useState(true);
  const [userToDisplay, setUserToDisplay] = useState();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();

  useEffect(() => {
    if (runOnce.current === false) {
      const displayUser = async () => {
        setLoading(true);
  
        if (location.state) {
          setUserToDisplay(location.state);
  
          setLoading(false);
        }
      };
      displayUser();
    }

    return () => {
      runOnce.current = true
    }

  }, []);

  const deleteThisUser = async () => {
    try {
      await axiosWithInterceptors.delete(baseURL + `api/v1/users/${userToDisplay._id}`);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading !!!</p>
      ) : (
        <>
          <p>User name: <span style={{"text-transform": "capitalize"}}>{userToDisplay.name}</span></p>
          <p>User email: {userToDisplay.email}</p>
          <br />
          <button
            onClick={() => {
              deleteThisUser();
            }}
          >
            Delete this user
          </button>
          
        </>
      )}
    </div>
  );
};

export default GetUser;
