import "./searchForFriends.css"
import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import {RotatingLines} from 'react-loader-spinner'

const SearchForFriends = () => {
    const [users, setUsers] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosWithInterceptors = useAxiosInterceptors();

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
            const res = await axiosWithInterceptors.get("/users")
            console.log("users: ", res.data);
            setUsers(res.data.data)
            setSearchResult(res.data.data)
            setLoading(false);

            } catch (err) {
                if (err.response.data.message) {
                    navigate('/handleerror', {state: {message: err.response.data.message, path: location.pathname}})
                  } else {
                    navigate('/somethingwentwrong')
                  }
            }
        }

        getUsers()
        
    }, [])

    const handleSearch = (e) => {
        // setSearchResult(users.filter(user => (user.name.toLowerCase()).includes((e.target.value).toLowerCase())))
        setSearchResult(prev => {
            if (e.target.value) return users.filter(user => (user.name.toLowerCase()).includes((e.target.value).toLowerCase()))
            // return []
        return users
            
        })
    }


  return (
    <div className="searchForFriends">
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
        <input 
            type="text"
            onChange={handleSearch}
        />
          {searchResult.length > 0 ? (
            <>
              {searchResult?.map((user) => (
                <div key={user._id}>                
                  <p style={{"textTransform": "capitalize"}}>{user.name}</p>                
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No user matches your search !!!</p>
          )}
        </>
      )}
    </div>
  )
}

export default SearchForFriends