import { createContext, useContext, useState } from "react";
// import { useLocation } from "react-router-dom";

const SearchContext = createContext()

export const useSearchContext = () => {
    return useContext(SearchContext)
}

export const SearchContextProvider = ({ children }) => {
    // const location = useLocation()
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const [checkinDateValue, setCheckinDateValue] = useState(new Date())
    const [checkoutDateValue, setCheckoutDateValue] = useState(new Date())
    const [destination, setDestination] = useState('Houston')
    const [roomOptions, setRoomOptions] = useState({
        adults: 1,
        children: 0,
        rooms: 1
    })

    const [cart, setCart] = useState([])

    const validateCheckoutDateValue = (date) => {
        if (checkinDateValue.getTime() > date.getTime()) {
          setCheckoutDateValue(checkinDateValue)
        } else {
          setCheckoutDateValue(date)
        }
      }
    
      const validateCheckinDateValue = (date) => {
        if (date.getTime() > checkoutDateValue.getTime()) {
          setCheckinDateValue(checkoutDateValue)
        } else {
          setCheckinDateValue(date)
        }
      }

    return <SearchContext.Provider value={{ date, setDate, destination, setDestination, roomOptions, setRoomOptions, cart, setCart, checkinDateValue, setCheckinDateValue, checkoutDateValue, setCheckoutDateValue, validateCheckoutDateValue, validateCheckinDateValue }}>
        {children}
    </SearchContext.Provider>
}