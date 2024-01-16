import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";
import { RotatingLines } from "react-loader-spinner";

const CreateHotel = () => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [type, setType] = useState();
  const [coordinates, setCoordinates] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [detailedDescription, setDetailedDescription] = useState();
  const [closestTouristLocation, setClosestTouristLocation] = useState();
  const [distanceToClosestTouristLocation, setDistanceToClosestTouristLocation] = useState();
  const [manager, setManager] = useState();
  const [staff, setStaff] = useState();
  const [cityData, setCityData] = useState();
  const [cityDataFocus, setCityDataFocus] = useState(false);
  const [hotelTypeData, setHotelTypeData] = useState();
  const [hotelTypeDataFocus, setHotelTypeDataFocus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const runOnce = useRef(false);

  const errorDiv = error ? <div className="error">{error}</div> : "";

  useEffect(() => {
    if (runOnce.current === false) {
      const references = async () => {
        setLoading(true);
        setError(null);
        try {
          const resp = await axiosWithInterceptors.get(baseURL + "api/v1/hotels/allcityrefs");
          // console.log("hotels: ", resp.data.data);
          setCityData([...resp.data.data]);

          const resp2 = await axiosWithInterceptors.get(
            baseURL + "api/v1/hotels/allhoteltyperefs"
          );
          // console.log("hotels: ", resp.data.data);
          setHotelTypeData([...resp2.data.data]);

          setLoading(false);
        } catch (err) {
          console.log(err.message);
          setError(err.response.data.message);
        }
      };

      references();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const givenCoordinates = coordinates.split(",");
      let coordinatesToNumbers = [];
      coordinatesToNumbers.push(givenCoordinates[1] * 1);
      coordinatesToNumbers.push(givenCoordinates[0] * 1);
      console.log(coordinatesToNumbers);

      const staffList = staff.split(",");
      let staffArray = [];
      for (let i = 0; i < staffList.length; i++) {
        staffArray.push(staffList[i].trim());
      }
      // Continue tomorrow
      const hotelLocation = {
        coordinates: [...coordinatesToNumbers],
        address,
      };

      const resp = await axiosWithInterceptors.post(baseURL + "api/v1/hotels", {
        name,
        city,
        type,
        description,
        detailedDescription,
        hotelLocation,
        closestTouristLocation,
        distanceToClosestTouristLocation,
        manager,
        staff: staffArray,
      });
      console.log(resp.data.data);
      navigate("/hotels");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <>
        {loading && (
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
        )}
      </>
      <>
          {!loading && <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">Provide hotel details</h3>

        <div className="registerDiv">
          <label htmlFor="hotelName">Hotel name:</label>
          <input
            id="hotelName"
            type="text"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelCity">Hotel city reference number:</label>
          <input
            id="hotelCity"
            type="text"
            value={city || ''}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
            onFocus={() => setCityDataFocus(true)}
            onBlur={() => setCityDataFocus(false)}
          />
          <div
            className={
              cityDataFocus ? "showInstructions" : "hideInstructions"
            }
          >
            {cityData?.map((city) => (
              <div key={city._id}>
                <p style={{ textTransform: "capitalize" }}>
                  City Name: {city.cityName}
                </p>
                <p>City Reference: {city._id}</p>
                <br />
              </div>
            ))}
          </div>
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelType">Hotel type reference number:</label>
          <input
            id="hotelType"
            type="text"
            value={type || ''}
            onChange={(e) => setType(e.target.value)}
            autoComplete="off"
            onFocus={() => setHotelTypeDataFocus(true)}
            onBlur={() => setHotelTypeDataFocus(false)}
          />
          <div
            className={
              hotelTypeDataFocus ? "showInstructions" : "hideInstructions"
            }
          >
            {hotelTypeData?.map((hotelType) => (
              <div key={hotelType._id}>
                <p style={{ textTransform: "capitalize" }}>
                  Hotel Type: {hotelType.hotelType}
                </p>
                <p>Hotel Type Reference: {hotelType._id}</p>
                <br />
              </div>
            ))}
          </div>
        </div>

        <div className="registerDiv">
          <label htmlFor="coordinates">Hotel Location Coordinates:</label>
          <input
            id="coordinates"
            type="text"
            value={coordinates || []}
            onChange={(e) => setCoordinates(e.target.value)}
            autoComplete="off"
            placeholder="latitude, longitude"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="address">Hotel address:</label>
          <input
            id="address"
            type="text"
            value={address || ''}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelDesc">Brief hotel description:</label>
          <textarea
            id="hotelDesc"
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            rows="5"
            cols="30"
          >
            {description || ''}
          </textarea>
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelDesc">Detailed hotel description:</label>
          <textarea
            id="hotelDesc"
            onChange={(e) => setDetailedDescription(e.target.value)}
            autoComplete="off"
            rows="5"
            cols="30"
          >
            {detailedDescription || ''}
          </textarea>
        </div>
        <div className="registerDiv">
          <label htmlFor="touristLocation">Name of closest tourist location:</label>
          <input
            id="touristLocation"
            type="text"
            value={closestTouristLocation || ''}
            onChange={(e) => setClosestTouristLocation(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="distanceToTouristLocation">Distance (in miles) to closest tourist location:</label>
          <input
            id="distanceToTouristLocation"
            type="text"
            value={distanceToClosestTouristLocation || 0}
            onChange={(e) => setDistanceToClosestTouristLocation(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelManager">Hotel manager:</label>
          <input
            id="hotelManager"
            type="text"
            value={manager || ''}
            onChange={(e) => setManager(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelStaff">Hotel staff:</label>
          <input
            id="hotelStaff"
            type="text"
            value={staff || ''}
            onChange={(e) => setStaff(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button
          className="signUpButton"
          disabled={
            !name ||
            !city ||
            !type ||
            !coordinates ||
            !address ||
            !description ||
            !detailedDescription ||
            !manager ||
            !staff
          }
        >
          Continue
        </button>
      </form>}
      </>
      <>
      {error && errorDiv}
      </>
      
    </div>
  );
};

export default CreateHotel;
