import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const SearchReviewsResults = () => {
  const location = useLocation();
  const reviewsList = [...location.state?.reviewsToDisplay];

  return (
    <div>
          {reviewsList.length > 0 ? (
            <>
              {reviewsList?.map((review) => (
                <div key={review._id}>
                  <p>Review Id: {review._id}</p>
                  <p>
                    Hotel name:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {review.hotel.name}
                    </span>
                  </p>
                  <p>
                    Customer name:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {review.customer.name}
                    </span>
                  </p>
                  <p>
                    Review date:{" "}
                    {format(
                      new Date(review.createdAt),
                      "MMM/dd/yyyy,  hh:mm:ss bbb"
                    )}
                  </p>
                  <p>Review: {review.review}</p>
                  <p>Rating: {review.rating}</p>
                  <br />
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No review in the database !!!</p>
          )}
    </div>
  );
};

export default SearchReviewsResults;
