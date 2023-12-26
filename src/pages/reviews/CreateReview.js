import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const CreateReview = () => {
  const [hotel, setHotel] = useState();
  const [bookingRef, setBookingRef] = useState();
  const [rating, setRating] = useState();
  const [review, setReview] = useState();

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const resp = await axiosWithInterceptors.post("/reviews", {
        hotel,
        bookingRef,
        rating,
        review
      });
      console.log(resp.data.data);
      navigate("/reviews");
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
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="hotelRef">Booking reference:</label>
          <input
            id="hotelRef"
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="registerDiv">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            onChange={(e) => setReview(e.target.value)}
            autoComplete="off"
            rows="5"
            cols="30"
          >
            {review}
          </textarea>
        </div>
        <div className="registerDiv">
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button
          className="signUpButton"
          disabled={
            !hotel ||
            !review ||
            !rating ||
            !bookingRef 
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
