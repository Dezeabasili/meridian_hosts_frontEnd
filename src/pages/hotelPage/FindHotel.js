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

  
  const handleSelectChange = (e) => {
    setCity(e.target.value);
  };
  const handleSelectChange2 = (e) => {
    setType(e.target.value);
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
              <label htmlFor="city">Select a city:</label>
              <select id="city" onChange={handleSelectChange}>
                <option
                  style={{ textTransform: "capitalize" }}
                  value={""}
                  onClick={() => setCity(null)}
                >
                  --Please select an option--
                </option>
                {cityData?.map((selectedCity) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={selectedCity._id}
                    value={selectedCity._id}
                  >
                    {selectedCity.cityName}
                  </option>
                ))}
              </select>
            </div>

            <div className="registerDiv">
              <label htmlFor="hoteltype">Select a hotel type:</label>
              <select id="hoteltype" onChange={handleSelectChange2}>
                <option
                  style={{ textTransform: "capitalize" }}
                  value={""}
                  onClick={() => setType(null)}
                >
                  --Please select an option--
                </option>
                {hotelTypeData?.map((selectedType) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={selectedType._id}
                    value={selectedType._id}
                  >
                    {selectedType.hotelType}
                  </option>
                ))}
              </select>
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
