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
            <h3 className="headerTitle">Finds deals for any season</h3>
            <p className="headerDesc">
              From cozy bed & breakfast to luxury rooms
            </p>
          </div>

          <div className="headerSearch">
            <div className="headerSearchItem headerSearchItem1">
              <FontAwesomeIcon
                icon={faCity}
                className="headerSearchIcon headerSearchIcon1"
              />
              <input
                type="text"
                className="headerSearchInput"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div
              onClick={hideDateFunc}
              className="headerSearchItem headerSearchItem2"
            >
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="headerSearchIcon headerSearchIcon2"
              />
              <span className="headerSearchSpan headerSearchSpan1">
                {`${format(date[0].startDate, "MMM/dd/yyyy")}  -  ${format(
                  date[0].endDate,
                  "MMM/dd/yyyy"
                )}`}
              </span>

              <div
                className={
                  hideDate ? "headerSearchDatePicker" : "hideDateClass"
                }
                ref={refDate}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  minDate={new Date()}
                  // scroll={{enabled: true, longMonthHeight: 100}}
                />
 
              </div>
            </div>
            {/* <div
              onClick={hideRoomOptionsFunc}
              className="headerSearchItem headerSearchItem3"
            >
              <FontAwesomeIcon
                icon={faPersonWalkingLuggage}
                className="headerSearchIcon headerSearchIcon3"
              />
              <div>
                <span className="nowrap">{`${roomOptions.adults} adult(s), `}</span>
                <span className="nowrap">{`${roomOptions.children} children, `}</span>
                <p className="nowrap">{`${roomOptions.rooms} room(s)`}</p>
              </div>

              <div
                ref={refRoomOptions}
                className={
                  hideRoomOptions ? "headerSearchOptions" : "hideDateClass"
                }
              >
                <div className="roomOptions roomOptions1">
                  <span className="roomOptionsSpan roomOptionsSpan1">
                    Adults
                  </span>
                  <div className="roomOptionsDiv roomOptionsDiv1">
                    <button
                      className="roomOptionsDivSpan roomOptionsDivMinus roomOptionsDivSpan1"
                      disabled={roomOptions.adults <= 1}
                      onClick={() => modifyRoomOptions("adults", "decrease")}
                    >
                      -
                    </button>
                    <span className="roomOptionsDivSpan roomOptionsDivSpan2">
                      {roomOptions.adults}
                    </span>
                    <button
                      className="roomOptionsDivSpan roomOptionsDivPlus roomOptionsDivSpan3"
                      disabled={roomOptions.adults >= 30}
                      onClick={() => modifyRoomOptions("adults", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="roomOptions roomOptions2">
                  <span className="roomOptionsSpan roomOptionsSpan2">
                    Children
                  </span>
                  <div className="roomOptionsDiv roomOptionsDiv2">
                    <button
                      className="roomOptionsDivSpan roomOptionsDivMinus roomOptionsDivSpan4"
                      disabled={roomOptions.children <= 0}
                      onClick={() => modifyRoomOptions("children", "decrease")}
                    >
                      -
                    </button>
                    <span className="roomOptionsDivSpan roomOptionsDivSpan5">
                      {roomOptions.children}
                    </span>
                    <button
                      className="roomOptionsDivSpan roomOptionsDivPlus roomOptionsDivSpan6"
                      disabled={roomOptions.children >= 10}
                      onClick={() => modifyRoomOptions("children", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="roomOptions roomOptions3">
                  <span className="roomOptionsSpan roomOptionsSpan3">
                    Rooms
                  </span>
                  <div className="roomOptionsDiv roomOptionsDiv3">
                    <button
                      className="roomOptionsDivSpan roomOptionsDivMinus roomOptionsDivSpan7"
                      disabled={roomOptions.rooms <= 1}
                      onClick={() => modifyRoomOptions("rooms", "decrease")}
                    >
                      -
                    </button>
                    <span className="roomOptionsDivSpan roomOptionsDivSpan8">
                      {roomOptions.rooms}
                    </span>
                    <button
                      className="roomOptionsDivSpan roomOptionsDivPlus roomOptionsDivSpan9"
                      disabled={roomOptions.rooms >= 30}
                      onClick={() => modifyRoomOptions("rooms", "increase")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="roomOptionsBtn"
                  onClick={() => setHideRoomOptions(false)}
                >
                  Done
                </button>
              </div>
            </div> */}
            <button
              onClick={handleSearch}
              className="headerSearchItem headerSearchButton"
            >
              Search
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Header;
