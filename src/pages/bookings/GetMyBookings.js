import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import "./getAllBookings.css";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { useAuthContext, baseURL } from "../../context/authContext";
import {RotatingLines} from 'react-loader-spinner'

const GetMyBookings = () => {
  const runOnce = useRef(false)
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();
  const pathname = location.pathname

  // console.log('location: ', location)

  useEffect(() => {
    if (runOnce.current === false) {
      const bookings = async () => {
        setLoading(true);
        try {
          if (location.state) {
            console.log('location.state: ', location.state)
              setBookingsList([...location.state.bookingsToDisplay]);
          
          } else {
            const resp = await axiosWithInterceptors.get(baseURL + "api/v1/bookings/mybookings");
            // console.log("my bookings: ", resp.data.data);
            setBookingsList([...resp.data.data]);
          }
          
          setLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };
  
      bookings();
    }

    return () => {
      runOnce.current = true
    }

  }, []);

  const showSelectedBooking = (booking_id) => {
    const bookingToDisplay = bookingsList.find(
      (booking) => booking_id === booking._id
    );
    navigate(`/bookings/${booking_id}`, { state: {pathname, bookingToDisplay} });
  };

  return (
    <div>
      {loading ? (
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
      ) : (
        <>
          {bookingsList.length > 0 ? (
            <>
              {bookingsList?.map((booking) => (
                <div key={booking._id}>
                  <p>Booking reference: {booking._id}</p>
                  <p>Customer name: <span style={{"textTransform": "capitalize"}}>{booking.user.name}</span></p>          
                  <p>Hotel name: <span style={{"textTransform": "capitalize"}}>{booking.hotel.name}</span></p>
                  <p>Booking date: {format(new Date(booking.createdAt), "MMM/dd/yyyy,  hh-mm-ss bbb")}</p>
                  <button onClick={() => showSelectedBooking(booking._id)} style={{marginTop: '5px'}}>
                    Show booking details
                  </button>
                  <br />
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>This customer has no booking in the database !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default GetMyBookings;

