import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import "./getAllBookings.css";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const GetAllHotelCityRefs = () => {
  const [referenceList, setReferenceList] = useState();
  const [loading, setLoading] = useState(true);
  const runOnce = useRef(false)
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();

  useEffect(() => {
    if (runOnce.current === false) {
      const references = async () => {
        setLoading(true);
        try {
      
            const resp = await axiosWithInterceptors.get(baseURL + "api/v1/hotels/allcityrefs");
            // console.log("hotels: ", resp.data.data);
            setReferenceList([...resp.data.data]);
         
  
          setLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };
  
      references();
    }

    return () => {
      runOnce.current = true
    }

  }, []);


  return (
    <div>
      {loading ? (
        <p>Loading !!!</p>
      ) : (
        <>
          {referenceList.length > 0 ? (
            <>
              {referenceList?.map((city) => (
                <div key={city._id}>
                  <p>City reference: {city._id}</p>
                  <p>City name: <span style={{"text-transform": "capitalize"}}>{city.cityName}</span></p>
                  
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No hotel city in the database !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetAllHotelCityRefs;


