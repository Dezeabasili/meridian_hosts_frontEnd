import "./searchItem.css";
import { Link } from "react-router-dom";
import { baseURL } from "../../context/authContext";

const SearchItem = ({ hotelList, pictures, hideCheckInDate, hideCheckOutDate  }) => {
  const pictureAddress = baseURL + "hotelsPictures/"
  return (
    <div>
      {hotelList.length < 1 ? (
        <h3>We do not have a hotel in the city you specified</h3>
      ) : (
        <>
          {hotelList?.map((hotel, index) => {
            return (
              <div key={hotel._id}>
                <div className="itemContainer">
                  <div className={hideCheckInDate || hideCheckOutDate ? "pictureAlt" : "picture"}>
                    <img
                      src={hotel.photos}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </div>
                  <div>
                    <h2 className="SearchItem_Hotel_Name">{hotel.name}</h2>
                    {hotel.distanceToClosestTouristLocation &&
                      hotel.closestTouristLocation && (
                        <p>
                          {hotel.distanceToClosestTouristLocation} miles from{" "}
                          {hotel.closestTouristLocation}
                        </p>
                      )}

                    <p>{hotel.description}</p>

                    <p>
                      You can cancel later, so lock-in this great price today
                    </p>
                    <div>
                      <div>
                        <div>
                          <div>
                            <span>Hotel rating: </span>
                            <span>{hotel.ratingsAverage}</span>
                          </div>
                          <div>
                            <span>Number of reviews: </span>
                            <span>{hotel.numberOfRatings}</span>
                          </div>
                        </div>
                        <div>
                          <div>
                            <span>Minimum price per night: </span>
                            <span><b>${hotel.cheapestPrice}</b></span>
                          </div>
                          <div>
                            <p>Free cancellation</p>
                          </div>
                        </div>
                      </div>
                      <div className= {hideCheckInDate || hideCheckOutDate ? "smallerPictureAlt" : "smallerPicture"} >
                        <img
                          src={hotel.photos}
                          alt=""
                          width={200}
                          height={200}
                        />
                      </div>
                      <Link to={`/hotels/${hotel._id}/all`}>
                          <button>See availability</button>
                        </Link>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchItem;
