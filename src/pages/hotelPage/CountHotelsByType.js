import { useState, useEffect, useRef } from "react";
import axios from "axios";

const CountHotelsByTypes = () => {
  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState();
  const runOnce = useRef(false)

  useEffect(() => {
    if (runOnce.current === false) {
      const displayData = async () => {
        setLoading(true);
        try {
          const resp = await axios.get("/hotels/countbytype");
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
          {hotelData.map((hotelType) => (    
            <div key={hotelType._id}>
              <h5> <span style={{"text-transform": "capitalize"}}>{hotelType._id}</span></h5>
              <p>{hotelType.numberOfHotels} {hotelType.numberOfHotels == 1 ? 'property' : 'properties'}</p>
              <br />
            </div>    
          ))}
        </>
      )}
    </div>
  );
};

export default CountHotelsByTypes;
