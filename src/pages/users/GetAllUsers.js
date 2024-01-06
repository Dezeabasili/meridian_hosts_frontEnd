import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const GetAllUsers = () => {
  const runOnce = useRef(false)
    const [usersList, setUsersList] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();

  useEffect(() => {
    if (runOnce.current === false) {
      const users = async () => {
        setLoading(true);
        try {
          if (location.state) {
              setUsersList(location.state);
              console.log('location.state: ', location.state)
          
          } else {
            const resp = await axiosWithInterceptors.get(baseURL + "api/v1/users");
            console.log("users: ", resp.data.data);
            setUsersList([...resp.data.data]);
          }
  
          setLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };
  
      users();
    }

    return () => {
      runOnce.current = true
    }

  }, []);

//   const showSelectedHotel = (hotel_id) => {
//     const hotelToDisplay = hotelsList.find(
//       (hotel) => hotel_id === hotel._id
//     );
//     navigate(`/hotels/${hotel_id}`, { state: hotelToDisplay });
//   };

  return (
    <div>
      {loading ? (
        <p>Loading !!!</p>
      ) : (
        <>
          {usersList.length > 0 ? (
            <>
              {usersList?.map((user) => (
                <div key={user._id}>                
                  <p>User name: <span style={{"text-transform": "capitalize"}}>{user.name}</span></p>
                  <p>User email: {user.email}</p>                 
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No user in the database !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetAllUsers;


