import "./cities.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";
import { baseURL } from "../../context/authContext";

const Cities = () => {
  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(1);
  const [slide3, setSlide3] = useState(2);
  const [pictures, setPictures] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const runOnce = useRef(false);
  const pictureAddress = baseURL + "hotel-cities/";

  const screenSize = useWindowSize();
  // console.log('screenSize.width: ', screenSize.width)

  useEffect(() => {
    let cityPictures = []
    if (runOnce.current === false) {
      
      const loadPage = async () => {
        setLoading(true);
        try {
          const resp = await axios.get(
            "https://meridianhomes-backend.onrender.com/api/v1/hotels/countByCity"
          );
          console.log("resp.data: ", resp.data.data);
          setHotelsData([...resp.data.data]);

          let split1;
          let split2;
          let join1;
          let join2;
          let photoArray = [];
          resp.data.data.forEach((city) => {
            split1 = city._id.split(".");
            join1 = split1.join("");
            split2 = join1.split(" ");
            join2 = split2.join("");
            photoArray.push(join2);
          });

          setPictures([...photoArray])
          // console.log('photoArray: ', photoArray)

          // const promiseList = photoArray.map((city) => {
          //   return axios.get(
          //     `https://meridianhomes-backend.onrender.com/api/v1/pictures/cities/${city}`,
          //     { responseType: "blob" }
          //   );
          // });
          // const cityPhotos = await Promise.all(promiseList);

          // let cityPhotosArray = [];
          // let cityPhoto;

          // cityPhoto = await axios.get(
          //   `https://meridianhomes-backend.onrender.com/api/v1/pictures/cities/dallas`
          // );

          // console.log('cityPhoto: ', cityPhoto)

          // photoArray.forEach(async (city) => {
          //   cityPhoto = await axios.get(
          //     `https://meridianhomes-backend.onrender.com/api/v1/pictures/cities/${city}`,
          //     { responseType: "blob" }
          //   );
          //   console.log('cityPhoto: ', cityPhoto)
          //   cityPhotosArray.push(cityPhoto.data)
          // })

          // console.log('cityPhotosArray: ', cityPhotosArray)

          // cityPictures = cityPhotosArray.map(picture => {
          //   return URL.createObjectURL(picture.data)
          // })

          // setPictures([...cityPictures]);

          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };

      loadPage();
    }

    return () => {
      // cityPictures.forEach(picture => {
      //   URL.revokeObjectURL(picture);
      // })
      
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
      {loading ? (
        <p>Loading !!!</p>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="changeArrow"
            onClick={() => changeSlide("left")}
          />

          <div className="cities">
            <img
              src={`https://meridianhomes-backend.onrender.com/hotel-cities/${pictures[slide1]}.jpg`}
              className="cityPicture"
              alt=""
              width="200"
              height="200"
            />
            <div className="cityDiv">
              <h3 className="cityHeader">{hotelsData[slide1]._id}</h3>
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
                src={`https://meridianhomes-backend.onrender.com/hotel-cities/${pictures[slide2]}.jpg`}
                className="cityPicture"
                alt=""
                width="200"
                height="200"
              />
              <div className="cityDiv">
                <h3 className="cityHeader">{hotelsData[slide2]._id}</h3>
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
                src={`https://meridianhomes-backend.onrender.com/hotel-cities/${pictures[slide3]}.jpg`}
                className="cityPicture"
                alt=""
                width="200"
                height="200"
              />
              <div className="cityDiv">
                <h3 className="cityHeader">{hotelsData[slide3]._id}</h3>
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
        </>
      )}
    </div>
  );
};

export default Cities;
