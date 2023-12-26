import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

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
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const resp = await axiosWithInterceptors.post("/hotels", {
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
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
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
          <label htmlFor="hotelCity">Hotel city:</label>
          <input
            id="hotelCity"
            type="text"
            value={city || ''}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelType">Hotel type:</label>
          <input
            id="hotelType"
            type="text"
            value={type || ''}
            onChange={(e) => setType(e.target.value)}
            autoComplete="off"
          />
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
      </form>
    </div>
  );
};

export default CreateHotel;
