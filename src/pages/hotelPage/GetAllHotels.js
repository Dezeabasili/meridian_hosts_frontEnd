import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";
import { RotatingLines } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const GetAllHotels = () => {
  const [hotelsList, setHotelsList] = useState();
  const [loading, setLoading] = useState(true);
  const runOnce = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();

  useEffect(() => {
    if (runOnce.current === false) {
      const hotels = async () => {
        setLoading(true);
        try {
          if (location.state) {
            setHotelsList(location.state);
          } else {
            const resp = await axiosWithInterceptors.get(
              baseURL + "api/v1/hotels"
            );
            // console.log("hotels: ", resp.data.data);
            setHotelsList([...resp.data.data]);
          }

          setLoading(false);
        } catch (err) {
          if (err.response?.data?.message) {
            navigate("/handleerror", {
              state: {
                message: err.response.data.message,
                path: location.pathname,
              },
            });
          } else {
            navigate("/somethingwentwrong");
          }
        }
      };

      hotels();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  const showSelectedHotel = (hotel_id) => {
    const hotelToDisplay = hotelsList.find((hotel) => hotel_id === hotel._id);
    navigate(`/hotels/${hotel_id}`, { state: hotelToDisplay });
  };

  return (
    <div>
      {loading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <>
          {hotelsList.length > 0 ? (
            <>
              {hotelsList?.map((hotel) => {
                const yellowStars = Math.trunc(hotel.ratingsAverage);
                const whiteStar = Math.trunc(5 - hotel.ratingsAverage);
                const halfStar = 5 - yellowStars - whiteStar;
                return (
                  <div key={hotel._id}>
                    <p>Hotel id: {hotel._id}</p>
                    <p>
                      Hotel name:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {hotel.name}
                      </span>
                    </p>
                    <p>
                      Hotel address:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {hotel.hotelLocation.address}
                      </span>
                    </p>
                    <p>
                      Hotel city:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {hotel.city.cityName}
                      </span>
                    </p>
                    <p>
                      Hotel type:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {hotel.type.hotelType}
                      </span>
                    </p>
                    <p>Hotel description: {hotel.description}</p>
                    <div>
                      <span>Rating: </span>

                      {[...Array(yellowStars)].map((star, i) => (
                        <FontAwesomeIcon
                          icon={faStar}
                          size="sm"
                          className="fStar"
                          key={i}
                        />
                      ))}

                      {[...Array(halfStar)].map((star, i) => (
                        <FontAwesomeIcon
                          icon={faStarHalfStroke}
                          size="sm"
                          className="fStar"
                          key={i}
                        />
                      ))}

                      {[...Array(whiteStar)].map((star, i) => (
                        <FontAwesomeIcon
                          icon={faStar}
                          size="sm"
                          className="fStarHover"
                          key={i}
                        />
                      ))}
                    </div>
                    <p>Number of ratings: {hotel.numberOfRatings}</p>
                    <p>Minimum room price: ${hotel.cheapestPrice}</p>
                    <button
                      onClick={() => showSelectedHotel(hotel._id)}
                      style={{ marginTop: "5px" }}
                    >
                      Show hotel details
                    </button>
                    <br />
                    <br />
                  </div>
                );
              })}
            </>
          ) : (
            <p>No hotel in the database !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetAllHotels;
