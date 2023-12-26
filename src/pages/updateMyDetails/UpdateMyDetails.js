import './updateMyDetails.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAxiosInterceptors from '../../hooks/useAxiosWithInterceptors'

const username_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{5,20}$/

const UpdateMyDetails = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState()
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const axiosWithInterceptors = useAxiosInterceptors()

    useEffect(() => {
        setValidUsername(username_REGEX.test(username))
    }, [username])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosWithInterceptors.patch('/users/updatemyaccount', { name, username, email })

            // console.log(response.data)
            setName('')
            setUsername('')
            setEmail('')

            navigate('/login')

        } catch (err) {
            if (!err?.response)
                console.log('no server response')
            else console.log(err)
        }

    }
    return (
        <div className='register'>
            <form className='registerContainer' onSubmit={handleSubmit}>
                <h1 className='registerTitle'>Update my details</h1>
                <div className='registerDiv'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='email'>e-mail:</label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='off'
                    />
                </div>

                {
                username
                ? <button className='signUpButton' disabled={!validUsername} >Continue</button>
                : <button className='signUpButton' disabled={!name && !email} >Continue</button>
                }
                
                
            </form>
        </div>
    )
}

export default UpdateMyDetails