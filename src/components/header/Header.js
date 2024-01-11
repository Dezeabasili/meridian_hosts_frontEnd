import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faMasksTheater,
  faTaxi,
  faCity,
  faCalendarDays,
  faPersonWalkingLuggage,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../context/searchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = ({ type }) => {
  const refDate = useRef();
  const refRoomOptions = useRef();
  const [hideDate, setHideDate] = useState(false);
  const [hideRoomOptions, setHideRoomOptions] = useState(false);

  const {
    date,
    setDate,
    destination,
    setDestination,
    roomOptions,
    setRoomOptions,
    checkinDateValue,
    setCheckinDateValue,
    checkoutDateValue,
    setCheckoutDateValue,
    validateCheckoutDateValue,
    validateCheckinDateValue
  } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
  
    document.addEventListener("click", handleHide, true);

    return () => {
      document.removeEventListener("click", handleHide, true);
    };
  }, []);

  const handleHide = (e) => {
    if (refDate.current?.contains(e.target)) {
      setHideDate(true);
    } else if (refRoomOptions.current?.contains(e.target)) {
      setHideRoomOptions(true);
    } else {
      setHideRoomOptions(false);
      setHideDate(false);
    }
  };

  const modifyRoomOptions = (keyValue, reqOperation) => {
    setRoomOptions((prev) => {
      let newValue;
      if (reqOperation === "increase") {
        newValue = roomOptions[keyValue] + 1;
      } else {
        newValue = roomOptions[keyValue] - 1;
      }
      return {
        ...prev,
        [keyValue]: newValue,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotelslist", { state: { destination, date, roomOptions } });
  };

  const hideDateFunc = () => {
    setHideDate(true);
    refDate.current.focus();
  };
  const hideRoomOptionsFunc = () => {
    setHideRoomOptions(true);
    refRoomOptions.current.focus();
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <>
          <div className="headerTitleDiv">
            <h3 className="headerTitle">Find deals for any season</h3>
            <p className="headerDesc">
              From cozy bed & breakfast to luxury rooms
            </p>
          </div>

          <div className="headerSearch">
            <div className="headerSearchItem headerSearchItem1">
              <div className="headerSearchItemTopDiv">
                <FontAwesomeIcon
                  icon={faCity}
                  className="headerSearchIcon headerSearchIcon1"
                />
                <span>Destination</span>
              </div>

              <input
                type="text"
                className="headerSearchInput"
                placeholder="City"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div
              // onClick={hideDateFunc}
              className="headerSearchItem headerSearchItem2"          
            >
              <div className="headerSearchItemTopDiv">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="headerSearchIcon headerSearchIcon2"
              />
              <p>Check in date</p>
              </div>
              
              <DatePicker
                selected={checkinDateValue}
                onChange={(date) => validateCheckinDateValue(date)}
                placeholderText="Select a date"
                dateFormat="dd/MMM/yyyy"
                minDate={new Date()}
                wrapperClassName="datepicker"             
                className="red-border"         
              /> 
            </div>

            <div
              // onClick={hideDateFunc}
              className="headerSearchItem headerSearchItem3"          
            >
              <div className="headerSearchItemTopDiv">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="headerSearchIcon headerSearchIcon2"
              />
              <p>Check out date</p>
              </div>
              
              <DatePicker
                selected={checkoutDateValue}
                onChange={(date) => validateCheckoutDateValue(date)}
                placeholderText="Select a date"
                dateFormat="dd/MMM/yyyy"
                minDate={new Date()}
                wrapperClassName="datepicker"
                className="red-border"
              /> 
            </div>

            <div className="headerSearchItem headerSearchItem3">
              <div className="headerSearchItemTopDiv hideEmptyDiv">

              </div>
            <button
              onClick={handleSearch}
              className="headerSearchButton"
            >
              Search
            </button>
            </div>
            
          </div>
        </>
      </div>
    </div>
  );
};

export default Header;
