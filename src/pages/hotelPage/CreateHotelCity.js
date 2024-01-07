import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const CreateHotelCity = () => {
 
  const [cityName, setCityName] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const resp = await axiosWithInterceptors.post(baseURL + "api/v1/hotels/createcity", {
        cityName  
      });
      console.log(resp.data.data);
      navigate("/hotels");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">Provide city name</h3>

        <div className="registerDiv">
          <label htmlFor="cityName">City name:</label>
          <input
            id="cityName"
            type="text"
            value={cityName || ''}
            onChange={(e) => setCityName(e.target.value)}
            autoComplete="off"
          />
        </div>
        

        <button
          className="signUpButton"
          disabled={
            !cityName
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CreateHotelCity;
