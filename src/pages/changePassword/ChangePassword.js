import './changePassword.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAxiosInterceptors from '../../hooks/useAxiosWithInterceptors'
import axios from 'axios'

const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState()
    const navigate = useNavigate()
    const axiosWithInterceptors = useAxiosInterceptors()

    useEffect(() => {
        setValidPassword(password_REGEX.test(password))
        setValidConfirmPassword(password === confirmPassword)
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          
            const response = await axiosWithInterceptors.post('/auth/changepassword', {currentPassword, password })
            // console.log(response.data)
            setPassword('')
            setConfirmPassword('')
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
                <h1 className='registerTitle'>Reset Password</h1>
               
                <div className='registerDiv'>
                    <label htmlFor='password'>Current password:</label>
                    <input
                        id='password'
                        type='password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='password'>New password:</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='registerDiv'>
                    <label htmlFor='confirmPwd'>Confirm new password:</label>
                    <input
                        id='confirmPwd'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button className='signUpButton' disabled={!currentPassword || !validPassword || !validConfirmPassword} >Submit new password</button>


            </form>
        </div>
    )
}

export default ChangePassword