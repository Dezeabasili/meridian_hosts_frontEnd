import "./login.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { baseURL } from "../../context/authContext";

const Login = () => {
  const location = useLocation();
  // console.log(location.state)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth, trustThisDevice, setTrustThisDevice } = useAuthContext();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        baseURL + "api/v1/auth/login",
        { username, password },
        { withCredentials: true }
      );

      // console.log(response)
      const accessToken = response.data.accessToken;
      const assignedRoles = response.data.assignedRoles;
      setAuth({ username, password, accessToken, assignedRoles });
      setUsername("");
      setPassword("");
      localStorage.setItem("trustThisDevice", JSON.stringify(trustThisDevice));
      navigate(location?.state || "/");
    } catch (err) {
        navigate('/handleerror', {state: err.response.data.message})
    }
  };

  // useEffect(() => {
  //     localStorage.setItem('trustThisDevice', JSON.stringify(trustThisDevice))
  // }, [trustThisDevice])

  const handleTrustThisDevice = (e) => {
    setTrustThisDevice(e.target.checked);
  };
  return (
    <div className="login">
      <form className="loginContainer" onSubmit={handleSubmit}>
        <h1 className="loginTitle">Sign In</h1>
        <div className="loginDiv">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="loginDiv">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Link to={"/forgotpassword"}>
          <p>Forgot your password?</p>
        </Link>

        <br />

        <button className="loginButton">Sign In</button>
        <div>
          <label style={{ marginRight: "10px" }}>Trust this device</label>
          <input
            type="checkbox"
            onChange={handleTrustThisDevice}
            checked={trustThisDevice}
          />
        </div>
        <br />

        <p>Need an Account?</p>
        <Link to={"/register"}>
          <p>
            <strong>Sign Up</strong>
          </p>
        </Link>
      </form>
   
    </div>
  );
};

export default Login;
