import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosInterceptors from '../../hooks/useAxiosWithInterceptors'
import { baseURL } from "../../context/authContext";

const UpdateUser = () => {
    const [roles, setRoles] = useState('')
    const [active, setActive] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const axiosWithInterceptors = useAxiosInterceptors()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let resp = await axiosWithInterceptors.patch(baseURL + 'api/v1/users/updateuser', { roles, active, email })

           
            if (resp.data.data.matchedCount === 1) {
                 resp = await axiosWithInterceptors.post(baseURL + "api/v1/users/finduser", {
                    email,
                  });
            }
            

            console.log('Updated User:', resp.data.data)
            setRoles('')
            setActive('')
            setEmail('')

            navigate("/users/getuser", { state: resp.data.data });

        } catch (err) {
            if (!err?.response)
                console.log('no server response')
            else console.log(err)
        }

    }
    return (
        <div className='register'>
            <form className='registerContainer' onSubmit={handleSubmit}>
                <h1 className='registerTitle'>Update user details</h1>
                <div className='registerDiv'>
                    <label htmlFor='email'>User e-mail:</label>
                    <input
                        id='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='role'>User role:</label>
                    <input
                        id='role'
                        type='text'
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                        autoComplete='off'
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='active'>Set user to active?:</label>
                    <input
                        id='active'
                        type='text'
                        value={active}
                        onChange={(e) => setActive(e.target.value)}
                        autoComplete='off'
                        placeholder='Yes or No'
                    />
                </div>

             <button className='signUpButton' disabled={!email} >Continue</button>
               
            </form>
        </div>
    )
}

export default UpdateUser