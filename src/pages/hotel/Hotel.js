import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Subscription from "../../components/subscription/Subscription";
import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// import useAxios from '../../hooks/useAxios'
import { useSearchContext } from "../../context/searchContext";
import { useAuthContext } from "../../context/authContext";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import ReserveRoom from "../../components/reserveRoom/ReserveRoom";
import { baseURL } from "../../context/authContext";
import {RotatingLines} from 'react-loader-spinner'

const Hotel = () => {
  const pictureAddress = baseURL + "roomsPictures/"
  const ref2 = useRef([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [slides, setSlides] = useState([]);
  const [openSlider, setOpenSlider] = useState(false);
  const [openHotelRooms, setOpenHotelRooms] = useState(false);
  const [hotelInfo, setHotelInfo] = useState();
  const [roomInfo, setRoomInfo] = useState();
  const [roomStyleToDisplay, setRoomStyleToDisplay] = useState();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [newlySelectedRooms, setNewlySelectedRooms] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { hotel_id } = useParams();
  const navigate = useNavigate();
  const { date, roomOptions } = useSearchContext();
  const { auth } = useAuthContext();
  const axiosWithInterceptors = useAxiosInterceptors();

  console.log("selectedRooms: ", selectedRooms);
  // console.log(roomOptions)

  useEffect(() => {
    let isMounted = true;
    const hotelData = async () => {
      try {
        setLoading(true);
        const res = await axiosWithInterceptors.get(baseURL + `api/v1/hotels/${hotel_id}`);
        // console.log('res.data.data: ', res.data.data)
        setHotelInfo({ ...res.data.data });

        const res2 = await axiosWithInterceptors.get(
          baseURL + `api/v1/hotels/room/${hotel_id}`
        );

        setRoomInfo([...res2.data.data]);
        const roomStyleArr = res2.data.data

          let arr = []
          roomStyleArr.forEach(roomStyle => {
            let Obj = {}
            Obj.length = roomStyle.photos.length
            if (roomStyle.photos.length) {
              Obj.slideNumber = 0
            }
            arr.push(Obj)
            
          })

          setSlides([...arr])

        isMounted && setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    hotelData();

    return () => {
      isMounted = false;
    };
  }, [hotel_id, axiosWithInterceptors]);


  const handleSlider = (ind) => {
    setOpenSlider(true);
    setSlideNumber(ind);
  };

  const changeSlide = (direction, index) => {
    const newArr = slides.map((slide, ind) => {
      if (ind === index) {
        if (direction === "right") {
          if (slide.slideNumber === slide.length - 1) {
            return {...slide, slideNumber: 0}
          } else {
            return {...slide, slideNumber: slide.slideNumber + 1}
          }
        } else {
          if (slide.slideNumber === 0) {
            return {...slide, slideNumber: slide.length - 1}
          } else {
            return {...slide, slideNumber: slide.slideNumber - 1}
          }
        }
      } else {
        return slide
      }
    })

    setSlides([...newArr])

  };


  const selectRoomStyle = (roomStyle) => {
    setRoomStyleToDisplay({ ...roomStyle });
    if (auth.accessToken) {
      setOpenHotelRooms(true);
    } else {
      navigate("/login");
    }
  };

  // let reservedDates;
  // console.log('reservedDates: ', reservedDates)

  const reserveRooms = async () => {
    try {
      console.log("selectedRooms:", selectedRooms);
      if (selectedRooms.length > 0) {
        setSelectedRooms((prev) => {
          newlySelectedRooms.forEach((data) => {
            if (!prev.includes(data)) {
              prev.push(data);
            }
          });

          return [...prev];
        });
      } else {
        setSelectedRooms([...newlySelectedRooms]);
      }

      // send data to process payment
      const resp = await axiosWithInterceptors.post(
        baseURL + "api/v1/stripe/create-checkout-session",
        { selectedRooms, reservedDates: ref2.current, hotel_id }
      );
      // const resp = await axiosWithInterceptors.post(
      //   "/stripe/create-checkout-session",
      //   { selectedRooms, reservedDates, hotel_id }
      // );
      // const resp = await axios.post('/stripe/create-checkout-session', {selectedRooms, reservedDates})
      window.location.href = resp.data.url;

      // const promiseArray = selectedRooms.map(room => {
      //     return axios.patch(`/rooms/availability/${room}`, { reservedDates }, { withCredentials: true })
      // })
      // const resArray = await Promise.all(promiseArray)
      // // console.log(resArray)

      // setOpenHotelRooms(false);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelSelections = () => {
    setSelectedRooms([]);
    setNewlySelectedRooms([]);
  };

  return (
    <div className="hotelMainContainer">
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
          <>
            <div className="hotelRoomContainer">
              {/* {openSlider && (
                <div className="hotelSlider">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpenSlider(false)}
                  />
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="arrow"
                    // onClick={() => changeSlide("left")}
                  />
                  <div>
                    <div className="sliderImgWrapper">
                      <img
                        src={`/pictures/hotels/${pictures[slideNumber]}`}
                        alt={`${slideNumber}`}
                      />
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="arrow"
                    // onClick={() => changeSlide("right")}
                  />
                </div>
              )} */}

              <div className="hotelRoomWrapper">
                <div className="hotelInfo">
                  <div className="hotelInfoForRooms">
                    <h3 className="Hotel_Hotel_Name">{hotelInfo.name}</h3>
                    <p className="Hotel_Hotel_Address">{hotelInfo.hotelLocation.address}</p>
                    {hotelInfo.distanceToClosestTouristLocation &&
                      hotelInfo.closestTouristLocation && (
                        <h4>
                          Excellent location -{" "}
                          {hotelInfo.distanceToClosestTouristLocation} miles
                          from {hotelInfo.closestTouristLocation}
                        </h4>
                      )}
                    <h5>
                      Book a stay for as low as ${hotelInfo.cheapestPrice} per
                      night
                    </h5>
                  </div>
                  <button
                    onClick={reserveRooms}
                    disabled={
                      selectedRooms.length === 0 &&
                      newlySelectedRooms.length === 0
                    }
                    style={{ marginLeft: "5px" }}
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => cancelSelections()}
                    disabled={selectedRooms.length === 0}
                    style={{ marginLeft: "5px" }}
                  >
                    Cancel selections
                  </button>
                </div>

                {roomInfo?.map((roomStyle, index) => (
                  <>
                    <div
                      key={index}
                      className="hotelRoomDetailsContainer"
                    >
                      <div className="hotelRoomPicturesWrap">
                        <img                        
                          src={roomStyle.photos[slides[index].slideNumber]}
                          alt=""
                          width="200"
                          height="220"
                        />
                        {roomStyle.photos.length && (
                          <>
                            <FontAwesomeIcon
                              icon={faArrowLeft}
                              className="arrow"
                              onClick={() =>
                                changeSlide("left", index)
                              }
                            />
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="arrow"
                              onClick={() =>
                                changeSlide("right", index)
                              }
                            />
                          </>
                        )}
                      </div>
                      <div>
                        <div>
                          <h3 className="Hotel_RoomStyle">{roomStyle.title}</h3>
                          <p>Max occupancy: {roomStyle.maxPeople}</p>
                          <p>Non-smoking</p>
                          <p>Pillow top mattress</p>
                          <p>56 in. Television </p>
                        </div>
                        <div>
                          <p>High speed internet access</p>
                          <p>Refrigerator and microwave</p>
                          <p>Complementary breakfast</p>
                          <button onClick={() => selectRoomStyle(roomStyle)}>
                            Select
                          </button>
                          <span>$ {roomStyle.price}</span>
                        </div>
                      </div>
                    </div>
                    {/* <hr /> */}
                  </>
                ))}

                {/* <div className="hotelRoomPictures">
                  {pictures.map((picture, key) => {
                    return (
                      <div className="hotelRoomPicturesWrap" key={key}>
                        <img
                          src={`/pictures/hotels/${picture}`}
                          onClick={() => handleSlider(key)}
                          alt=""
                          width="200"
                          height="200"
                        />
                      </div>
                    );
                  })}
                </div> */}
                <div className="hotelDecs">
                  <div className="hotelDecs1">
                    <h3>{hotelInfo.description}</h3>
                    <p>
                      A 10-minute walk from Houston Zoo, Locale Medical Center -
                      Houston features sustainable 4-star accommodations in the
                      Medical Center district of Houston. Complimentary Wifi is
                      available throughout the property and private parking is
                      available on site. This 4-star condo hotel offers private
                      entrance. The units come with parquet floors and feature a
                      fully equipped kitchen with a dishwasher, a dining area, a
                      flat-screen TV, and a private bathroom with walk-in shower
                      and a hair dryer. An oven, a microwave, and toaster are
                      also offered, as well as a coffee machine and a kettle. At
                      the condo hotel, every unit comes with bed linen and
                      towels.
                    </p>
                  </div>
                  <div className="hotelDecs2">
                    <h4>Will exceed your expectations</h4>
                    <button
                      onClick={reserveRooms}
                      disabled={
                        selectedRooms.length === 0 &&
                        newlySelectedRooms.length === 0
                      }
                      style={{ marginLeft: "5px" }}
                    >
                      Book now
                    </button>
                    <button
                      onClick={() => cancelSelections()}
                      disabled={selectedRooms.length === 0}
                      style={{ marginLeft: "5px" }}
                    >
                      Cancel selections
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {openHotelRooms && (
              <ReserveRoom
                setOpenHotelRooms={setOpenHotelRooms}
                roomStyleToDisplay={roomStyleToDisplay}
                selectedRooms={selectedRooms}
                setSelectedRooms={setSelectedRooms}
                newlySelectedRooms={newlySelectedRooms}
                setNewlySelectedRooms={setNewlySelectedRooms}
                ref2={ref2}
              />
            )}
            <Subscription />
            {/* <Footer /> */}
          </>
        )}
      </>
    </div>
  );
};

export default Hotel;
