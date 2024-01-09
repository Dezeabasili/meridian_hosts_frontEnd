import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseURL } from "../../context/authContext";

const CountHotelsByCities = () => {
  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState();
  const runOnce = useRef(false)

  useEffect(() => {
    if (runOnce.current === false) {
      const displayData = async () => {
        setLoading(true);
        try {
          const resp = await axios.get(baseURL + "api/v1/hotels/countbycity");
          // console.log(resp.data.data);
          setHotelData([...resp.data.data]);
          setLoading(false)
        } catch (err) {
          console.log(err);
        }
      };
  
      displayData();
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
          {hotelData.map((city) => (    
            <div key={city.cityName}>
              <h5><span style={{"textTransform": "capitalize"}}>{city.cityName}</span></h5>
              <p>{city.numberOfHotels} {city.numberOfHotels == 1 ? 'property' : 'properties'}</p>
              <br />
            </div>    
          ))}
        </>
      )}
    </div>
  );
};

export default CountHotelsByCities;
