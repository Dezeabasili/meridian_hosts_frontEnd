import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const FindBooking = () => {
  const [email, setEmail] = useState();
  const [bookingRef, setBookingRef] = useState();
  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation()
  const pathname = location.pathname

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.post(
        baseURL + "api/v1/bookings/findbooking",
        { booking_id: bookingRef, email }
      );
      console.log(resp.data.data);
      const bookingsToDisplay = [...resp.data.data]
      navigate("/bookings", { state: {pathname, bookingsToDisplay} });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">
          Provide your booking reference or email address
        </h3>

        <div className="registerDiv">
          <label htmlFor="bookingRef">Booking reference:</label>
          <input
            id="bookingRef"
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="emailAddress">Customer's registered email address:</label>
          <input
            id="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button className="signUpButton" disabled={!bookingRef && !email}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default FindBooking;
