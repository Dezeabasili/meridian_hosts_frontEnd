import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const FindReview = () => {
  const [review_id, setReview_id] = useState();
  const [email, setEmail] = useState();

  const axiosWithInterceptors = useAxiosInterceptors();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosWithInterceptors.get(
        baseURL + `api/v1/reviews?review_id=${review_id}`
      );
      console.log(resp.data.data);
      navigate("/reviews", { state: resp.data.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="register">
      <form className="registerContainer" onSubmit={handleSubmit}>
        <h3 className="registerTitle">
          Provide the review id
        </h3>

        <div className="registerDiv">
          <label htmlFor="review_id">Review Id:</label>
          <input
            id="review_id"
            type="text"
            value={review_id}
            onChange={(e) => setReview_id(e.target.value)}
            autoComplete="off"
          />
        </div>
        {/* <div className="registerDiv">
          <label htmlFor="email">Customer email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div> */}

        <button className="signUpButton" disabled={!review_id }>
          Continue
        </button>
      </form>
    </div>
  );
};

export default FindReview;
