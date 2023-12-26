import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const GetBooking = () => {
  const location = useLocation();
  const bookingToDisplay = location?.state?.bookingToDisplay;
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const pathname = location.pathname

  const deleteThisBooking = async () => {
    try {
      await axiosWithInterceptors.delete(`/bookings/${bookingToDisplay._id}`);
      if (location.state.pathname === '/bookings') {
        navigate("/bookings");
      } else if (location.state.pathname === '/mybookings') {
        navigate("/mybookings");
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>Booking reference: {bookingToDisplay._id}</p>
      <p>Customer name: <span style={{"text-transform": "capitalize"}}>{bookingToDisplay.user.name}</span></p>
      <p>Hotel name: <span style={{"text-transform": "capitalize"}}>{bookingToDisplay.hotel.name}</span></p>
      <p>Booking date: {format(new Date(bookingToDisplay.createdAt), "MMM/dd/yyyy,  hh:mm:ss bbb")}</p>
      {bookingToDisplay.bookingDetails.map((roomDetails) => (
        <div key={roomDetails.room_id}>
          <br />
          <p>Room type: <span style={{"text-transform": "capitalize"}}>{roomDetails.room_type}</span></p>
          <p>Price per night: ${roomDetails.price_per_night}</p>
          <p>Room number: {roomDetails.roomNumber}</p>
          <p>Check-in date: {format(new Date(roomDetails.checkin_date), "MMM/dd/yyyy")}</p>
          <p>Check-out date: {format(new Date(roomDetails.checkout_date), "MMM/dd/yyyy")}</p>
          <p>Number of nights: {roomDetails.number_of_nights}</p>
        </div>
      ))}
      <br />
      <button
        onClick={() => {
          deleteThisBooking();
        }}
      >
        Cancel this booking
      </button>
    </div>
  );
};

export default GetBooking;
