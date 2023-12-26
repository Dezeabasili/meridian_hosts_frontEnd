import { useLocation, Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./list.css";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";
import { useSearchContext } from "../../context/searchContext";
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


const List = () => {
  
  const location = useLocation();
  const ref = useRef(false);
  const refDate1 = useRef();
  const refDate2 = useRef();
  const [hotelList, setHotelList] = useState([]);
  const [startDate, setStartDate] = useState({}); // new
  const [endDate, setEndDate] = useState({});  //new
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [hideCheckInDate, setHideCheckInDate] = useState(false);
  const [hideCheckOutDate, setHideCheckOutDate] = useState(false);

  const {
    date,
    setDate,
    destination,
    setDestination,
    roomOptions,
    setRoomOptions,
  } = useSearchContext();

  useEffect(() => {
    const fetchData = async () => {   
      setLoading(true);
      try {
        const res = await axios.get(`/hotels?city=${destination}`);
        setHotelList([...res.data.data]);

        let split1;
        let split2;
        let join1;
        let join2;
        let hotelArray = [];

        res.data.data?.forEach((hotel) => {
          split1 = hotel.name.split(".");
          join1 = split1.join("");
          split2 = join1.split(" ");
          join2 = split2.join("");
          hotelArray.push(join2);
        });
        // console.log("hotelTypeArray: ", hotelTypeArray);
        setPictures([...hotelArray]);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (ref.current === false) {
      fetchData();
    }

    document.addEventListener("click", handleHide, true);

    return () => {
      ref.current = true;
      document.removeEventListener("click", handleHide, true);
    };
  }, []);


  const handleHide = (e) => {
    if (refDate1.current?.contains(e.target)) {
      setHideCheckInDate(true);
    } else if (refDate2.current?.contains(e.target)) {
      setHideCheckOutDate(true);
    } else {
      setHideCheckInDate(false);
      setHideCheckOutDate(false);
    }
  };

  console.log(hotelList);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `/hotels?city=${destination}&min=${min}&max=${max}`
      );
      setHotelList([...res.data.data]);

      let split1;
      let split2;
      let join1;
      let join2;
      let hotelArray = [];

      res.data.data?.forEach((hotel) => {
        split1 = hotel.name.split(".");
        join1 = split1.join("");
        split2 = join1.split(" ");
        join2 = split2.join("");
        hotelArray.push(join2);
      });
      // console.log("hotelTypeArray: ", hotelTypeArray);
      setPictures([...hotelArray]);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {location.state ? (
        <>  
          {
            !loading && (
              // <div>

              <div className="listContainer">
                <div className="listWrapper">
                  <div className="listSearch">
                    <h1 className="listTitle">Search</h1>
                    <div className="listItem">
                      <label>City name:</label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <div className="listItem" >
                      <label>Check-in date:</label>
                      <span
                      
                        onClick={() => setHideCheckInDate((prev) => !prev)}
                      >{`${format(date[0]?.startDate, "MM/dd/yyyy")}`}</span>
                      <div className="calendar" ref={refDate1}>
                      {hideCheckInDate && (
                        <DateRange
                          onChange={(item) => setDate([item.selection])}
                          ranges={date}
                          minDate={new Date()}                        
                        />
                      )}
                      </div>
                    </div>
                    <div className="listItem" >
                      <label>Check-out date:</label>
                      <span
                        onClick={() => setHideCheckOutDate((prev) => !prev)}
                      >{`${format(date[0]?.endDate, "MM/dd/yyyy")}`}</span>
                      <div className="calendar" ref={refDate2}>
                      {hideCheckOutDate && (
                        <DateRange
                          onChange={(item) => setDate([item.selection])}
                          ranges={date}
                          minDate={new Date()}                       
                        />
                      )}
                      </div>
                    </div>
                    {/* <div className='listItem'> */}
                    <h5>Options</h5>
                    {/* <div className='OptionsDiv'> */}
                    <div className="listItem">
                      <label>
                        Min price <small>(per night)</small>
                      </label>
                      <input
                        type="number"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </div>
                    <div className="listItem">
                      <label>
                        Max price <small>(per night)</small>
                      </label>
                      <input
                        type="number"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>
                    {/* <div className="listItem">
                      <label>Adult</label>
                      <input
                        type="number"
                        min={1}
                        placeholder={roomOptions.adults}
                      />
                    </div>
                    <div className="listItem">
                      <label>Children</label>
                      <input
                        type="number"
                        min={0}
                        placeholder={roomOptions.children}
                      />
                    </div>
                    <div className="listItem">
                      <label>Room</label>
                      <input
                        type="number"
                        min={1}
                        placeholder={roomOptions.rooms}
                      />
                    </div> */}
                    {/* </div> */}
                    {/* </div> */}
                    <button onClick={handleClick}>Search</button>
                  </div>
                  <div className="listResult">
                    <SearchItem hotelList={hotelList} pictures={pictures} hideCheckInDate={hideCheckInDate} hideCheckOutDate={hideCheckOutDate} />
                  </div>
                </div>
              </div>
            )
            // </div>
          }
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default List;
