import "./reserveRoom.css";
import { format } from "date-fns";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useAxios from "../../hooks/useAxios";
import { useState, useEffect, useRef } from "react";
// import axios from "axios";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { useSearchContext } from "../../context/searchContext";

const ReserveRoom = ({
  setOpenHotelRooms,
  roomStyleToDisplay,
  selectedRooms,
  setSelectedRooms,
  newlySelectedRooms,
  setNewlySelectedRooms, 
  ref2
}) => {
  const runOnce = useRef(false);
  // const [newlySelectedRooms, setNewlySelectedRooms] = useState([]);
  // const [loading, setLoading] = useState();
  const [hotelRoomsArray, setHotelRoomsArray] = useState([]);
  const axiosWithInterceptors = useAxiosInterceptors();
  const { date } = useSearchContext();
  //   const { data, error } = useAxios(`/hotels/room/${hotel_id}`);
  // console.log(data.data)
  //   const hotelRoomsArray = data.data;

  // useEffect(() => {
  //   if (runOnce.current === false) {
  //       const loadPage = async () => {
  //           try {
  //               setLoading(true);
  //               const resp = await axiosWithInterceptors.get(`/hotels/room/${hotel_id}`)
  //               setHotelRoomsArray([...resp.data.data])
  //               setLoading(false)

  //           } catch (err) {
  //               console.log(err)
  //           }
  //       }

  //       loadPage()
  //   }

  //   return () => {
  //       runOnce.current = true
  //     }

  // }, [])

  // get the check-in and check-out dates
  let checkinDate = new Date(format(date[0].startDate, "yyyy/MM/dd"));
  let checkoutDate = new Date(format(date[0].endDate, "yyyy/MM/dd"));

  // check if the check-in date and the check-out date are the same
  // by comparing the year, month and day
  if (
    checkinDate.getFullYear() === checkoutDate.getFullYear() &&
    checkinDate.getMonth() === checkoutDate.getMonth() &&
    checkinDate.getDate() === checkoutDate.getDate()
  ) {
    // add a day to the check-in date
    checkoutDate.setDate(checkinDate.getDate() + 1);
  }

  console.log("checkinDate: ", checkinDate);
  console.log("checkoutDate: ", checkoutDate);

  //   console.log("roomsArray", hotelRoomsArray);

  const updateNewlySelectedRooms = (e) => {
    console.log("e.target: ", e.target);
    if (e.target.checked) {
      // add the selected room id to the selected rooms array
      setNewlySelectedRooms([...newlySelectedRooms, e.target.value]);
    } else {
      // filter out the unchecked room id from the selected rooms array
      const filteredArray = newlySelectedRooms.filter(
        (room) => room !== e.target.value
      );
      setNewlySelectedRooms([...filteredArray]);
    }
  };

  // console.log(selectedRooms)

  // function to get an array of all the intended reservation dates
  const reservationDates = (firstDay, lastDay) => {
    let startDate = new Date(firstDay);
    let lastDate = new Date(lastDay);
    // check if the check-in date and the check-out date are the same
    // by comparing the year, month and day
    if (
      startDate.getFullYear() === lastDate.getFullYear() &&
      startDate.getMonth() === lastDate.getMonth() &&
      startDate.getDate() === lastDate.getDate()
    ) {
      // add a day to the check-in date
      lastDate.setDate(startDate.getDate() + 1);
    }

    let reservationDays = [];

    while (startDate < lastDate) {
      reservationDays.push(new Date(startDate));
      // increase the day by 1
      startDate.setDate(startDate.getDate() + 1);
    }

    return reservationDays;
  };

  // get all reservation dates
  // reservedDates = reservationDates(checkinDate, checkoutDate);
  ref2.current = reservationDates(checkinDate, checkoutDate);
  // console.log("reservedDates: ", reservedDates);
  console.log("ref2.current: ", ref2.current);

  // function to determine if the intended reservation dates are available for the particular room number
  const checkRoomAvailability = (roomNumber) => {
    // console.log(roomNumber.unavailableDates)
    const dateArray = roomNumber.unavailableDates.map((date) =>
      new Date(date).getTime()
    );
    return (ref2.current).some((rDate) =>
      dateArray.includes(new Date(rDate).getTime())
    );
  };

  // const reserveRooms = async () => {
  //   try {
  //     console.log("selectedRooms:", selectedRooms);
  //     setSelectedRooms((prev) => {
  //       let arr = [];
  //       arr = prev.concat(newlySelectedRooms);
  //       return [...arr];
  //     });

  //     // send data to process payment
  //     const resp = await axiosWithInterceptors.post(
  //       "/stripe/create-checkout-session",
  //       { selectedRooms, reservedDates, hotel_id }
  //     );
  //     // const resp = await axios.post('/stripe/create-checkout-session', {selectedRooms, reservedDates})
  //     window.location.href = resp.data.url;

  //     // const promiseArray = selectedRooms.map(room => {
  //     //     return axios.patch(`/rooms/availability/${room}`, { reservedDates }, { withCredentials: true })
  //     // })
  //     // const resArray = await Promise.all(promiseArray)
  //     // // console.log(resArray)

  //     setOpenHotelRooms(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const closeModal = () => {
    setNewlySelectedRooms([]);
    setOpenHotelRooms(false);
  };

  const addNewlySelectedRooms = () => {
    if (selectedRooms.length > 0) {
      setSelectedRooms((prev) => {
        newlySelectedRooms.forEach((data) => {
          if (!prev.includes(data)) {
            prev.push(data);
          }
        });
        return [...prev];
      });
    } else {
      setSelectedRooms([...newlySelectedRooms])
    }
    
    setOpenHotelRooms(false);
  };

  return (
  
        <div className="reserveRoom">
          <div className="reserveRoomCont">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="reserveRoomClose"
              onClick={() => closeModal()}
            />
            <h3 className="reserveRoomTitle">Select Room(s)</h3>
            <h4>Check-in date: {format(checkinDate, "MMM/dd/yyyy")}</h4>
            <h4>Check-out date: {format(checkoutDate, "MMM/dd/yyyy")}</h4>
            <br />

            <div className="reserveRoomMap">
              {/* {hotelRoomsArray?.map((hotelRoom) => {
                return ( */}
              <div className="roomCont">
                <div className="roomInfo">
                  <h4 className="ReserveRoom_RoomStyleTitle">{roomStyleToDisplay?.title}</h4>
                  <p>{roomStyleToDisplay?.description}</p>
                  <p>Max people: {roomStyleToDisplay?.maxPeople}</p>
                  <p>Price: {roomStyleToDisplay?.price}</p>
                </div>
                <div className="roomNumbers">
                  {roomStyleToDisplay?.roomNumbers?.map((roomNumber) => {
                    return (
                      <div className="room" key={roomNumber?._id}>
                        <label>{roomNumber?.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber?._id}
                          onChange={updateNewlySelectedRooms}
                          disabled={checkRoomAvailability(roomNumber)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* );
              })} */}
            </div>
            {/* <button
              onClick={reserveRooms}
              disabled={
                selectedRooms.length === 0 && newlySelectedRooms.length === 0
              }
            >
              Reserve room(s)
            </button> */}
            <button onClick={() => addNewlySelectedRooms()}>
              Continue
            </button>
            <button onClick={() => closeModal()}>Cancel</button>
          </div>
        </div>
  )
};

export default ReserveRoom;
