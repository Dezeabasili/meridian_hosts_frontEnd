import "./cities.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";
import { baseURL } from "../../context/authContext";
import {RotatingLines} from 'react-loader-spinner'

const Cities = () => {
  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(1);
  const [slide3, setSlide3] = useState(2);
  const [pictures, setPictures] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const runOnce = useRef(false);
  const pictureAddress = baseURL + "hotel-cities/";

  const screenSize = useWindowSize();

  const errorDiv = error 
  ? <div className="error">
      {error}
    </div> 
  : '';


  useEffect(() => {
    let cityPictures = [];
    
    if (runOnce.current === false) {
      const loadPage = async () => {
        setLoading(true);
        setError(null);
        try {
          const resp = await axios.get(
            baseURL + "api/v1/hotels/countByCity"
          );
          console.log("resp.data: ", resp.data.data);
          setHotelsData([...resp.data.data]);

          // let split1;
          // let split2;
          // let join1;
          // let join2;
          // let photoArray = [];
          // resp.data.data.forEach((city) => {
          //   split1 = city._id.split(".");
          //   join1 = split1.join("");
          //   split2 = join1.split(" ");
          //   join2 = split2.join("");
          //   photoArray.push(join2);
          // });

          // setPictures([...photoArray]);

          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(err.response.data.message);
        }
      };

      loadPage();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  const changeSlide = (direction) => {
    if (direction === "right") {
      if (slide1 === hotelsData.length - 1) {
        setSlide1(0);
      } else {
        setSlide1((prev) => prev + 1);
      }
      if (slide2 === hotelsData.length - 1) {
        setSlide2(0);
      } else {
        setSlide2((prev) => prev + 1);
      }
      if (slide3 === hotelsData.length - 1) {
        setSlide3(0);
      } else {
        setSlide3((prev) => prev + 1);
      }
    } else {
      if (slide1 === 0) {
        setSlide1(hotelsData.length - 1);
      } else {
        setSlide1((prev) => prev - 1);
      }
      if (slide2 === 0) {
        setSlide2(hotelsData.length - 1);
      } else {
        setSlide2((prev) => prev - 1);
      }
      if (slide3 === 0) {
        setSlide3(hotelsData.length - 1);
      } else {
        setSlide3((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="citiesContainer">
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
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="changeArrow"
            onClick={() => changeSlide("left")}
          />

          <div className="cities">
            <img
              src={hotelsData[slide1].photo}
              className="cityPicture"
              alt=""
              width="200"
              height="200"
            />
            <div className="cityDiv">
              <h3 className="cityHeader">{hotelsData[slide1].cityName}</h3>
              <h5 className="cityDesc">
                {hotelsData[slide1].numberOfHotels}{" "}
                {hotelsData[slide1].numberOfHotels == 1
                  ? "property"
                  : "properties"}
              </h5>
            </div>
          </div>

          {screenSize.width >= 350 && (
            <div className="cities">
              <img
                src={hotelsData[slide2].photo}
                className="cityPicture"
                alt=""
                width="200"
                height="200"
              />
              <div className="cityDiv">
                <h3 className="cityHeader">{hotelsData[slide2].cityName}</h3>
                <h5 className="cityDesc">
                  {hotelsData[slide2].numberOfHotels}{" "}
                  {hotelsData[slide2].numberOfHotels == 1
                    ? "property"
                    : "properties"}
                </h5>
              </div>
            </div>
          )}

          {screenSize.width >= 485 && (
            <div className="cities">
              <img
                src={hotelsData[slide3].photo}
                className="cityPicture"
                alt=""
                width="200"
                height="200"
              />
              <div className="cityDiv">
                <h3 className="cityHeader">{hotelsData[slide3].cityName}</h3>
                <h5 className="cityDesc">
                  {hotelsData[slide3].numberOfHotels}{" "}
                  {hotelsData[slide3].numberOfHotels == 1
                    ? "property"
                    : "properties"}
                </h5>
              </div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="changeArrow"
            onClick={() => changeSlide("right")}
          />
        </>}
      </>
      <>
       {error && errorDiv}
      </>
     
    </div>
  );
};

export default Cities;
