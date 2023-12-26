import "./navbar.css";
import './../menu/menu.css'
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import useWindowSize from "../../hooks/useWindowSize";
import Menu_Admin_Structure from "../menu/Menu_Admin_Structure";
import Menu_RegisteredUser from "../menu/Menu_RegisteredUser";
import Menu_Admin from "../menu/Menu_Admin";
import Menu_Guest from "../menu/Menu_Guest";
import Menu_RegisteredUser_Structure from "../menu/Menu_RegisteredUser_Structure";
import Menu_Guest_Structure from "../menu/Menu_Guest_Structure";

const Navbar = () => {
  const { auth } = useAuthContext();
  const screenSize = useWindowSize();

  const menuSelector = () => {
    if (auth.assignedRoles == 2010) {
      return (
        
          <Menu_RegisteredUser_Structure />
       
      );
    } else if (auth.assignedRoles == 2030) {
      return (
        
          <Menu_Admin_Structure />
       
      );
    } else {
      return (
       
          <Menu_Guest_Structure />
       
      );
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo nowrap">Meridian Hosts</span>
        </Link>
        <div className="navContainerimgDiv">
          <img
            src="/pictures/free-american-flag.jpg"
            alt="American Flag"
            width="50"
            height="50"
          />
        </div>

        <div className="menu-bar">
          <ul>
            {/* <li className='navSpan navSpan1'><Link to={'/just'}>USD</Link></li> */}
            {/* <li className='navButton navButton1'><img src='../pictures/free-american-flag.jpg' alt='' width="20" height="20" /></li> */}
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/login"}>Sign in</Link>
              <div className="sub-menu-1">
                <ul>
                  <li>
                    <Link to={"/register"}>Sign up</Link>
                  </li>
                  <li>
                    <Link to={"/logout"}>Log out</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#">About Us</a>
              <div className="sub-menu-1">
                <ul>
                  <li>
                    <a href="#">Mission</a>
                  </li>
                  <li>
                    <a href="#">Vision</a>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                  <li>
                    <a href="#">Contact us</a>
                  </li>
                </ul>
              </div>
            </li>
            {auth.accessToken && (
              <li>
                <Link to={"/users/myaccount"}>My account</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="navbarMainMenu">
        <ul>
          <li>
            <p>Menu</p>
            <div className="navbarMainMenuList">
              {screenSize.width <= 570 && (
                <>
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>Sign in</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"}>Sign up</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/logout"}>Log out</NavLink>
                  </li>
                  {auth.accessToken && (
                    <li>
                      <NavLink to={"/users/myaccount"}>My account</NavLink>
                    </li>
                  )}
                </ul>
                <br />
                </>
              )}
              {/* <br /> */}
              {menuSelector()}
              
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
