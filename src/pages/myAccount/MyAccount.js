import "./myAccount.css";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseURL } from "../../context/authContext";
import {RotatingLines} from 'react-loader-spinner'

const MyAccount = () => {
  const pictureAddress = baseURL + "profilePic/";
  const effectRan = useRef(false);
  const runOnce = useRef(false)
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { setAuth, updatedProfilePhoto } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.pathname;

  const axiosWithInterceptors = useAxiosInterceptors();

  // Code will be modified to upload image to Cloudinary.
  // This will not be limited to this file, but to other files where the user uploads images
  useEffect(() => {
    if (runOnce.current === false) {
      const loadUser = async () => {
        try {
          setLoading(true);
          const resp = await axiosWithInterceptors.get(baseURL + "api/v1/users/myaccount", {
            withCredentials: true,
          });
          setUserInfo({...resp.data.data});
          if (resp.data.data.photo == 'default_profile_pic.png') {
            setUserPhoto(`${pictureAddress}default_profile_pic.png`)
          } else {
            setUserPhoto(resp.data.data.photo)
          }

          setLoading(false);
        } catch (err) {
          console.log(err);
        }
        // try {
        //   const myPhoto = await axiosWithInterceptors.get(
        //     baseURL + "api/v1/users/myaccount/myphoto",
        //     { responseType: "blob" }
        //   );
        //   // console.log(resp.data.data)
         
        //   effectRan.current = URL.createObjectURL(myPhoto.data);
        //   // setUserPhoto(myPhoto)
        //   // console.log(myPhoto)
        //   setLoading(false);
        // } catch (err) {
        //   console.log(err);
        // }
      };
  
      loadUser();

    }
    

    return () => {
      // effectRan.current = true
      // URL.revokeObjectURL(effectRan.current);
      runOnce.current = true
    };
  }, []);

  const choosePhoto = () => {
    // Specify the types of files, the size limit in MB, and whether its a single or multiple files
    const fileOptions = {
      types: [".jpg", "jpeg", ".png", ".JPG"],
      sizeLimit: 5,
      number: "single",
      code: 'profilephoto',
      previousPage,
    };
    navigate("/uploadfiles", { state: fileOptions });
  };

  const deleteAccount = async () => {
    await axiosWithInterceptors.delete(baseURL + "api/v1/users/deletemyaccount");
    await axios.get(baseURL + "api/v1/auth/logout", { withCredentials: true });
    setAuth({});
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
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
        <div className="myProfileContainer">
          <h3>My account details</h3>
          <span>name: </span>
          <span className="MyAccount_Name">{userInfo.name}</span>
          <br />
          <span>username: </span>
          <span>{userInfo.username}</span>
          <br />
          <span>email: </span>
          <span>{userInfo.email}</span>
          <br />
          <div className="profilePhotoDiv">
          <img
            className="img"
            // src={effectRan.current}
            src={userPhoto}
            alt="Profile"
            width={50}
            height={50}
          />
          </div>
          
          <button onClick={choosePhoto}>Edit profile photo</button>

          <br />
          

          <Link to={"/changepassword"}>
            <button>Change password</button>
          </Link>
          <br />
          

          <Link to={"/updatemyaccount"}>
            <button>Update my details</button>
          </Link>
          <br />
          

          <button onClick={() => setOpenModal(true)}>Delete my account</button>

          {openModal && (
            <>
              <div className="deleteModalContainer">
                <div className="deleteModalChoice">
                  <h2>Is there anything we can do to keep you?</h2>
                  <br />
                  <p>
                    If there is anything we can do to keep you, please contact
                    us by email or phone
                  </p>
                  <br />
                  <div>
                    <button onClick={deleteAccount}>Delete account</button>
                    <button onClick={() => setOpenModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyAccount;
