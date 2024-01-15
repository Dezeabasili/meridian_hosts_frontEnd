import "./featuredHotels.css";
// import useAxios from "./../../hooks/useAxios";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";
import { baseURL } from "../../context/authContext";
import {RotatingLines} from 'react-loader-spinner'

const FeaturedHotels = () => {
  const pictureAddress = baseURL + "hotel-types/"
  const [picture, setPicture] = useState();
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelsToDisplay, setHotelsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const runOnce = useRef(false)

  const screenSize = useWindowSize();
  // console.log('screenSize.width: ', screenSize.width)
  const ref = useRef()
  
  ref.current = screenSize.width

  const errorDiv = error 
  ? <div className="error">
      {error}
    </div> 
  : '';

  useEffect(() => {
    if (runOnce.current === false) {
      const loadPage = async () => {
        setLoading(true);
        setError(null);
        try {
          const resp = await axios.get(baseURL + "api/v1/hotels/countByType");
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
  
          // let split1;
          // let join1;
          // let hotelTypeArray = [];
  
          // resp.data.data.forEach((hotelType) => {
          //   split1 = hotelType._id.split("-");
          //   join1 = split1.join("");
          //   hotelTypeArray.push(join1);
          // });
          // // console.log("hotelTypeArray: ", hotelTypeArray);
          // setPicture([...hotelTypeArray]);
  
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(err.response.data.message);
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
      <>
      {loading && <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />}
      </>
      <>
        {!loading && <>
          <h3 className="hotelContainerTitle">Explore our hotels</h3>
          <div className="hotelList">
            {hotelsToDisplay.map((hotel, index) => {
              return (
                <div className="hotelType" key={hotel.hotelType}>
                  <img
                    src={hotel.photo}
                    alt=""
                    className="hotelImg"
                    width="200"
                    height="200"
                  />
                  <h4 className="hotelTypeTitle">{hotel.hotelType}</h4>
                  <h5 className="hotelTypeNum">
                    {hotel.numberOfHotels} {hotel.numberOfHotels == 1 ? 'property' : 'properties'}
                  </h5>
                </div>
              );
            })}
          </div>
        </>}
      </>
      <>
      {error && errorDiv}
      </>
      
    </div>
  );
};

export default FeaturedHotels;
