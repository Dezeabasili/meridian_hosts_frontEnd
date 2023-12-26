import "./favProperties.css";
// import useAxios from "./../../hooks/useAxios";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";
import { baseURL } from "../../context/authContext";

const FavProperties = () => {
  const pictureAddress = baseURL + "hotelsPictures/"
  // const [picture, setPicture] = useState();
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelsToDisplay, setHotelsToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);

  const screenSize = useWindowSize();
  // console.log('screenSize.width: ', screenSize.width)
  const ref = useRef();
  const runOnce = useRef(false)
  ref.current = screenSize.width;

  useEffect(() => {
    if (runOnce.current === false) {
    const loadPage = async () => {
      
        setLoading(true);
      try {
        const resp = await axios.get("/hotels?sort=-ratingsAverage&limit=4");
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
        // let split2;
        // let join1;
        // let join2;
        // let hotelArray = [];

        // resp.data.data.forEach((hotel) => {
        //   split1 = hotel.name.split(".");
        //   join1 = split1.join("");
        //   split2 = join1.split(" ");
        //   join2 = split2.join("");
        //   hotelArray.push(join2);
        // });

        // resp.data.data.forEach((hotel) => {
        //   hotelArray.push(hotel.photos);
        // });
        // console.log("hotelTypeArray: ", hotelTypeArray);
        // setPicture([...hotelArray]);

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
    <div className="fPContainer">
      {loading ? (
        <p>Loading !!!</p>
      ) : (
        <>
          <h3 className="fPContainerTitle">Homes guests love</h3>
          <div className="fPList">
            {hotelsToDisplay?.map((hotel, index) => {
              return (
                <div className="favProperty" key={hotel._id}>
                  <img
                    src={pictureAddress + `${hotel._id}/${hotel.photos}`}
                    alt=""
                    className="fPImg"
                    width="150"
                    height="150"
                  />
                  <h4 className="fPName">{hotel.name}</h4>
                  <p className="fPDesc">{hotel.description}</p>
                  <p className="fPPrice">
                    Starting from ${hotel.cheapestPrice}
                  </p>
                  <div className="fPStats">
                    <button className="fPRating">Rating: {hotel.ratingsAverage}</button>
                    <span className="fPReviews nowrap">
                      {hotel.numberOfRatings} {hotel.numberOfRatings == 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FavProperties;
