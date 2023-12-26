import { NavLink } from "react-router-dom";

const Menu_RegisteredUser_Structure = () => {
  return (
    <ul>
      
      <li>
        <p><strong>Bookings</strong></p>
      </li>
      <li>
        <NavLink end to={"/mybookings"}>
          Get all my bookings
        </NavLink>
      </li>

      {/* <li>
          <NavLink to={"/bookings/findbooking"}>
            Find a customer's booking
          </NavLink>
        </li> */}
      <br />

      <li>
        <p><strong>Hotels</strong></p>
      </li>
      {/* <li>
          <NavLink to={"/createhotel"}>Create a hotel</NavLink>
        </li> */}
      <li>
        <NavLink end to={"/hotels"}>
          Get all hotels
        </NavLink>
      </li>
      <li>
        <NavLink to={"/hotels/findhotel"}>Find a hotel</NavLink>
      </li>
      {/* <li>
          <NavLink to={"/uploadfiles"}>Upload hotel photos</NavLink>
        </li> */}
      <li>
        <NavLink to={"/hotels/countbycity"}>Count hotels by city</NavLink>
      </li>
      <li>
        <NavLink to={"/hotels/countbytype"}>Count hotels by type</NavLink>
      </li>
      <br />

      <li>
        <p><strong>Reviews</strong></p>
      </li>
      <li>
        <NavLink to={"/createreview"}>Write a review</NavLink>
      </li>
      <li>
        <NavLink to={"/myreviews"}>Get all my reviews</NavLink>
      </li>
      <li>
        <NavLink end to={"/reviews"}>
          Get all reviews
        </NavLink>
      </li>
      {/* <li>
          <NavLink to={"/reviews/findreview"}>Find a review</NavLink>
        </li> */}
      <br />

      <li>
        <p><strong>Rooms</strong></p>
      </li>
      {/* <li>
          <NavLink to={"/createroom"}>Create a room</NavLink>
        </li> */}
      <li>
        <NavLink end to={"/rooms"}>
          Get all rooms
        </NavLink>
      </li>
      {/* <li>
          <NavLink to={"/uploadfiles"}>Upload room photos</NavLink>
        </li> */}
      {/* <br /> */}

      {/* <li>
          <p>Users</p>
        </li> */}
      {/* <li>
          <NavLink to={"/register"}>Create a user</NavLink>
        </li> */}
      {/* <li>
          <NavLink end to={"/users"}>
            Get all users
          </NavLink>
        </li> */}
      {/* <li>
          <NavLink to={"/users/finduser"}>Find a user</NavLink>
        </li> */}
      {/* <li>
          <NavLink to={"/users/updateuser"}>Update a user</NavLink>
        </li> */}
    </ul>
  );
};

export default Menu_RegisteredUser_Structure;
