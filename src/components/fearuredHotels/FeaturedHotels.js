import "./featuredHotels.css";
// import useAxios from "./../../hooks/useAxios";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";
import { baseURL } from "../../context/authContext";

const FeaturedHotels = () => {
  const pictureAddress = baseURL + "hotel-types/"
  const [picture, setPicture] = useState();
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelsToDisplay, setHotelsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const runOnce = useRef(false)

  const screenSize = useWindowSize();
  // console.log('screenSize.width: ', screenSize.width)
  const ref = useRef()
  
  ref.current = screenSize.width

  useEffect(() => {
    if (runOnce.current === false) {
      const loadPage = async () => {
        setLoading(true);
        try {
          const resp = await axios.get("/hotels/countByType");
          // console.log("resp.data: ", resp.data.data);
          setHotelsData([...resp.data.data]);
          // setHotelsToDisplay(resp.data.data)
          if (ref.current <= 600) {
            setHotelsToDisplay((prev) => {
              prev = [...resp.data.data];
              prev?.pop();
              prev?.pop();
              // console.log("prev:", prev);
              return [...prev];
            });
          } else if (ref.current <= 900) {
            setHotelsToDisplay((prev) => {
              prev = [...resp.data.data];
              prev?.pop();
              return [...prev];
            });
          } else setHotelsToDisplay([...resp.data.data]);
  
          let split1;
          let join1;
          let hotelTypeArray = [];
  
          resp.data.data.forEach((hotelType) => {
            split1 = hotelType._id.split("-");
            join1 = split1.join("");
            hotelTypeArray.push(join1);
          });
          // console.log("hotelTypeArray: ", hotelTypeArray);
          setPicture([...hotelTypeArray]);
  
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
  
      loadPage();
    }

    return () => {
      runOnce.current = true
    }
    
  }, []);

  useEffect(() => {
    if (screenSize.width <= 600) {
      setHotelsToDisplay((prev) => {
        prev = [...hotelsData];
        prev?.pop();
        prev?.pop();
        return [...prev];
      });
    } else if (screenSize.width <= 900) {
      setHotelsToDisplay((prev) => {
        prev = [...hotelsData];
        prev?.pop();
        return [...prev];
      });
    } else setHotelsToDisplay([...hotelsData]);
  }, [screenSize.width]);

  return (
    <div className="hotelContainer">
      {loading ? (
        <p>Loading !!!</p>
      ) : (
        <>
          <h3 className="hotelContainerTitle">Explore our hotels</h3>
          <div className="hotelList">
            {hotelsToDisplay.map((hotel, index) => {
              return (
                <div className="hotelType" key={hotel._id}>
                  <img
                    src={pictureAddress + `${picture[index]}.jpg`}
                    alt=""
                    className="hotelImg"
                    width="200"
                    height="200"
                  />
                  <h4 className="hotelTypeTitle">{hotel._id}</h4>
                  <h5 className="hotelTypeNum">
                    {hotel.numberOfHotels} {hotel.numberOfHotels == 1 ? 'property' : 'properties'}
                  </h5>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedHotels;
