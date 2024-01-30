import { useNavigate, useLocation } from "react-router-dom";

const SearchHotelsResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotelsList = [...location.state?.hotelsToDisplay];

  const showSelectedHotel = (hotel_id) => {
    const hotelToDisplay = hotelsList.find(
      (hotel) => hotel_id === hotel._id
    );
    navigate(`/hotels/${hotel_id}`, { state: hotelToDisplay, replace: true });
  };

  return (
    <div>
          {hotelsList.length > 0 ? (
            <>
              {hotelsList?.map((hotel) => (
                <div key={hotel._id}>
                  <p>Hotel reference: {hotel._id}</p>
                  <p>Hotel name: <span style={{"textTransform": "capitalize"}}>{hotel.name}</span></p>
                  <p>Hotel address: <span style={{"textTransform": "capitalize"}}>{hotel.hotelLocation.address}</span></p>
                  <p>Hotel city: <span style={{"textTransform": "capitalize"}}>{hotel.city.cityName}</span></p>
                  <p>Hotel type: <span style={{"textTransform": "capitalize"}}>{hotel.type.hotelType}</span></p>
                  <p>Hotel description: {hotel.description}</p>
                  <p>Ratings: {hotel.ratingsAverage}</p>
                  <p>Number of ratings: {hotel.numberOfRatings}</p>
                  <p>Minimum room price: ${hotel.cheapestPrice}</p>
                  <button onClick={() => showSelectedHotel(hotel._id)} style={{marginTop: '5px'}}>
                    Show hotel details
                  </button>
                  <br />
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No hotel in the database !!!</p>
          )}
    </div>
  );
};

export default SearchHotelsResults;


