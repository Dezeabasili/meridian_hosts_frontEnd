import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";
import { RotatingLines } from "react-loader-spinner";

const FindHotel = () => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [type, setType] = useState();
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
      const resp = await axiosWithInterceptors.get(
        baseURL + "api/v1/hotels",
        { name, city, type }
      );
      console.log(resp.data.data);
      navigate("/hotels", { state: resp.data.data });
    } catch (err) {
      console.log(err.message);
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
        <h3 className="registerTitle">
          Provide the hotel name, type or city 
        </h3>

        <div className="registerDiv">
          <label htmlFor="hotelName">Hotel name:</label>
          <input
            id="hotelName"
            type="text"
            value={name}
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

        <button className="signUpButton" disabled={!name && !city && !type}>
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

export default FindHotel;
