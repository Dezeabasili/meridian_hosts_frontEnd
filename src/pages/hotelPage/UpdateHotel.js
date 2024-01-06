import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const UpdateHotel = () => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [type, setType] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [manager, setManager] = useState();
  const [addStaff, setAddStaff] = useState();
  const [removeStaff, setRemoveStaff] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axiosWithInterceptors.patch(
        baseURL + `api/v1/hotels/${location.state}`,
        { name, city, type, address, description, manager, addStaff, removeStaff }
      );
      // console.log(resp.data.data);
      navigate(`/hotels/${location.state}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">
          Provide only the hotel information to change 
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
        <div className="registerDiv">
          <label htmlFor="hotelAddress">Hotel address:</label>
          <input
            id="hotelAddress"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelDesc">Hotel description:</label>
          <textarea
            id="hotelDesc"
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            rows="5"
            cols="30"
          >
            {description}
          </textarea>
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelManager">Hotel Manager:</label>
          <input
            id="hotelManager"
            type="text"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelStaff">Add one or more staff:</label>
          <input
            id="hotelStaff"
            type="text"
            value={addStaff}
            onChange={(e) => setAddStaff(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelStaff2">Remove one or more staff:</label>
          <input
            id="hotelStaff2"
            type="text"
            value={removeStaff}
            onChange={(e) => setRemoveStaff(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button className="signUpButton" disabled={!name && !city && !type && !address && !description && !manager && !addStaff && !removeStaff}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default UpdateHotel;
