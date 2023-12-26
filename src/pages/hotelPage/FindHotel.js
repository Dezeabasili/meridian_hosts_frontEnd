import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const FindHotel = () => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [type, setType] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.get(
        "/hotels",
        { name, city, type }
      );
      console.log(resp.data.data);
      navigate("/hotels", { state: resp.data.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
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
          <label htmlFor="hotelCity">Hotel city:</label>
          <input
            id="hotelCity"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelType">Hotel type:</label>
          <input
            id="hotelType"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button className="signUpButton" disabled={!name && !city && !type}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default FindHotel;
